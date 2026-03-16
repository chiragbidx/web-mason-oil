"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { applications, jobs } from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";
import { and, eq, ne } from "drizzle-orm";

// Applicant create schema - linked to a job
const applicantSchema = z.object({
  jobId: z.string().min(10),
  applicantName: z.string().min(2),
  applicantEmail: z.string().email(),
  applicantPhone: z.string().optional(),
  coverLetter: z.string().optional(),
  resumeUrl: z.string().optional(),
});

export async function createApplicantAction(input: z.infer<typeof applicantSchema>) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated");

  // Job validation: must be for this team AND status === open
  const jobResult = await db
    .select()
    .from(jobs)
    .where(
      and(
        eq(jobs.id, input.jobId),
        ne(jobs.status, "archived"),
        eq(jobs.status, "open")
      )
    );
  const job = jobResult[0];
  if (!job) throw new Error("Invalid job selected or job is not open");

  const insertRes = await db.insert(applications).values({
    ...input,
    teamId: job.teamId,
    status: "submitted",
  });

  return { success: true, applicationId: insertRes.insertId };
}

// More actions: updateApplicantStatus, add AI scoring, etc.
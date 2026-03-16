"use server";

import { z } from "zod";
import { db } from "@/lib/db/client";
import { jobs, teamMembers } from "@/lib/db/schema";
import { getAuthSession } from "@/lib/auth/session";
import { eq } from "drizzle-orm";

// --- Job validation schema ---
const jobSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(4),
  location: z.string().min(2),
  department: z.string().min(2),
  status: z.enum(["open", "closed", "archived"]).default("open"),
});

export async function createJobAction(input: z.infer<typeof jobSchema>) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated");

  // Find the user's team using Drizzle select/where pattern
  const [teamRow] = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, session.userId))
    .limit(1);

  if (!teamRow || !teamRow.teamId) throw new Error("No team found");

  const result = await db.insert(jobs).values({
    ...input,
    teamId: teamRow.teamId,
  });

  // You may need to adjust this depending on how Drizzle returns inserted row ids
  return { success: true, jobId: result?.insertId || undefined };
}

export async function updateJobAction(jobId: string, input: z.infer<typeof jobSchema>) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated");

  // TODO: Add team and role validation. Only allow job updates within team.
  await db
    .update(jobs)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, jobId));

  return { success: true };
}

export async function archiveJobAction(jobId: string) {
  const session = await getAuthSession();
  if (!session) throw new Error("Not authenticated");

  // TODO: Team scoping check (only allow if job is in user's team)
  await db
    .update(jobs)
    .set({
      status: "archived",
      updatedAt: new Date(),
    })
    .where(eq(jobs.id, jobId));

  return { success: true };
}
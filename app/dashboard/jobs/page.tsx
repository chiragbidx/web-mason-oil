import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { jobs, teams, teamMembers } from "@/lib/db/schema";
import Client from "./client";

// Get authenticated user's teamId for scoping jobs
async function getTeamId(userId: string): Promise<string | null> {
  // Find the first team for the user (or extend as multi-team)
  const result = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId))
    .limit(1);

  return result[0]?.teamId ?? null;
}

export default async function JobsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");
  const teamId = await getTeamId(session.userId);
  if (!teamId) redirect("/dashboard"); // fallback

  // Fetch jobs scoped to current team
  const jobList = await db
    .select()
    .from(jobs)
    .where(eq(jobs.teamId, teamId));
  
  return <Client jobs={jobList} />;
}
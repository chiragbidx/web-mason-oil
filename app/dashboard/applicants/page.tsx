import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { getAuthSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { applications, teamMembers } from "@/lib/db/schema";
import Client from "./client";

// Get authenticated user's teamId for scoping applications
async function getTeamId(userId: string): Promise<string | null> {
  const result = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, userId))
    .limit(1);

  return result[0]?.teamId ?? null;
}

export default async function ApplicantsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth#signin");
  const teamId = await getTeamId(session.userId);
  if (!teamId) redirect("/dashboard");

  // Fetch applications scoped to current team
  const apps = await db
    .select()
    .from(applications)
    .where(eq(applications.teamId, teamId));

  return <Client applications={apps} />;
}
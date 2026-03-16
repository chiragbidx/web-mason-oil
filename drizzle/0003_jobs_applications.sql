-- JobPilot: Add jobs and applications tables

CREATE TABLE IF NOT EXISTS "jobs" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "team_id" TEXT NOT NULL REFERENCES "teams"("id") ON DELETE CASCADE,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "location" TEXT NOT NULL,
  "department" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'open',
  "posted_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "closed_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "applications" (
  "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "job_id" TEXT NOT NULL REFERENCES "jobs"("id") ON DELETE CASCADE,
  "team_id" TEXT NOT NULL REFERENCES "teams"("id") ON DELETE CASCADE,
  "applicant_name" TEXT NOT NULL,
  "applicant_email" TEXT NOT NULL,
  "applicant_phone" TEXT,
  "resume_url" TEXT,
  "cover_letter" TEXT,
  "parsed_resume" JSON,
  "ai_score" INTEGER,
  "ai_rationale" TEXT,
  "status" TEXT NOT NULL DEFAULT 'submitted',
  "submitted_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
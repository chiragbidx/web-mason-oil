"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { createApplicantAction } from "./actions";

interface Applicant {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  status: string;
  aiScore?: number;
  aiRationale?: string;
}

interface JobSummary {
  id: string;
  title: string;
  status: string;
}

interface ApplicantsClientProps {
  applications: Applicant[];
  jobs: JobSummary[];
}

export default function ApplicantsClient({ applications, jobs }: ApplicantsClientProps) {
  const [focusApplicant, setFocusApplicant] = useState<Applicant | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState(applications);

  // Form fields
  const [fields, setFields] = useState<Partial<Applicant & { jobId: string }>>({});

  // Modal open
  const openCreate = () => {
    setFields({});
    setFormError(null);
    setShowForm(true);
  };

  // Controlled input
  const onFieldChange = (field: string, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  // Submit applicant
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    startTransition(async () => {
      try {
        const { applicantName, applicantEmail, jobId } = fields;
        if (!applicantName || !applicantEmail || !jobId) {
          setFormError("Name, email, and job are required.");
          return;
        }
        const resp = await createApplicantAction({
          jobId,
          applicantName,
          applicantEmail,
          applicantPhone: fields.applicantPhone || undefined,
          coverLetter: "",
          resumeUrl: "",
        });
        if (!resp?.success) throw new Error("Failed to add applicant.");
        setList((prev) => [
          ...prev,
          {
            id: resp.applicationId || Math.random().toString(),
            applicantName,
            applicantEmail,
            applicantPhone: fields.applicantPhone ?? "",
            status: "submitted",
          },
        ]);
        setShowForm(false);
        setFields({});
        setFormError(null);
      } catch (err: any) {
        setFormError(err.message || "Something went wrong.");
      }
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Applicants</h1>
        <Button onClick={openCreate}>Add Applicant</Button>
      </div>
      <Separator className="mb-6" />
      {list.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No applications yet. Once applicants start applying to jobs, they’ll appear here.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((a) => (
            <div
              key={a.id}
              className="bg-card rounded-lg border shadow px-5 py-4 cursor-pointer transition hover:shadow-lg"
              onClick={() => setFocusApplicant(a)}
            >
              <div className="font-semibold text-lg mb-1">{a.applicantName}</div>
              <div className="text-sm text-muted-foreground">{a.applicantEmail}</div>
              <div className="text-xs text-muted-foreground mt-2 capitalize">Status: {a.status}</div>
              <div className="mt-3">
                <span className="text-xs text-muted-foreground font-semibold">AI Fit Score: </span>
                <span className="font-bold">{a.aiScore ?? "—"}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail modal for applicant */}
      {focusApplicant && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/60 z-50">
          <div className="bg-card rounded-lg shadow-lg p-6 min-w-[360px] max-w-md relative">
            <button className="absolute right-2 top-2 text-muted-foreground" onClick={() => setFocusApplicant(null)}>
              Close
            </button>
            <h2 className="text-2xl font-bold mb-2">{focusApplicant.applicantName}</h2>
            <div className="mb-1 text-xs text-muted-foreground">{focusApplicant.applicantEmail}</div>
            <div className="mb-3 text-xs text-muted-foreground">{focusApplicant.applicantPhone}</div>
            <div className="mb-3">
              <span className="font-semibold">Status:</span> {focusApplicant.status}
            </div>
            <div className="mb-3">
              <span className="font-semibold">AI Fit Score:</span> {focusApplicant.aiScore ?? "—"}
            </div>
            <div className="mb-3">
              <span className="font-semibold">AI Rationale:</span> {focusApplicant.aiRationale ?? "Not available"}
            </div>
            <div className="flex justify-end">
              <Button variant="secondary" onClick={() => setFocusApplicant(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for creating a new applicant */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/70 z-50">
          <form
            className="bg-card rounded-lg shadow-lg p-6 min-w-[330px] max-w-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-4">Add Applicant</h2>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Job</label>
              <select
                className="w-full rounded border bg-background px-3 py-2"
                value={fields.jobId || ""}
                onChange={(e) => onFieldChange("jobId", e.target.value)}
                required
                disabled={isPending}
              >
                <option value="" disabled>Select a job…</option>
                {jobs.length === 0 && (
                  <option value="" disabled>
                    No jobs available
                  </option>
                )}
                {jobs.map((job) => (
                  <option key={job.id} value={job.id} disabled={job.status === "archived"}>
                    {job.title} {job.status !== "open" ? `(${job.status})` : ""}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Applicant Name</label>
              <Input
                value={fields.applicantName || ""}
                onChange={(e) => onFieldChange("applicantName", e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Applicant Email</label>
              <Input
                value={fields.applicantEmail || ""}
                onChange={(e) => onFieldChange("applicantEmail", e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Applicant Phone</label>
              <Input
                value={fields.applicantPhone || ""}
                onChange={(e) => onFieldChange("applicantPhone", e.target.value)}
                disabled={isPending}
              />
            </div>
            {formError && (
              <div className="py-1 text-destructive text-sm mb-2">{formError}</div>
            )}
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Add"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
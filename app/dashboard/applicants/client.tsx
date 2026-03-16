"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Applicant {
  id: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone?: string;
  status: string;
  aiScore?: number;
  aiRationale?: string;
}

interface ApplicantsClientProps {
  applications: Applicant[];
}

export default function ApplicantsClient({ applications }: ApplicantsClientProps) {
  const [focusApplicant, setFocusApplicant] = useState<Applicant | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Applicants</h1>
      </div>
      <Separator className="mb-6" />
      {applications.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No applications yet. Once applicants start applying to jobs, they’ll appear here.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {applications.map((a) => (
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
    </div>
  );
}
"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  createJobAction,
  updateJobAction,
  archiveJobAction,
} from "./actions";

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  department: string;
  status: string;
  postedAt: string;
}

interface JobsClientProps {
  jobs: Job[];
}

export default function JobsClient({ jobs }: JobsClientProps) {
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState(jobs);

  // Form fields
  const [fields, setFields] = useState<Partial<Job>>({});

  // Open form/state handlers
  const openCreate = () => {
    setSelectedJob(null);
    setFields({});
    setFormError(null);
    setShowForm(true);
  };

  const openEdit = (job: Job) => {
    setSelectedJob(job);
    setFields({
      title: job.title,
      department: job.department,
      location: job.location,
      description: job.description,
      status: job.status,
    });
    setFormError(null);
    setShowForm(true);
  };

  // Form submission: create or update
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    startTransition(async () => {
      try {
        if (
          !fields.title ||
          !fields.department ||
          !fields.location ||
          !fields.description
        ) {
          setFormError("All fields are required.");
          return;
        }

        if (selectedJob) {
          // Edit
          const resp = await updateJobAction(selectedJob.id, {
            title: fields.title,
            department: fields.department,
            location: fields.location,
            description: fields.description,
            status: fields.status ?? "open",
          });
          if (!resp?.success) throw new Error("Failed to update job.");
          setList((prev) =>
            prev.map((j) =>
              j.id === selectedJob.id
                ? { ...j, ...fields }
                : j
            )
          );
        } else {
          // Create
          const resp = await createJobAction({
            title: fields.title!,
            department: fields.department!,
            location: fields.location!,
            description: fields.description!,
            status: fields.status ?? "open",
          });
          if (!resp?.success) throw new Error("Failed to create job.");
          // For real use: fetch again or append minimally
          setList((prev) => [
            ...prev,
            {
              id: resp.jobId || Math.random().toString(), // placeholder fallback
              title: fields.title!,
              department: fields.department!,
              location: fields.location!,
              description: fields.description!,
              status: fields.status ?? "open",
              postedAt: new Date().toISOString(),
            },
          ]);
        }
        setShowForm(false);
        setFields({});
        setSelectedJob(null);
        setFormError(null);
      } catch (err: any) {
        setFormError(err.message || "Something went wrong.");
      }
    });
  };

  // Archive job
  const handleArchive = async (job: Job) => {
    if (window.confirm("Are you sure you want to archive this job? This will hide it from applicants.")) {
      startTransition(async () => {
        try {
          await archiveJobAction(job.id);
          setList((prev) =>
            prev.filter((j) => j.id !== job.id)
          );
        } catch (err: any) {
          alert("Failed to archive job: " + (err.message || ""));
        }
      });
    }
  };

  // Controlled input
  const onFieldChange = (field: keyof Job, value: string) => {
    setFields((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Button onClick={openCreate}>Create Job</Button>
      </div>
      <Separator className="mb-6" />
      {list.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No jobs posted yet. Start by creating your first job listing.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((job) => (
            <Card key={job.id} className="flex flex-col min-h-[220px] justify-between">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <span className="text-xs text-muted-foreground">{job.status === "open" ? "Open" : job.status.charAt(0).toUpperCase() + job.status.slice(1)}</span>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="block font-bold text-sm">Location:</span>
                  <span className="block">{job.location}</span>
                </div>
                <div className="mb-2">
                  <span className="block font-bold text-sm">Department:</span>
                  <span className="block">{job.department}</span>
                </div>
                <div className="text-sm text-muted-foreground mb-2 line-clamp-3">
                  {job.description}
                </div>
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openEdit(job)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleArchive(job)}
                  >
                    Archive
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal for creating/editing a job */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-background/70 z-50">
          <form
            className="bg-card rounded-lg shadow-lg p-6 min-w-[320px] max-w-sm"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-bold mb-4">
              {selectedJob ? "Edit Job" : "Create Job"}
            </h2>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Title</label>
              <Input
                value={fields.title || ""}
                onChange={(e) => onFieldChange("title", e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Department</label>
              <Input
                value={fields.department || ""}
                onChange={(e) => onFieldChange("department", e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Location</label>
              <Input
                value={fields.location || ""}
                onChange={(e) => onFieldChange("location", e.target.value)}
                required
                disabled={isPending}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Description</label>
              <Input
                value={fields.description || ""}
                onChange={(e) => onFieldChange("description", e.target.value)}
                required
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
                {isPending ? "Saving..." : selectedJob ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
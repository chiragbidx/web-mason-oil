"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { jobs as jobsTable } from "@/lib/db/schema";

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

  // Placeholder for CRUD wiring—replace with server actions in final stage
  const openCreate = () => {
    setSelectedJob(null);
    setShowForm(true);
  };

  const openEdit = (job: Job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  // Placeholder submit handler. Replace with real mutation.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add mutation call (create/update) here.
    setShowForm(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <Button onClick={openCreate}>Create Job</Button>
      </div>
      <Separator className="mb-6" />
      {jobs.length === 0 ? (
        <p className="py-16 text-center text-muted-foreground">
          No jobs posted yet. Start by creating your first job listing.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {jobs.map((job) => (
            <Card key={job.id} className="flex flex-col min-h-[220px] justify-between">
              <CardHeader>
                <CardTitle>{job.title}</CardTitle>
                <span className="text-xs text-muted-foreground">{job.status === "open" ? "Open" : "Closed"}</span>
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
                <Button
                  variant="secondary"
                  size="sm"
                  className="mt-2"
                  onClick={() => openEdit(job)}
                >
                  Edit
                </Button>
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
              <Input defaultValue={selectedJob?.title || ""} required />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Department</label>
              <Input defaultValue={selectedJob?.department || ""} required />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Location</label>
              <Input defaultValue={selectedJob?.location || ""} required />
            </div>
            <div className="mb-3">
              <label className="block mb-1 font-medium">Description</label>
              <Input defaultValue={selectedJob?.description || ""} required />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
              <Button type="submit">{selectedJob ? "Update" : "Create"}</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
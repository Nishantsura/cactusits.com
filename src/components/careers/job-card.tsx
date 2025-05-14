"use client";

import type { Job } from "@/types/job";
import Link from "next/link";

interface JobCardProps {
  job: Job;
  isExpanded: boolean;
  onJobClick: (jobId: number) => void;
  onApply: (job: Job) => void;
}

export default function JobCard({ job, isExpanded, onJobClick }: JobCardProps) {
  return (
    <div className="bg-warm-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
      <div className="p-4 cursor-pointer" onClick={() => onJobClick(job.id)}>
        <div className="flex flex-col md:flex-row justify-between mb-2">
          <div>
            <h3 className="text-lg font-medium">{job.title}</h3>
            <p className="text-sm text-gray-600">
              {job.salary} | {job.location}
            </p>
          </div>
          <div className="mt-2 md:mt-0 text-sm text-gray-500">
            {job.postedDays} days ago
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-sm">{job.type}</span>
          <div className="flex space-x-8">
            {isExpanded ? (
              <button
                className="text-sm hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onJobClick(job.id);
                }}
              >
                Hide details
              </button>
            ) : (
              <button
                className="text-sm hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  onJobClick(job.id);
                }}
              >
                View details
              </button>
            )}
            <Link href={job?.applyLink || ""} target="_blank">
              <button
                className="bg-foreground text-white px-4 py-1 rounded-full text-sm cursor-pointer"
                // onClick={(e) => {
                //   e.stopPropagation();
                //   onApply(job);
                // }}
              >
                Apply
              </button>
            </Link>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          <div className="whitespace-pre-line">
            <h4 className="font-medium mb-2">
              Job Posting: {job.title} at {job.company}
            </h4>
            <p className="flex items-center text-sm mb-1">
              <span className="text-blue-500 mr-1">•</span>
              Position: {job.title}
            </p>
            <p className="flex items-center text-sm mb-1">
              <span className="text-primary mr-1">📍</span>
              Location: {job.location}
            </p>
            <p className="flex items-center text-sm mb-3">
              <span className="text-orange-500 mr-1">📅</span>
              Type: {job.type}
            </p>

            <div className="text-sm text-gray-700 mt-2">
              <p className="font-medium mb-1">About {job.company}</p>
              <p className="mb-3">
                {job.company} is a leading provider of technology-driven
                business solutions, specializing in Cloud, AI, Cybersecurity, IT
                Consulting, and Digital Transformation. We empower businesses
                with cutting-edge IT strategies, helping them scale, secure, and
                optimize operations.
              </p>

              <p className="font-medium mb-1">Role Overview</p>
              <p>{job.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

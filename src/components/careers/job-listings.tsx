"use client";

import { useState, useEffect } from "react";
import JobCard from "./job-card";
import ApplicationModal from "./application-modal";
import type { Job, Category } from "@/types/job";
import { getJobs } from "@/lib/data-utils";

// Default categories that will be supplemented by categories from actual jobs
const defaultCategories: Category[] = [
  { id: "all", name: "Show all" },
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "marketing", name: "Marketing" },
  { id: "manager", name: "Manager" },
];

export default function JobListings() {
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);

  // Fetch jobs from the database
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await getJobs();

        if (error) {
          throw new Error("Failed to fetch jobs");
        }

        // Transform the data from Supabase format to our Job type
        const transformedJobs: Job[] =
          data?.map((job: any) => ({
            id: job.id,
            title: job.title,
            salary: job.salary || "Competitive",
            location: job.location,
            type: job.type,
            postedDays: Math.ceil(
              (new Date().getTime() - new Date(job.posted_date).getTime()) /
                (1000 * 3600 * 24),
            ),
            category: job.category?.toLowerCase() || "other",
            company: job.company || "Cactus IT Solutions",
            applyLink: job.apply_link,
            description: job.description,
          })) || [];

        setJobs(transformedJobs);

        // Extract unique categories from jobs
        const uniqueCategories = new Set<string>();
        transformedJobs.forEach((job) => {
          if (job.category) uniqueCategories.add(job.category.toLowerCase());
        });

        // Update categories list with actual categories from jobs
        const newCategories = [
          { id: "all", name: "Show all" },
          ...Array.from(uniqueCategories).map((cat) => ({
            id: cat,
            name: cat.charAt(0).toUpperCase() + cat.slice(1),
          })),
        ];

        setCategories(newCategories);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching jobs");
        console.error("Error fetching jobs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs =
    selectedCategory === "all"
      ? jobs
      : jobs.filter(
          (job) =>
            job.category.toLowerCase() === selectedCategory.toLowerCase(),
        );

  const handleJobClick = (jobId: number) => {
    setExpandedJobId(expandedJobId === jobId ? null : jobId);
  };

  const handleApply = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-[85vw] min-h-screen"
      id="job-listings"
    >
      <div className="mb-8">
        <p className="text-primary font-medium flex items-center mb-4">
          <span className="mr-2">•</span>
          Explore open positions
        </p>
        <h1 className="text-2xl md:text-3xl font-medium text-center max-w-md mx-auto mb-8">
          We&apos;re hiring! Join us as we&apos;re passionate about finding you
          the right role.
        </h1>

        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading jobs...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!isLoading && !error && (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Categories sidebar */}
            <div className="w-full lg:w-48 flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <button
                  className={`text-sm cursor-pointer bg-slate-100 px-3 py-2 rounded-full ${
                    selectedCategory === "all" ? "font-medium" : ""
                  }`}
                  onClick={() => setSelectedCategory("all")}
                >
                  Show all
                </button>
                <span className="text-sm">{filteredJobs.length}</span>
              </div>
              <div className="flex lg:block gap-2 md:space-y-3 flex-wrap">
                {categories.slice(1).map((category) => (
                  <button
                    key={category.id}
                    className={`block text-sm cursor-pointer bg-slate-100 px-3 py-2 rounded-full ${
                      selectedCategory === category.id.toLowerCase()
                        ? "font-medium"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCategory(category.id.toLowerCase())
                    }
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Job listings */}
            <div className="flex-1 space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    isExpanded={expandedJobId === job.id}
                    onJobClick={handleJobClick}
                    onApply={handleApply}
                  />
                ))
              ) : (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <p className="text-gray-500">
                    No jobs found in this category. Please check back later or
                    select a different category.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {isModalOpen && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import JobCard from "./job-card";
import ApplicationModal from "./application-modal";
import type { Job, Category } from "@/types/job";

// Sample data
const jobsData: Job[] = [
  {
    id: 5,
    title: "Technical Business Analyst",
    salary: "Competitive",
    location: "Glasgow, Scotland, United Kingdom (Hybrid)",
    type: "Full-Time",
    postedDays: 7,
    category: "Development",
    company: "Cactus IT Solutions",
    applyLink:
      "https://www.linkedin.com/jobs/view/4210656414/?capColoOverride=true",
    description: `Job Posting: Technical Business Analyst at Cactus IT Solutions

Position: Technical Business Analyst
Location: Glasgow, Scotland, United Kingdom (Hybrid)
Type: Full-Time

• Experience in business analysis, design, development, architecture, integration, production support, and project leadership. 
• Agile Business Analyst with practical experience working across various methodologies such as Scrum, Kanban, SAFe 
• Experience of functional analysis, software design, Process modeling, and business process flow diagram. 
• Extensive experience developing business cases, eliciting and managing requirements, documenting use cases, and testing the implementation of products. 
• Gather and/or define requirements, often through interviews and facilitating meetings with client subject matter experts.
• Provide information on the data model and explain the entities and attributes in the model and the relationships between them.
• Lead fit/gap sessions that map requirements to standard features and functions.
• Recommend and advise on application/functional extensions, as necessary, to meet client solution requirements.
• Serves as a bridge between technical staff and client stakeholders and authorities when the Curam technical team develops extensions.
• Develop functional designs associated with the extensions.
• Plan and execute tests to verify the solution is properly configured and extended to meet requirements.`,
  },
  {
    id: 6,
    title: "Scrum Master",
    salary: "Competitive",
    location: "Glasgow, Scotland, United Kingdom (Hybrid)",
    type: "Full-Time",
    postedDays: 7,
    category: "manager",
    company: "Cactus IT Solutions",
    applyLink:
      "https://www.linkedin.com/jobs/view/4210665303/?capColoOverride=true",
    description: `Job Posting: Scrum Master at Cactus IT Solutions

Position: Scrum Master
Location: Glasgow, Scotland, United Kingdom (Hybrid)
Type: Full-Time

• The Scrum Master will be considered an Agile subject-matter expert, have excellent logic and problem-solving skills, and have the drive to make a difference. They will be responsible for participating proactively in developing and maintaining team standards, tools, and best practices, identifying and removing impediments, and preventing distractions. Facilitate discussion and conflict resolution, empower the team to self-organise, serve as liaison between technical and non-technical departments and communicate with other management, developers, product managers, and technical support specialists on product issue
 Primary Responsibilities:
• Ensure the team lives Agile values and principles and follows required processes and practices 
• Tracks and removes impediments 
• Builds relationships between the team, product owner, and the wider SPM team 
• Facilitates Agile ceremonies, e.g. daily standups, Sprint Planning, Sprint Review/Sprint Retrospectives. 
• Ensures Agile and Scrum principles are properly implemented and adopted for successful delivery of the Sprint 
• Facilitates refinement sessions to discuss new/modified User Stories and estimates 
• Creates visual information boards, e.g., Burn-up charts communicating progress to all stakeholders.
• Relevant project management experience and Scrum Master experience. Thorough understanding of agile software development methodologies, values, and procedures. Thorough understanding of technical issues. 
• Relevant practical experience working on large-scale complex programs and spanning a wide range of applications and technologies. 
• Desirable to have a background in public sector IT delivery and, ideally, experience in leading technical teams`,
  },
  {
    id: 7,
    title: "Senior Azure Data Engineer (SC Cleared) - Permanent - London, UK",
    salary: "Competitive",
    location: "London, United Kingdom - Flexible",
    type: "Full-Time",
    postedDays: 7,
    category: "development",
    company: "Cactus IT Solutions",
    applyLink: "https://www.jobserve.com/gb/en/W5E744B15E5A115EE56.jsjob",
    description: `Job Summary:

We are seeking a highly skilled and experienced Senior Data Engineer to join our team and contribute to the development and maintenance of our cutting-edge Azure Databricks platform for economic data. This platform is critical for our Monetary Analysis, Forecasting, and Modelling activities. The Senior Data Engineer will be responsible for building and optimising data pipelines, implementing data transformations, and ensuring data quality and reliability. This role requires a strong understanding of data engineering principles, big data technologies, cloud computing (specifically Azure), and experience working with large datasets.

Key Responsibilities:

Data Pipeline Development & Optimisation:

    Design, develop, and maintain robust and scalable data pipelines for ingesting, transforming, and loading data from various sources (eg, APIs, databases, financial data providers) into the Azure Databricks platform.
    Optimise data pipelines for performance, efficiency, and cost-effectiveness.
    Implement data quality checks and validation rules within data pipelines.

Data Transformation & Processing:

    Implement complex data transformations using Spark (PySpark or Scala) and other relevant technologies.
    Develop and maintain data processing logic for cleaning, enriching, and aggregating data.
    Ensure data consistency and accuracy throughout the data life cycle.

Azure Databricks Implementation:

    Work extensively with Azure Databricks Unity Catalog, including Delta Lake, Spark SQL, and other relevant services.
    Implement best practices for Databricks development and deployment.
    Optimise Databricks workloads for performance and cost.
    Need to program using the languages such as SQL, Python, R, YAML and JavaScript

Data Integration:

    Integrate data from various sources, including relational databases, APIs, and streaming data sources.
    Implement data integration patterns and best practices.
    Work with API developers to ensure seamless data exchange.

Data Quality & Governance:

    Hands on experience to use Azure Purview for data quality and data governance
    Implement data quality monitoring and alerting processes.
    Work with data governance teams to ensure compliance with data governance policies and standards.
    Implement data lineage tracking and metadata management processes.

Collaboration & Communication:

    Collaborate closely with data scientists, economists, and other technical teams to understand data requirements and translate them into technical solutions.
    Communicate technical concepts effectively to both technical and non-technical audiences.
    Participate in code reviews and knowledge sharing sessions.

Automation & DevOps:

    Implement automation for data pipeline deployments and other data engineering tasks.
    Work with DevOps teams to implement and Build CI/CD pipelines, for environmental deployments.
    Promote and implement DevOps best practices.

Essential Skills & Experience:

    10+ years of experience in data engineering, with at least 3+ years of hands-on experience with Azure Databricks.
    Strong proficiency in Python and Spark (PySpark) or Scala.
    Deep understanding of data warehousing principles, data modelling techniques, and data integration patterns.
    Extensive experience with Azure data services, including Azure Data Factory, Azure Blob Storage, and Azure SQL Database.
    Experience working with large datasets and complex data pipelines.
    Experience with data architecture design and data pipeline optimization.
    Proven expertise with Databricks, including hands-on implementation experience and certifications.
    Experience with SQL and NoSQL databases.
    Experience with data quality and data governance processes.
    Experience with version control systems (eg, Git).
    Experience with Agile development methodologies.
    Excellent communication, interpersonal, and problem-solving skills.
    Experience with streaming data technologies (eg, Kafka, Azure Event Hubs).
    Experience with data visualisation tools (eg, Tableau, Power BI).
    Experience with DevOps tools and practices (eg, Azure DevOps, Jenkins, Docker, Kubernetes).
    Experience working in a financial services or economic data environment.
    Azure certifications related to data engineering (eg, Azure Data Engineer Associate).`,
  },
];

const categories: Category[] = [
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

  const filteredJobs =
    selectedCategory === "all"
      ? jobsData
      : jobsData.filter(
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
                  onClick={() => setSelectedCategory(category.id.toLowerCase())}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Job listings */}
          <div className="flex-1 space-y-4">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                isExpanded={expandedJobId === job.id}
                onJobClick={handleJobClick}
                onApply={handleApply}
              />
            ))}
          </div>
        </div>
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

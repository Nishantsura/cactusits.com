"use client";

import React from "react";
import JobListings from "@/components/careers/job-listings";
import SubscriptionForm from "@/components/landing/NewsLetter";
import Link from "next/link";
import Container from "@/components/ui/container";
import { CactusDisplayCards } from "@/components/ui/cactus-display-cards";
import { Section } from "@/components/ui/section";
import { ChevronDown } from "lucide-react";

export default function Careers() {
  const scrollToJobs = () => {
    const jobsSection = document.getElementById("job-listings");
    if (jobsSection) {
      jobsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center mt-[80px] sm:mt-[100px] md:mt-[115px]">
        <Container className="pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8 text-center md:text-left w-full md:w-1/2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
                Empower Your Career{" "}
                <span className="text-primary bg-clip-text">with Cactus</span>
              </h1>

              <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto md:mx-0">
                Join a team of innovators, problem-solvers, and tech enthusiasts
                dedicated to creating impactful solutions. We're looking for
                exceptional talent to grow with us.
              </p>

              <div className="flex justify-center md:justify-start pt-2">
                <button
                  onClick={scrollToJobs}
                  className="flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-md hover:bg-foreground/90 transition-all duration-300 shadow-sm hover:shadow font-medium"
                >
                  <span>Explore Open Positions</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 mt-6 md:mt-0">
              <CactusDisplayCards />
            </div>
          </div>
        </Container>
      </section>

      <div className="w-full max-w-full overflow-hidden mt-12 sm:mt-16 md:mt-20">
        <JobListings />
      </div>

      {/* Newsletter section instead of ContactForm */}
      <Section
        id="newsletter"
        spacing="normal"
        verticalAlign="center"
        className="mt-12 sm:mt-16 md:mt-20"
      >
        <SubscriptionForm heading="Join Our Talented Team" />
      </Section>
    </div>
  );
}

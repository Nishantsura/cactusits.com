"use client";

import React from "react";
import Image from "next/image";
import ChooseUs from "@/components/ChooseUs";
import JobListings from "@/components/careers/job-listings";
import Testimonials from "@/components/careers/testimonials";
import ContactForm from "@/components/landing/ContactUs";
import Link from "next/link";
import Container from "@/components/ui/container";

export default function Careers() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center mt-[115px]">
        <Container className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 lg:gap-8">
            <div className="flex flex-col gap-6 lg:gap-10 text-center md:text-left w-full md:w-1/2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
                Find roles that match your{" "}
                <span className="text-primary">skills</span> and{" "}
                <span className="text-primary">personality</span>
              </h1>
              <h3 className="text-base sm:text-lg lg:text-xl text-gray-muted max-w-2xl mx-auto md:mx-0">
                Explore exciting career opportunities at Cactus and be a part
                of our innovative and dynamic team.
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/#contactus" className="w-full sm:w-auto">
                  <button className="w-full sm:w-44 bg-foreground text-background px-4 py-3 rounded-md hover:bg-foreground/90 transition-colors">
                    Get in Touch
                  </button>
                </Link>
                <button className="w-full sm:w-44 border-2 border-slate-200 px-4 py-3 rounded-md hover:bg-slate-50 transition-colors">
                  Explore Services
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <Image
                src="/careers/hero.svg"
                alt="hero image"
                width={600}
                height={600}
                className="w-[80%] md:w-[90%] lg:w-auto max-w-full h-auto object-contain"
                priority
              />
            </div>
          </div>
          
          {/* Trusted By Section */}
          <div className="mt-8 lg:mt-16 flex flex-col items-center w-full">
            <p className="text-gray-muted">
              Trusted by <span className="text-foreground">1,000+</span>{" "}
              jobseekers and customers
            </p>
            <div className="flex flex-wrap gap-8 justify-center items-center mt-8 w-full">
              <Image
                src="/landing/Logo-1.svg"
                alt="logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/landing/Logo-2.svg"
                alt="logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/landing/Logo-3.svg"
                alt="logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/landing/Logo-4.svg"
                alt="logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
              <Image
                src="/landing/Logo-5.svg"
                alt="logo"
                width={100}
                height={40}
                className="h-8 w-auto"
              />
            </div>
          </div>
        </Container>
      </section>

      <ChooseUs />

      <JobListings />

      <Testimonials />

      <ContactForm />
    </div>
  );
}

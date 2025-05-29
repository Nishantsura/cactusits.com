"use client";

import Image from "next/image";
import IndustriesSection from "@/components/landing/Industries";
import SubscriptionForm from "@/components/landing/NewsLetter";
import ContactForm from "@/components/landing/ContactUs";
import Services from "@/components/Services";
import ChooseUs from "@/components/ChooseUs";
import Testimonials from "@/components/careers/testimonials";
import Link from "next/link";
import { Section } from "@/components/ui/section";
import React from "react";
import { BackgroundImages } from "@/components/ui/background-images";
import { HeroCustom } from "@/components/ui/hero-2-custom";

export function LandingContent() {
  return (
    <BackgroundImages className="w-full min-h-screen flex flex-col items-center">
      {/* hero section */}
      <HeroCustom />

      {/* quality over quantity */}
      <Section
        id="quality"
        spacing="minimal"
        verticalAlign="center"
        className="w-full max-w-[85vw] mx-auto flex flex-col md:flex-row pt-16 md:pt-24"
      >
        <div className="w-full md:w-[40%] flex flex-col justify-between px-4 md:px-0">
          <div>
            <h1 className="text-3xl md:text-5xl">
              Our Mission is your Success
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-start mt-8">
              <Link href={"/#contactus"}>
                <button className="w-full sm:w-44 bg-foreground text-background px-2 py-3">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
          <Image
            src="/landing/quality-arrow-g.svg"
            alt="arrow pointing the feature"
            width={1000}
            height={1000}
            className="hidden md:block -translate-x-[7.5vw] w-96 h-auto left-0"
          />
        </div>
        <div className="w-full md:w-[60%] flex flex-col justify-center items-center py-8 md:py-16">
          <div className="h-full w-full">
            <div className="py-4 md:pl-20 space-y-4">
              <Image
                src="/landing/quality-1.png"
                alt="point 1 image"
                width={500}
                height={500}
                className="w-7 h-auto"
              />
              <h3 className="text-xl md:text-2xl">Clients across Industries</h3>
              <p className="text-gray-muted text-sm md:text-base">
                We proudly serve clients across diverse sectors with proven IT
                solutions.
              </p>
            </div>
            <div className="py-4 md:pl-20 space-y-4">
              <Image
                src="/landing/quality-2.png"
                alt="point 2 image"
                width={500}
                height={500}
                className="w-7 h-auto"
              />
              <h3 className="text-xl md:text-2xl">Tailored Solutions</h3>
              <p className="text-gray-muted text-sm md:text-base">
                Our deep expertise in AI, cloud, and digital drives business
                innovation.
              </p>
            </div>
            <div className="py-4 md:pl-20 space-y-4">
              <Image
                src="/landing/quality-3.png"
                alt="point 3 image"
                width={500}
                height={500}
                className="w-7 h-auto"
              />
              <h3 className="text-xl md:text-2xl">Expertise and Innovation</h3>
              <p className="text-gray-muted text-sm md:text-base">
                Every solution we deliver is tailored to your unique business
                challenges.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* services  */}
      <div className="w-screen bg-[#18181B] max-w-full relative -mx-[calc((100vw-100%)/2)]">
        <Section
          id="services"
          spacing="minimal"
          verticalAlign="center"
          className="w-full"
        >
          <Services />
        </Section>
      </div>

      {/* Industries section */}
      <Section
        id="industries"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <IndustriesSection />
      </Section>

      {/* choose us  */}
      <Section
        id="why-choose-us"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <ChooseUs />
      </Section>

      {/* news letter  */}
      <Section
        id="newsletter"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <SubscriptionForm />
      </Section>

      {/* testimonials */}
      <Section
        id="testimonials"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <Testimonials />
      </Section>

      {/* contact us form */}
      <Section
        id="contactus"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <ContactForm />
      </Section>
    </BackgroundImages>
  );
}

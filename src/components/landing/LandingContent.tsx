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
import { QualityFeaturesSection } from "@/components/ui/QualityFeaturesSection";
import { ValuesSection } from "@/components/ui/ValuesSection";

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
        className="w-full pt-16 md:pt-24"
      >
        <QualityFeaturesSection />
      </Section>

      {/* our values */}
      <Section
        id="values"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <ValuesSection />
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

      {/* testimonials */}
      <Section
        id="testimonials"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <Testimonials />
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
    </BackgroundImages>
  );
}

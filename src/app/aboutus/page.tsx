import React from "react";
import Image from "next/image";
import Services from "@/components/Services";
import ChooseUs from "@/components/ChooseUs";
import NewsLetter from "@/components/landing/NewsLetter";
import Testimonials from "@/components/careers/testimonials";
import { Hero } from "@/components/ui/animated-hero";
import Link from "next/link";
import { ValuesSection } from "@/components/ui/ValuesSection";
import { Section } from "@/components/ui/section";

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* hero */}
      <Hero />

      {/* Our Values */}
      <Section
        id="values"
        spacing="minimal"
        verticalAlign="center"
        className="w-full"
      >
        <ValuesSection />
      </Section>

      {/* Services  */}
      <Services />

      {/* chooseUs  */}
      <ChooseUs />

      {/* Testimonials */}
      <Testimonials />

      {/* News letter */}
      <NewsLetter heading="Let's grow together!" />
    </div>
  );
}

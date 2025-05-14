'use client';

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

export function LandingContent() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      {/* hero section */}
      <Section id="hero" spacing="none" verticalAlign="center" fullHeight className="w-full max-w-[85vw] mx-auto flex flex-col items-center pt-[90px]">
        <div className="w-full h-[88%] flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-[70%] h-full p-4 md:p-16 pt-6 md:pt-12 flex flex-col gap-4 md:gap-8 text-center">
            <h1 className="text-3xl md:text-6xl">
              Empowering Businesses Through Innovation and Technology
            </h1>
            <h3 className="md:text-xl text-gray-muted">
              At Cactus, we combine strategy, technology, and expertise to{" "}
              <br className="hidden md:block" />
              transform your business for the digital age.
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center item text-nowrap">
              <Link href="/#contactus">
                <button className="w-36 md:w-44 border-2 bg-foreground  text-white px-2 py-2 cursor-pointer">
                  Get in touch
                </button>
              </Link>
              <Link href="/services">
                <button className="w-36 md:w-44 border-2 border-slate-200 px-2 py-2 cursor-pointer">
                  Explore Services
                </button>
              </Link>
            </div>
            {/* Trust by logos section commented out */}
          </div>
          <div className="w-full md:w-[30%] h-full flex justify-evenly items-center">
            <Image
              src="/landing/hero-left.jpg"
              alt="hero image"
              width={500}
              height={500}
              className="h-48 w-[85vw] md:h-[70vh] object-cover"
            />
          </div>
        </div>
      </Section>

      {/* quality over quantity */}
      <Section id="quality" spacing="minimal" verticalAlign="center" className="w-full max-w-[85vw] mx-auto flex flex-col md:flex-row">
        <div className="w-full md:w-[40%] flex flex-col justify-between px-4 md:px-0">
          <div>
            <h1 className="text-3xl md:text-5xl">
              We prefer—
              <br />
              <span className="text-primary">Quality</span> over{" "}
              <span className="text-primary">Quantity</span>.
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-start mt-8">
              <button className="w-full sm:w-44 border-2 border-slate-200 px-2 py-3">
                Frequent Queries
              </button>
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
      <Section id="services" spacing="minimal" verticalAlign="center" className="w-full">
        <Services />
      </Section>

      {/* Industries section */}
      <Section id="industries" spacing="minimal" verticalAlign="center" className="w-full">
        <IndustriesSection />
      </Section>

      {/* choose us  */}
      <Section id="choose-us" spacing="minimal" verticalAlign="center" className="w-full">
        <ChooseUs />
      </Section>

      {/* testimonials */}
      <Section id="testimonials" spacing="minimal" verticalAlign="center" className="w-full">
        <Testimonials />
      </Section>

      {/* news letter  */}
      <Section id="newsletter" spacing="minimal" verticalAlign="center" className="w-full">
        <SubscriptionForm />
      </Section>

      {/* contact us form */}
      <Section id="contactus" spacing="minimal" verticalAlign="center" className="w-full">
        <ContactForm />
      </Section>
    </div>
  );
}

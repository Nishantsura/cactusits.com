import React from "react";
import Image from "next/image";
import Services from "@/components/Services";
import ChooseUs from "@/components/ChooseUs";
import NewsLetter from "@/components/landing/NewsLetter";
import Testimonials from "@/components/careers/testimonials";
import { Hero } from "@/components/ui/animated-hero";
import { Globe } from "@/components/ui/globe";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* hero */}
      <Hero />

      <section className="w-[85vw] h-screen flex pt-12">
        <div className="w-[40%] h-full flex flex-col justify-between items-center text-center">
          <div className="flex flex-col items-center relative justify-between h-full pb-32">
            <div>
              <h1 className="text-5xl">Our Values</h1>
              <p className="text-gray-txt w-[90%]">
                We embrace change and continuously seek new ways to improve and
                innovate.
              </p>
            </div>
            <Globe className="top-16 hidden lg:block" />
            <div className="flex gap-4 justify-start mt-8">
              <button className="w-44 border-2 border-slate-200 px-2 py-3">
                Frequent Queries
              </button>
              <Link href={"/#contactus"}>
                <button className="w-44 bg-foreground text-background px-2 py-3">
                  Get in Touch
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-[60%] h-full flex flex-col justify-center items-center py-16">
          <div className="h-full w-full">
            <div className="py-4 pl-20 space-y-4">
              <Image
                src="/landing/quality-point-1.svg"
                alt="point 1 image"
                width={500}
                height={500}
                className="w-7 h-auto"
              />
              <h3 className="text-2xl">Clients across Industries</h3>
              <p className="text-gray-muted">
                Duis aute irure dolor in reprehenderit in vol up tate velit esse
                cillum dolore.
              </p>
            </div>
            <div className="py-4 pl-20 space-y-4">
              <Image
                src="/landing/quality-point-2.svg"
                alt="point 2 image"
                width={500}
                height={500}
                className="w-7 h-auto"
              />
              <h3 className="text-2xl">Tailored Solutions</h3>
              <p className="text-gray-muted">
                Duis aute irure dolor in reprehenderit in vol up tate velit esse
                cillum dolore.
              </p>
            </div>
            <div className="py-4 pl-20 space-y-4">
              <Image
                src="/landing/quality-point-3.svg"
                alt="point 3 image"
                width={500}
                height={500}
                className="w-7 h-auto"
              />
              <h3 className="text-2xl">Expertise and Innovation</h3>
              <p className="text-gray-muted">
                Duis aute irure dolor in reprehenderit in vol up tate velit esse
                cillum dolore.
              </p>
            </div>
          </div>
        </div>
      </section>

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

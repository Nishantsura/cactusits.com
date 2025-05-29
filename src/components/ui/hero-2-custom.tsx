"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const HeroCustom = () => {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pexels-taryn-elliott-8052681.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/50"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-[100vw]">
        {/* Badge */}
        <div className="mx-auto mb-8 flex max-w-fit items-center justify-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
          <span className="text-sm font-medium text-white">
            IT Consultancy Services
          </span>
          <ArrowRight className="h-4 w-4 text-white" />
        </div>

        {/* Hero section */}
        <div className="w-full px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl whitespace-normal">
            Enabling Businesses Through <br />
            <span className="text-white">Simplicity & Clarity</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
            We combine strategy, technology, and expertise to transform your
            business for the digital age.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link href="/#contactus">
              <button className="h-12 rounded-full bg-white px-8 text-base font-medium text-black hover:bg-white/90">
                Get in touch
              </button>
            </Link>
            <Link href="/services">
              <button className="h-12 rounded-full border border-gray-600 px-8 text-base font-medium text-white hover:bg-white/10">
                Explore Services
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroCustom };

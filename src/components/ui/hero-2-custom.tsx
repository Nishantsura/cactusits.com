"use client";

import Link from "next/link";
import Image from "next/image";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const HeroCustom = () => {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/shapelined-_JBKdviweXI-unsplash.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Light overlay for subtle background effect */}
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Content container: now a flex container for left text and right image */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 text-left py-8 md:pr-8">
          {/* Hero text content */}
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight text-black md:text-4xl lg:text-5xl whitespace-normal">
              Enabling Businesses Through <br />
              <span className="text-primary">Simplicity & Clarity</span>
            </h1>

            <div className="mt-10 flex flex-col items-start justify-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Link href="/contact">
                <InteractiveHoverButton
                  text="Get in touch"
                  className="h-12 px-8 text-base font-medium bg-white text-black w-auto min-w-[160px] hover:bg-green-500 hover:text-white group-hover:text-white"
                />
              </Link>
              <Link href="/services">
                <InteractiveHoverButton
                  text="Explore Services"
                  className="h-12 px-8 text-base font-medium bg-transparent text-black w-auto min-w-[180px]"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0 md:pl-8">
          <div className="relative w-full aspect-video sm:aspect-[4/3] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
            <Image
              src="/landing/pexels-tima-miroshnichenko-5685931.jpg"
              alt="Innovative IT Solutions"
              fill
              className="object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export { HeroCustom };

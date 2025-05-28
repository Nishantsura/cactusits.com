"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface BackgroundImagesProps {
  children: ReactNode;
  className?: string;
}

export const BackgroundImages = ({
  children,
  className,
}: BackgroundImagesProps) => {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Background images with Apple-inspired styling */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* First image - positioned top right with blur effect */}
        <div className="absolute -top-20 right-0 opacity-25 blur-2xl transform rotate-12 animate-pulse-slow">
          <Image
            src="/landing/services-1.png"
            alt="Background decorative element"
            width={500}
            height={500}
            className="w-[400px] md:w-[600px] h-auto"
          />
        </div>

        {/* Second image - positioned bottom left with blur effect */}
        <div className="absolute top-[30%] -left-40 opacity-30 blur-xl transform -rotate-6 animate-float">
          <Image
            src="/landing/services-2.png"
            alt="Background decorative element"
            width={500}
            height={500}
            className="w-[300px] md:w-[500px] h-auto"
          />
        </div>

        {/* Third image - positioned center-bottom with blur effect */}
        <div className="absolute -bottom-20 right-1/4 opacity-25 blur-2xl transform rotate-45 animate-pulse-slow-reverse">
          <Image
            src="/landing/services-3.png"
            alt="Background decorative element"
            width={500}
            height={500}
            className="w-[350px] md:w-[450px] h-auto"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

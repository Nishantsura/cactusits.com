"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export function QualityFeaturesSection() {
  const features = [
    {
      title: "Clients across Industries",
      description:
        "We proudly serve clients across diverse sectors with proven IT solutions.",
      imageSrc: "/landing/quality-1.png",
    },
    {
      title: "Tailored Solutions",
      description:
        "Our deep expertise in AI, cloud, and digital drives business innovation.",
      imageSrc: "/landing/quality-2.png",
    },
    {
      title: "Expertise and Innovation",
      description:
        "Every solution we deliver is tailored to your unique business challenges.",
      imageSrc: "/landing/quality-3.png",
    },
  ];

  return (
    <div className="w-full max-w-[85vw] mx-auto">
      <div className="mb-10 text-center">
        <h1 className="text-3xl lg:text-5xl tracking-tighter font-regular">
          Our Mission Is Your Success
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 justify-items-center">
        {features.map((feature, index: number) => (
          <Feature
            key={`${feature.title}-${index}`}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.imageSrc}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  imageSrc,
  index,
}: {
  title: string;
  description: string;
  imageSrc: string;
  index: number;
}) => {
  return (
    <div className={cn("flex flex-col py-10 relative group/feature")}>
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10">
        <Image
          src={imageSrc}
          alt={`${title} icon`}
          width={500}
          height={500}
          className="w-10 h-auto"
        />
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-muted max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};

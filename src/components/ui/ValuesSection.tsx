"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { RefreshCw, Check, Shield, Users, Heart } from "lucide-react";

export function ValuesSection() {
  const values = [
    {
      title: "Simplicity",
      description:
        "We embrace change and continuously seek new ways to improve and innovate.",
      icon: <RefreshCw className="w-10 h-10 text-primary" />,
    },
    {
      title: "Clarity",
      description:
        "We are committed to delivering the highest quality services and solutions.",
      icon: <Check className="w-10 h-10 text-primary" />,
    },
    {
      title: "Integrity",
      description: "We conduct our business with honesty and transparency.",
      icon: <Shield className="w-10 h-10 text-primary" />,
    },
    {
      title: "Customer-Centricity",
      description:
        "Our clients are at the heart of everything we do. We listen, understand, and deliver solutions that exceed their expectations.",
      icon: <Users className="w-10 h-10 text-primary" />,
    },
    {
      title: "Empathy",
      description:
        "We believe in the power of teamwork and collaboration, both within our organisation and with our clients.",
      icon: <Heart className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <div className="w-full max-w-[85vw] mx-auto">
      <div className="pt-8 mb-10 text-center">
        <h1 className="text-3xl lg:text-5xl tracking-tighter font-regular">
          Our Values
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 relative z-10 py-10 justify-items-center">
        {values.map((value, index: number) => (
          <ValueItem
            key={`${value.title}-${index}`}
            title={value.title}
            description={value.description}
            icon={value.icon}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

const ValueItem = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div className={cn("flex flex-col py-10 relative group/feature")}>
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10 px-10">{icon}</div>
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

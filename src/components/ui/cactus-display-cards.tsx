"use client";

import DisplayCards from "@/components/ui/display-cards";
import { Award, BarChart, Briefcase } from "lucide-react";

const clientSuccessCards = [
  {
    icon: <Briefcase className="size-4 text-emerald-300" />,
    title: "Enterprise Solutions",
    description: "Build systems that power",
    date: "global businesses.",
    iconClassName: "text-emerald-500",
    titleClassName: "text-emerald-500",
    className:
      "[grid-area:stack] hover:-translate-y-16 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <BarChart className="size-4 text-blue-300" />,
    title: "Digital Transformation",
    description: "Drive change with smart,",
    date: "modern tools.",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-6 before:absolute before:w-[100%] before:rounded-xl before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Award className="size-4 text-purple-300" />,
    title: "Grow Your Career",
    description: "Learn, lead, and level up",
    date: "with us.",
    iconClassName: "text-purple-500",
    titleClassName: "text-purple-500",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-4",
  },
];

export function CactusDisplayCards() {
  return (
    <div className="flex min-h-[300px] w-full items-center justify-center py-6 sm:py-10">
      <div className="w-full max-w-md mx-auto md:max-w-lg lg:max-w-xl xl:max-w-2xl">
        <DisplayCards cards={clientSuccessCards} />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { cn } from "@/lib/utils";
import {
  Activity,
  Briefcase,
  Cloud,
  Database,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

interface PotentialProps {
  description: string;
  serviceCards: {
    icon?: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  // Make sure we have a valid icon
  const iconToRender = icon || defaultIcons[index % defaultIcons.length];

  return (
    <div className={cn("flex flex-col py-10 relative group/feature")}>
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />
      <div className="mb-4 relative z-10 px-10">
        <div className="text-primary w-10 h-10">{iconToRender}</div>
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

const defaultIcons = [
  <Activity key="activity" className="w-6 h-6" />,
  <Briefcase key="briefcase" className="w-6 h-6" />,
  <Cloud key="cloud" className="w-6 h-6" />,
  <Database key="database" className="w-6 h-6" />,
  <ShieldCheck key="shield" className="w-6 h-6" />,
  <TrendingUp key="trending" className="w-6 h-6" />,
];

export default function EnhancedPotential({
  description,
  serviceCards,
}: PotentialProps) {
  return (
    <div className="w-full bg-gray-50 py-16 md:py-24">
      <div className="w-full max-w-[85vw] mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-3xl lg:text-5xl tracking-tighter font-regular">
            Unlock Potential with <span className="text-primary">Cactus</span>
          </h1>
          <div className="max-w-3xl mx-auto mt-4">
            <p className="text-gray-600 text-lg">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 justify-items-center">
          {serviceCards &&
            serviceCards.map((card, index) => (
              <ServiceCard
                key={index}
                icon={card.icon || defaultIcons[index % defaultIcons.length]}
                title={card.title || ""}
                description={card.description || ""}
                index={index}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

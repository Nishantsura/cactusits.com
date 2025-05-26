"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FadeInSection } from "@/components/Services/ServicePageLayout";

// Default icons that can be used if no icons are provided from database
import {
  ClipboardList,
  BarChart2,
  MonitorSmartphone,
  ShieldCheck,
  Compass,
  Layout,
  Users,
  TrendingUp,
  Server,
  Cloud,
  Database,
  LockKeyhole,
} from "lucide-react";

// Map string icon names to actual React components
const iconMap: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList className="w-6 h-6 text-purple-500" />,
  BarChart2: <BarChart2 className="w-6 h-6 text-green-500" />,
  MonitorSmartphone: <MonitorSmartphone className="w-6 h-6 text-blue-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-red-500" />,
  Compass: <Compass className="w-6 h-6 text-blue-500" />,
  Layout: <Layout className="w-6 h-6 text-green-500" />,
  Users: <Users className="w-6 h-6 text-purple-500" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-yellow-500" />,
  Server: <Server className="w-6 h-6 text-indigo-500" />,
  Cloud: <Cloud className="w-6 h-6 text-blue-500" />,
  Database: <Database className="w-6 h-6 text-teal-500" />,
  LockKeyhole: <LockKeyhole className="w-6 h-6 text-orange-500" />,
};

interface ServiceFeature {
  id: string;
  title: string;
  icon: React.ReactNode | string;
}

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  features: {
    id: string;
    title: string;
  }[];
}

interface ExploreProps {
  serviceFeatures: ServiceFeature[];
  serviceDetails: Record<string, ServiceDetail>;
}

export default function Explore({
  serviceFeatures,
  serviceDetails,
}: ExploreProps) {
  const [activeTab, setActiveTab] = useState<string | null>(
    serviceFeatures.length > 0 ? serviceFeatures[0].id : null,
  );

  // Process features to resolve icon strings to React components
  const processedFeatures = serviceFeatures.map((feature) => ({
    ...feature,
    icon:
      typeof feature.icon === "string"
        ? iconMap[feature.icon as string] || (
            <ClipboardList className="w-6 h-6 text-purple-500" />
          )
        : feature.icon,
  }));

  // If no features or details, display a fallback message
  if (
    processedFeatures.length === 0 ||
    !serviceDetails ||
    Object.keys(serviceDetails).length === 0
  ) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">
          No feature information available for this service.
        </p>
      </div>
    );
  }

  return (
    <FadeInSection>
      <div className="w-full max-w-7xl mx-auto">
        <Tabs
          defaultValue={activeTab || undefined}
          className="w-full"
          onValueChange={setActiveTab as (value: string) => void}
        >
          {/* Features Tabs List */}
          <TabsList className="flex flex-wrap justify-center gap-2 mb-8 bg-transparent">
            {processedFeatures.map((feature) => (
              <TabsTrigger
                key={feature.id}
                value={feature.id}
                className="flex items-center space-x-2 p-3 data-[state=active]:bg-slate-100"
              >
                <span className="flex-shrink-0">{feature.icon}</span>
                <span>{feature.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content for each feature */}
          {processedFeatures.map((feature) => {
            const detail = serviceDetails[feature.id];
            if (!detail) return null;

            return (
              <TabsContent key={feature.id} value={feature.id} className="pt-4">
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {detail.title || feature.title}
                    </h3>
                    <p className="text-gray-600">{detail.description}</p>
                  </div>
                  <div className="md:col-span-3">
                    <div className="grid sm:grid-cols-2 gap-4">
                      {detail.features.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-5 rounded-md shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                          <h4 className="font-semibold text-lg mb-2">
                            {item.title}
                          </h4>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </FadeInSection>
  );
}

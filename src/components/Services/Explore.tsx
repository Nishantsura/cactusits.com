"use client";
import type React from "react";
import { useState, useRef } from "react";

// Define types for our data structure
type ServiceFeature = {
  id: string;
  title: string;
  icon: React.ReactNode;
};

type ServiceDetail = {
  id: string;
  title: string;
  description: string;
  features: {
    id: string;
    title: string;
  }[];
};

type ITServicesProps = {
  serviceFeatures: ServiceFeature[];
  serviceDetails: Record<string, ServiceDetail>;
};

const ITServices: React.FC<ITServicesProps> = ({
  serviceFeatures,
  serviceDetails,
}) => {
  // State to track the selected service
  const [selectedService, setSelectedService] = useState<string>(
    serviceFeatures[0]?.id || "",
  );

  // Get the currently selected service details
  const currentServiceDetail = serviceDetails[selectedService];

  // Reference for scrolling navigation
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Function to get icon background color based on service ID
  const getIconBgColor = (serviceId: string) => {
    switch (serviceId) {
      case "consulting":
        return "bg-purple-100";
      case "planning":
        return "bg-green-100";
      case "implementation":
        return "bg-blue-100";
      case "managed":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  // Function to get feature icon color based on index
  const getFeatureIconColor = (index: number) => {
    switch (index % 4) {
      case 0:
        return "bg-emerald-100";
      case 1:
        return "bg-amber-100";
      case 2:
        return "bg-violet-100";
      case 3:
        return "bg-sky-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="uppercase text-sm font-semibold tracking-wider mb-2">
          FEATURES
        </h2>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
          Explore our <span className="text-primary">IT services</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-4">
          Subheading description and information can be added here
        </p>
      </div>

      {/* Mobile/Tablet Navigation - Horizontal Scrollable */}
      <div
        ref={scrollContainerRef}
        className="md:hidden w-full overflow-x-auto pb-2 mb-6 scrollbar-hide -mx-4 px-4"
      >
        <div className="flex whitespace-nowrap gap-3 pb-1">
          {serviceFeatures.map((service) => (
            <div
              key={service.id}
              className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 inline-block ${
                selectedService === service.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getIconBgColor(service.id)}`}>
                  {service.icon}
                </div>
                <span className="font-medium text-sm whitespace-nowrap">{service.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive Layout - Flex column on small screens, row on medium+ */}
      <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left column - Service list (Desktop only) */}
        <div className="hidden md:block space-y-4 w-full md:w-[30%] lg:w-[35%] xl:w-[30%] shrink-0">
          {serviceFeatures.map((service) => (
            <div
              key={service.id}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:shadow-md ${
                selectedService === service.id
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedService(service.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${getIconBgColor(service.id)}`}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-medium text-base lg:text-lg mb-0">{service.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column - Service details */}
        <div className="bg-warm-white rounded-lg p-5 sm:p-6 md:p-8 w-full md:w-[70%] lg:w-[65%] xl:w-[70%] border border-gray-100 shadow-sm">
          <h2 className="text-xl sm:text-2xl md:text-2xl font-bold mb-3 sm:mb-4 md:mb-6">
            {currentServiceDetail.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-base mb-6 md:mb-8 leading-relaxed">
            {currentServiceDetail.description}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {currentServiceDetail.features.map((feature, index) => (
              <div key={feature.id} className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${getFeatureIconColor(index)}`}
                >
                  <span className="text-xs font-medium">0{index + 1}</span>
                </div>
                <span className="font-medium text-sm sm:text-base">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ITServices;

"use client";

import { Globe, Shield, Target, Cloud, Cpu, DatabaseZap } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor?: string;
  accentPosition?: string;
  image?: string;
  imagePosition?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  slug?: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  accentColor,
  accentPosition,
  image,
  imagePosition,
  imageWidth,
  imageHeight,
  imageAlt,
  slug,
  index = 0,
}) => {
  // Only show illustrations on cards 1, 3, and 5 (index 0, 2, 4)
  const shouldShowIllustration = index === 0 || index === 2 || index === 4;

  return (
    <Link
      href={`/services/${slug || title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className={`relative ${
          shouldShowIllustration ? "bg-[#22242F]" : "bg-[#111218]"
        } rounded-lg p-6 overflow-hidden min-h-64 md:h-72 cursor-pointer hover:shadow-lg transition-shadow duration-300 group/service`}
      >
        {/* Hover animation overlay similar to Feature component */}
        <div className="opacity-0 group-hover/service:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#2a2d3a]/20 to-transparent pointer-events-none" />

        <div className="z-10 relative">
          <div className="bg-[#2a2d3a] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4 transition-transform duration-300 group-hover/service:scale-110">
            {icon}
          </div>
          <h3 className="text-white text-lg font-semibold mb-2 mt-10 group-hover/service:translate-x-2 transition-transform duration-300">
            {title}
          </h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>

        {/* Add illustrations only on cards 1, 3, 5 */}
        {shouldShowIllustration && (
          <Image
            src={
              image ||
              `/landing/services-${Math.floor(Math.random() * 3) + 1}.png`
            }
            alt={imageAlt || "service image"}
            width={imageWidth || 500}
            height={imageHeight || 500}
            className="absolute top-2 right-2 h-auto w-32 transition-transform duration-300 group-hover/service:scale-110"
          />
        )}

        {/* Add accent color if provided */}
        {accentColor && (
          <div
            className={`absolute ${accentPosition || "bottom-0 right-0"} h-24 w-24 rounded-full opacity-30 transition-transform duration-300 group-hover/service:scale-150 ${accentColor || "bg-primary"}`}
          />
        )}
      </div>
    </Link>
  );
};

export default function Services() {
  const [services, setServices] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Get the icon component based on the service type
  const getIconComponent = (type: string) => {
    switch (type?.toLowerCase()) {
      case "consulting":
        return <Globe className="w-5 h-5 text-white" />;
      case "digital":
        return <Cpu className="w-5 h-5 text-white" />;
      case "cloud":
        return <Cloud className="w-5 h-5 text-white" />;
      case "data":
        return <DatabaseZap className="w-5 h-5 text-white" />;
      case "security":
        return <Shield className="w-5 h-5 text-white" />;
      case "infrastructure":
        return <Target className="w-5 h-5 text-white" />;
      default:
        return <Globe className="w-5 h-5 text-white" />;
    }
  };

  // Fetch services from the database when component mounts
  React.useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const { getServices } = await import("@/lib/data-utils");
        const { data, error } = await getServices();

        if (error) {
          throw error;
        }

        if (data) {
          // Format services data for display
          const formattedServices = data
            .filter((service: any) => service.is_active !== false) // Only show active services
            .sort(
              (a: any, b: any) =>
                (a.order_index || 999) - (b.order_index || 999),
            ) // Sort by order index
            .map((service: any) => ({
              title: service.title,
              description: service.description || "",
              icon: getIconComponent(service.type),
              slug: service.slug,
              accentColor: service.accent_color
                ? `bg-${service.accent_color}`
                : undefined,
              accentPosition: service.accent_position,
              image: service.image_url,
              imagePosition: service.image_position || "top-0 right-0",
              imageWidth: 500,
              imageHeight: 500,
              imageAlt: service.image_alt || service.title,
            }));

          setServices(formattedServices);
        }
      } catch (err: any) {
        console.error("Error fetching services:", err);
        setError(err.message || "Failed to load services");
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="bg-[#18181B] py-5 w-full overflow-hidden">
      <div className="max-w-[85vw] mx-auto w-full">
        <div className="flex justify-between flex-col md:flex-row mb-4 relative text-center md:text-left">
          <div>
            <h2 className="text-3xl lg:text-5xl tracking-tighter text-white leading-tight font-regular">
              Empowering Your <span className="text-primary">Business</span>{" "}
              with
              <br />
              <span className="text-primary">Innovative IT Solutions</span>
            </h2>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <p className="text-white text-lg">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-2">Unable to load services</p>
            <p className="text-gray-400 text-sm">{error}</p>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-white">No services available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description}
                icon={service.icon}
                accentColor={service.accentColor}
                accentPosition={service.accentPosition}
                image={service.image}
                imagePosition={service.imagePosition}
                imageWidth={service.imageWidth}
                imageHeight={service.imageHeight}
                imageAlt={service.imageAlt}
                slug={service.slug}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

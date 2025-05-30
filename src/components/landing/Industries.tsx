"use client";

import type React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { getIndustries } from "@/lib/data-utils";

interface IndustryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const IndustryCard: React.FC<IndustryCardProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="relative overflow-hidden min-w-[300px] sm:min-w-[350px] h-[250px] bg-warm-white rounded-lg p-6 flex flex-col justify-between border border-gray-100 shadow-sm">
      <div className="absolute top-0 right-0 ">{icon}</div>
      <div className="mt-16">
        <h3 className="font-semibold text-[#2d2d40]">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default function IndustriesSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [industries, setIndustries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch industries from the database when component mounts
  useEffect(() => {
    async function fetchIndustries() {
      try {
        const { data, error } = await getIndustries();

        if (error) {
          throw error;
        }

        setIndustries(data || []);
      } catch (err) {
        console.error("Error fetching industries:", err);
        setError("Failed to load industries");
      } finally {
        setIsLoading(false);
      }
    }

    fetchIndustries();
  }, []);

  // Default industry images for fallback
  const defaultIcons = [
    <Image
      key="icon1"
      src="/careers/industry-1.svg"
      alt="Industry"
      width={1000}
      height={1000}
      className="w-44 h-auto"
    />,
    <Image
      key="icon2"
      src="/careers/industry-2.svg"
      alt="Industry"
      width={1000}
      height={1000}
      className="w-20 h-auto"
    />,
  ];

  return (
    <div className="w-full max-w-[85vw] mx-auto px-4 pt-10 pb-3 md:pt-12">
      {/* Header */}
      <div className="mb-2 pt-1">
        <h1 className="text-3xl lg:text-5xl tracking-tighter text-[#2d2d40] leading-tight mb-2 font-regular">
          We cater to a diverse range of industries,
          <br /> providing specialised{" "}
          <span className="text-primary">IT solutions</span>
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-3 mt-2 justify-between overflow-hidden">
        {/* Left column with heading and image */}
        <div className="w-fit lg:w-3/12 relative inline-block">
          <Image
            src="/landing/industry-1.svg"
            alt="left industry"
            width={1000}
            height={1000}
            className="h-auto max-w-44 sm:max-w-64 w-full lg:w-auto"
          />
          <Link href="/industries">
            <button className="flex w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-foreground items-center justify-center text-white border-8 absolute bottom-0 -right-10 lg:left-44 text-xs sm:text-sm">
              VIEW ALL <MoveUpRight className="h-4 w-auto" />
            </button>
          </Link>
        </div>

        {/* Right column with description and scrollable carousel */}
        <div className="w-full lg:w-9/12 relative">
          <p className="text-gray-muted my-4 sm:my-6 text-base sm:text-lg">
            We deliver specialised IT services across a wide range of
            industries. From powering innovation in tech driven enterprises to
            enhancing compliance and efficiency in healthcare, finance, and the
            public sector, our tailored solutions are designed to meet the
            unique challenges of each domain. Whether it&apos;s cloud
            transformation, cybersecurity, or AI adoption, we help organisations
            stay agile, secure, and future ready.
          </p>

          {/* Scrollable carousel */}
          <div className="mb-8 relative px-6 overflow-hidden">
            {" "}
            {/* Added px-6 for arrow spacing */}
            <div
              ref={carouselRef}
              className="flex gap-5 snap-x snap-mandatory overflow-x-scroll scroll-smooth pb-4 scrollbar-hide"
            >
              {isLoading ? (
                // Loading placeholders
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={`loading-${index}`} className="snap-start">
                      <div className="relative overflow-hidden min-w-[300px] sm:min-w-[350px] h-[250px] bg-warm-white rounded-lg p-6 flex flex-col justify-between border border-gray-100 shadow-sm animate-pulse">
                        <div className="h-16 w-16 bg-gray-200 rounded-full absolute top-2 right-2"></div>
                        <div className="mt-16">
                          <div className="h-6 bg-gray-200 w-3/4 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 w-full rounded"></div>
                        </div>
                      </div>
                    </div>
                  ))
              ) : error ? (
                // Error state
                <div className="snap-start">
                  <div className="relative overflow-hidden min-w-[300px] sm:min-w-[350px] h-[250px] bg-warm-white rounded-lg p-6 flex flex-col justify-center items-center border border-gray-100 shadow-sm">
                    <p className="text-gray-500">Failed to load industries</p>
                  </div>
                </div>
              ) : industries.length > 0 ? (
                // Map through the fetched industries
                industries.map((industry, index) => (
                  <div key={industry.id || index} className="snap-start">
                    <IndustryCard
                      title={industry.name || industry.hero_industry || ""}
                      description={
                        industry.short_description ||
                        industry.hero_description ||
                        ""
                      }
                      icon={defaultIcons[index % defaultIcons.length]}
                    />
                  </div>
                ))
              ) : (
                // Fallback for no industries
                <div className="snap-start">
                  <div className="relative overflow-hidden min-w-[300px] sm:min-w-[350px] h-[250px] bg-warm-white rounded-lg p-6 flex flex-col justify-center items-center border border-gray-100 shadow-sm">
                    <p className="text-gray-500">No industries found</p>
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() =>
                carouselRef.current?.scrollBy({
                  left: -350,
                  behavior: "smooth",
                })
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-warm-white p-2 rounded-full shadow-md hover:bg-foreground"
              aria-label="Scroll left"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={() =>
                carouselRef.current?.scrollBy({ left: 350, behavior: "smooth" })
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-warm-white p-2 rounded-full shadow-md hover:bg-foreground"
              aria-label="Scroll right"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function ChooseUs() {
  // Keep the existing content but adapt to new layout
  const chooseUsPoints = [
    {
      icon: "/landing/chooseus-1.png",
      heading: "Expertise",
      description:
        "Our team of professionals brings a wealth of knowledge and experience to every project.",
    },
    {
      icon: "/landing/chooseus-2.png",
      heading: "Innovation",
      description:
        "We leverage the latest technologies to deliver cutting-edge solutions.",
    },
    {
      icon: "/landing/chooseus-3.png",
      heading: "Customer Centric Approach",
      description:
        "We prioritise our client's needs and work closely with them to achieve their goals.",
    },
    {
      icon: "/landing/chooseus-4.png",
      heading: "Proven Track Record",
      description: "A history of successful projects and satisfied clients.",
    },
  ];

  return (
    <section className="w-full py-20 lg:py-40">
      {/* Heading removed as requested */}

      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start md:items-center">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              {/* Badge removed as requested */}
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="cactus it logo"
                    width={1000}
                    height={1000}
                    className="w-7 h-7 object-contain mr-2"
                  />
                  Why Choose Cactus
                </h2>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left">
                  We provide unparalleled IT services with a focus on quality
                  and innovation.
                </p>
              </div>
            </div>
            <div className="grid lg:pl-6 grid-cols-1 sm:grid-cols-2 items-start gap-6">
              {chooseUsPoints.map((point, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col py-8 px-2 relative group/feature rounded-lg hover:shadow-md transition-all duration-300",
                  )}
                >
                  {/* Hover animation overlay similar to Feature component */}
                  <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 to-transparent pointer-events-none" />

                  <div className="mb-4 relative z-10 px-6">
                    <Image
                      src={point.icon}
                      alt={`${point.heading} icon`}
                      width={28}
                      height={28}
                      className="w-8 h-8"
                    />
                  </div>

                  <div className="text-lg font-medium mb-2 relative z-10 px-6">
                    <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
                    <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800">
                      {point.heading}
                    </span>
                  </div>

                  <p className="text-sm text-gray-muted px-6 relative z-10">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-muted rounded-md h-[350px] overflow-hidden">
            <Image
              src="/landing/pexels-tiger-lily-7109063.jpg"
              alt="Why Choose Us"
              width={800}
              height={450}
              className="w-full h-[300px] md:h-[400px] lg:h-[450px] object-cover object-center rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

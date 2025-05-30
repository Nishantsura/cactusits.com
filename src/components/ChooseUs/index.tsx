import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
        <div className="grid grid-cols-1 gap-8 items-start lg:items-center lg:grid-cols-2">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              {/* Badge removed as requested */}
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl lg:text-5xl tracking-tighter max-w-xl text-left font-regular">
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
                <div key={index} className="flex flex-row gap-6 items-start">
                  <div className="flex-shrink-0 mt-1">
                    <Image
                      src={point.icon}
                      alt={`${point.heading} icon`}
                      width={28}
                      height={28}
                      className="w-7 h-7"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">{point.heading}</p>
                    <p className="text-muted-foreground text-sm">
                      {point.description}
                    </p>
                  </div>
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
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

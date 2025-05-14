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
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  image,
  imagePosition,
  imageWidth,
  imageHeight,
  imageAlt,
}) => {
  return (
    <div
      className={`relative ${
        image ? "bg-[#22242F]" : "bg-[#111218]"
      } rounded-lg p-6 overflow-hidden min-h-64 md:h-72`}
    >
      <div className="z-10">
        <div className="bg-[#2a2d3a] rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-white text-lg font-semibold mb-2 mt-10">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
        {image && (
          <Image
            src={image || "/landing/quality-arrow.svg"}
            alt={imageAlt || "service image"}
            width={imageWidth || 500}
            height={imageHeight || 500}
            className={`absolute w-24 ${imagePosition} h-auto`}
          />
        )}
      </div>
    </div>
  );
};

export default function Services() {
  const services = [
    {
      title: "IT Consulting, Strategy & Services",
      description:
        "Expert advice to guide your technology decisions and develop strategic IT plans.",
      icon: <Globe className="w-5 h-5 text-white" />,
    },
    {
      title: "Digital Transformation",
      description:
        "Innovative solutions to enhance your operations and drive growth.",
      icon: <Cpu className="w-5 h-5 text-white" />,
      accentColor: "bg-purple-500",
      accentPosition: "top-right",
      image: "/landing/services-1.png",
      imagePosition: "top-0 right-0",
      imageWidth: 500,
      imageHeight: 500,
      imageAlt: "arrow pointing the feature",
    },
    {
      title: "Cloud Services",
      description:
        "Secure and flexible cloud solutions to support your business needs.",
      icon: <Cloud className="w-5 h-5 text-white" />,
    },
    {
      title: "Data and AI",
      description:
        "Advanced data analytics and AI solutions to drive business insights and growth.",
      icon: <DatabaseZap className="w-5 h-5 text-white" fill="" />,
      accentColor: "bg-blue-500",
      accentPosition: "bottom-left",
      image: "/landing/services-2.png",
      imagePosition: "top-0 right-10 w-72",
      imageWidth: 500,
      imageHeight: 500,
      imageAlt: "arrow pointing the feature",
    },
    {
      title: "Cybersecurity & IT Infrastructure Management",
      description: "Protect and optimise your IT foundation.",
      icon: <Shield className="w-5 h-5 text-white" />,
    },
    {
      title: "Agile Delivery",
      description:
        "Efficient and adaptive project delivery using agile methodologies.",
      icon: <Target className="w-5 h-5 text-white" />,
      accentColor: "bg-orange-400",
      accentPosition: "bottom-right",
      image: "/landing/services-3.png",
      imagePosition: "top-0 right-0 w-44",
      imageWidth: 500,
      imageHeight: 500,
      imageAlt: "arrow pointing the feature",
    },
  ];
  return (
    <section className="bg-[#18181B] py-8 px-4 md:px-8 w-full overflow-hidden">
      <div className="max-w-[85vw] mx-auto w-full">
        <div className="mb-6 relative text-center md:text-left">
          <p className="text-white text-lg mb-2 ">Our Services</p>
          <div className="flex justify-between flex-col md:flex-row mb-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Empowering Your <span className="text-primary">Business</span>{" "}
                with
                <br />
                <span className="text-primary">Innovative IT Solutions</span>
              </h2>
              <p className="text-white text-base md:text-xl mt-8">
                At Cactus, we are dedicated to transforming businesses through
                cutting-edge technology and unparalleled expertise. Originally
                established as a leading staffing agency, we have expanded our
                horizons to become a comprehensive IT services provider.
              </p>
            </div>
            <Link href="/services">
              <button className="text-white px-6 py-3 rounded-full border-gray-muted border-2 mt-4 md:mt-4 cursor-pointer text-nowrap">
                View all Services
              </button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 overflow-visible">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
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
            />
          ))}
        </div>
      </div>
    </section>
  );
}

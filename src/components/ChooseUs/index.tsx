import React from "react";
import Image from "next/image";

interface chooseUsLiProps {
  icon: React.ReactElement<{ size?: number; className?: string }>;
  heading: string;
  description: string;
  percentage: number;
}

function ChooseUsLi({
  icon,
  heading,
  description,
  percentage,
}: chooseUsLiProps) {
  return (
    <li className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="mb-1 sm:mb-0">{icon}</div>
      <div className="flex-1">
        <h3 className="text-lg sm:text-xl font-medium">{heading}</h3>
        <p className="text-gray-500 my-1 text-sm sm:text-base">{description}</p>
        <div className="w-full bg-slate-200 h-1 rounded-full mt-2">
          <div
            className="bg-foreground h-full rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </li>
  );
}

export default function ChooseUs() {
  const chooseUsPoints: chooseUsLiProps[] = [
    {
      icon: (
        <Image
          src="/landing/chooseus-1.png"
          alt="point 1 image"
          width={500}
          height={500}
          className="w-7 h-7"
        />
      ),
      heading: "Expertise",
      description:
        "Our team of professionals brings a wealth of knowledge and experience to every project.",
      percentage: 0,
    },
    {
      icon: (
        <Image
          src="/landing/chooseus-2.png"
          alt="point 1 image"
          width={500}
          height={500}
          className="w-7 h-7"
        />
      ),
      heading: "Innovation",
      description:
        "We leverage the latest technologies to deliver cutting-edge solutions.",
      percentage: 0,
    },
    {
      icon: (
        <Image
          src="/landing/chooseus-3.png"
          alt="point 1 image"
          width={500}
          height={500}
          className="w-7 h-7"
        />
      ),
      heading: "Customer Centric Approach",
      description:
        "We prioritise our client's needs and work closely with them to achieve their goals.",
      percentage: 0,
    },
    {
      icon: (
        <Image
          src="/landing/chooseus-4.png"
          alt="point 1 image"
          width={500}
          height={500}
          className="w-7 h-7"
        />
      ),
      heading: "Proven Track Record",
      description: "A history of successful projects and satisfied clients.",
      percentage: 0,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto mt-8 px-4 py-12 sm:py-20 min-h-screen">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left mb-6 sm:mb-10">
        Why you&apos;d love to <span className="text-primary">choose us.</span>
      </h1>

      <div className="w-full flex flex-col md:flex-row gap-8 mt-8">
        <div className="w-full md:w-1/2 lg:w-3/5 flex justify-center items-center mb-8 md:mb-0">
          <div className="relative rounded-lg w-full h-full flex justify-center items-center">
            <Image
              src="/landing/chooseus.jpg"
              alt="hero image"
              width={500}
              height={500}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-2/5">
          <ul className="flex flex-col">
            {chooseUsPoints.map((point, index) => (
              <ChooseUsLi
                key={index}
                icon={point.icon}
                heading={point.heading}
                description={point.description}
                percentage={point.percentage}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

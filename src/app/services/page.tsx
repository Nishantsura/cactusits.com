import NewsLetter from "@/components/landing/NewsLetter";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Comprehensive IT Services for Business Success | Cactus",
  description:
    "Explore our wide range of IT services, including consulting, digital transformation, cloud services, data and AI, cybersecurity, and more. Empower your business with Cactus.",
  keywords: [
    "IT services",
    "consulting",
    "digital transformation",
    "cloud services",
    "data analytics",
    "AI solutions",
    "cybersecurity",
    "Cactus",
  ],
  openGraph: {
    title: "Comprehensive IT Services for Business Success | Cactus",
    description:
      "Explore our wide range of IT services, from consulting to cybersecurity.",
    type: "website",
    url: "/services",
  },
};

export default function Home() {
  return (
    <div className="w-full">
      <main className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-[115px]">
        {/* IT Consulting Strategy Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 items-center"
          id="it-consulting"
        >
          <div>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              REDEFINE YOUR BUSINESS STRATEGY
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              IT Consulting Strategy and Services
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              At Cactus, we help organisations unlock their full potential
              through tailored consulting services. Our expertise in business
              strategy, digital transformation, and technology advisory ensures
              you stay ahead in an evolving digital landscape.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/it-consulting"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
            <Image
              src="/services/img1.png"
              alt="IT professionals collaborating"
              fill
              className="object-top object-cover"
              priority
            />
          </div>
        </section>

        {/* Digital Transformation Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 items-center"
          id="digital-transformation"
        >
          <div className="order-2 md:order-1 relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
            <Image
              src="/services/img2.png"
              alt="Professional working on digital transformation"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              TRANSFORM YOUR BUSINESS DIGITALLY
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Digital Transformation
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Transform Your Innovative solutions to enhance your operations and
              drive growth. Enhance operational efficiency and drive growth with
              our cutting-edge digital transformation solutions.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/digital-transformation"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Cloud Services Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mb-12 md:mb-16"
          id="cloud-services"
        >
          <div>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              SECURE AND FLEXCIBLE CLOUD SOLUTIONS
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Cloud Services
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Secure and flexible cloud solutions to support your business
              needs. Detailed Description: Our cloud services provide secure,
              scalable, and cost-effective solutions to meet your business
              needs.
            </p>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/cloud-services"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
            <Image
              src="/services/img3.png"
              alt="Cloud infrastructure"
              fill
              className="object-cover"
            />
          </div>
        </section>

        {/* Data and AI Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24 items-center"
          id="data-ai"
        >
          <div className="order-2 md:order-1 relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] self-start">
            <Image
              src="/services/img4.png"
              alt="Professional working on digital transformation"
              fill
              className="object-cover "
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              Data and AI
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Harness the Power of Data and AI
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Transform Your Innovative solutions to enhance your operations and
              drive growth. Enhance operational efficiency and drive growth with
              our cutting-edge digital transformation solutions.
            </p>
            <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold">
              BENEFITS
            </h3>
            <ul className="space-y-2 my-4 sm:my-6 mb-6 sm:mb-8 text-sm sm:text-base">
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Data-driven insights
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                AI-powered solutions
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Business growth
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/data-ai"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Cybersecurity Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mb-16 md:mb-24"
          id="cybersecurity"
        >
          <div>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              Protect your business with robust security
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Cybersecurity
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Comprehensive security solutions to protect your systems and data.
              Our cybersecurity solutions provide robust protection for your
              systems and data against threats.
            </p>
            <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold">
              BENEFITS
            </h3>
            <ul className="space-y-2 my-4 sm:my-6 mb-6 sm:mb-8 text-sm sm:text-base">
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Robust security measures
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Data protection
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Threat mitigation
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/cybersecurity"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
            <Image
              src="/services/img5.png"
              alt="Cloud infrastructure"
              fill
              className="object-cover object-top"
            />
          </div>
        </section>

        {/* IT Infrastructure Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24 items-center"
          id="it-infrastructure"
        >
          <div className="order-2 md:order-1 relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px] self-start">
            <Image
              src="/services/img6.png"
              alt="Professional working on digital transformation"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              Optimise your it infrastructure
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              IT Infrastructure & Lifecycle Management
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              End-to-end management of your IT infrastructure to ensure optimal
              performance and longevity. Ensure optimal performance and
              longevity of your IT assets with our comprehensive infrastructure
              management services.
            </p>
            <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold">
              BENEFITS
            </h3>
            <ul className="space-y-2 my-4 sm:my-6 mb-6 sm:mb-8 text-sm sm:text-base">
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Optimal performance
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Longevity of IT assets
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Comprehensive management
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/it-infrastructure"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Agile Delivery Section */}
        <section
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center mb-4 md:mb-24"
          id="agile-delivery"
        >
          <div>
            <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
              Efficient and adaptive project delivery
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Agile Delivery
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Efficient and adaptive project delivery using agile methodologies.
              Deliver projects efficiently and adaptively with our agile
              methodologies.
            </p>
            <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold">
              BENEFITS
            </h3>
            <ul className="space-y-2 my-4 sm:my-6 mb-6 sm:mb-8 text-sm sm:text-base">
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Adaptive project management
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Efficient delivery
              </li>
              <li className="flex gap-2 items-center">
                <CircleCheck
                  size={16}
                  fill="var(--foreground)"
                  className="text-white"
                />{" "}
                Comprehensive management
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/get-started"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services/agile-delivery"
                className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
              >
                Learn More
              </Link>
            </div>
          </div>
          <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
            <Image
              src="/services/img7.png"
              alt="Cloud infrastructure"
              fill
              className="object-cover object-top"
            />
          </div>
        </section>
      </main>
      <NewsLetter />
    </div>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { getServiceLocalImage } from "@/lib/service-image-mapping";

// This function has been moved to /src/lib/service-image-mapping.ts
// and is now imported as getServiceLocalImage

interface HeroProps {
  service: string;
  title: string;
  description: string;
  bulletpoints: string[];
  image: string;
}

export default function EnhancedHero({
  service,
  title,
  description,
  bulletpoints,
  image,
}: HeroProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col"
          >
            <motion.p
              variants={itemVariants}
              className="text-sm md:text-base font-medium tracking-wide text-primary uppercase mb-4"
            >
              {service}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6"
            >
              {title ? (
                title.split(" ").map((word, i) =>
                  i === 2 ? (
                    <span key={i} className="text-primary">
                      {word}{" "}
                    </span>
                  ) : (
                    word + " "
                  ),
                )
              ) : (
                // Fallback when title is null or undefined
                <span>{service || "Our Service"}</span>
              )}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed text-gray-600 mb-8"
            >
              {description}
            </motion.p>

            {/* Add a style tag for the hover effect */}
            <style jsx global>{`
              /* Base styling for all items */
              .bulletpoint-container .bulletpoint-item {
                position: relative;
                z-index: 1;
                margin-bottom: 1.5rem;
              }

              /* When an item is hovered */
              .bulletpoint-container .bulletpoint-item:hover {
                transform: translateY(-8px);
                z-index: 10;
              }

              /* For items after the hovered item */
              .bulletpoint-container
                .bulletpoint-item:hover
                ~ .bulletpoint-item {
                transform: translateY(24px);
                opacity: 0.2;
              }

              /* Keep text visible even when card is faded */
              .bulletpoint-container
                .bulletpoint-item:hover
                ~ .bulletpoint-item
                .bulletpoint-text {
                opacity: 1;
              }
            `}</style>

            <motion.div
              variants={containerVariants}
              className="relative bulletpoint-container"
              style={{ marginTop: "2rem" }}
            >
              {bulletpoints.map((point, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bulletpoint-item flex items-start gap-4 transition-all duration-300 ease-in-out cursor-pointer relative"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary bg-opacity-10 flex-shrink-0">
                    <Image
                      src={`/careers/hero-${index + 1}.png`}
                      alt={`Point ${index + 1}`}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="text-base md:text-lg leading-relaxed text-gray-700 bulletpoint-text">
                      {point}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10">
              <Link href="/contact" passHref>
                <InteractiveHoverButton
                  text="Get in touch"
                  className="h-12 px-8 text-base font-medium bg-white text-black w-auto min-w-[160px] hover:bg-green-500 hover:text-white"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src={getServiceLocalImage(service, service)}
                alt="Service Illustration"
                width={1000}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
              {/* Accent shape */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary opacity-20 rounded-full"></div>
            </div>
            {/* Background patterns */}
            <div className="absolute -z-10 top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-full h-full">
              <div className="absolute top-10 left-10 w-48 h-48 bg-gray-100 rounded-full opacity-30 blur-2xl"></div>
              <div className="absolute bottom-40 right-10 w-64 h-64 bg-primary rounded-full opacity-10 blur-3xl"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

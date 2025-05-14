"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

interface ServicePageSectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  accentColor?: string;
  background?: "white" | "light" | "gradient";
  children: React.ReactNode;
  fullWidth?: boolean;
}

export const ServicePageSection: React.FC<ServicePageSectionProps> = ({
  id,
  title,
  subtitle,
  accentColor = "primary",
  background = "white",
  children,
  fullWidth = false,
}) => {
  const getBgClass = () => {
    switch (background) {
      case "light":
        return "bg-gray-50";
      case "gradient":
        return "bg-gradient-to-br from-gray-50 to-white";
      default:
        return "bg-white";
    }
  };

  return (
    <Section 
      id={id} 
      spacing="normal" 
      className={`${getBgClass()} py-16 md:py-24 w-full`}
    >
      <div className={`${fullWidth ? 'w-full' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl lg:text-4xl font-bold mb-4 relative inline-block"
              >
                {title}
                <div className={`absolute -bottom-2 left-1/4 right-1/4 h-1 bg-${accentColor} rounded-full`}></div>
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto text-gray-600 text-base md:text-lg mt-4"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
        )}
        {children}
      </div>
    </Section>
  );
};

const FadeInSection = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export { FadeInSection };

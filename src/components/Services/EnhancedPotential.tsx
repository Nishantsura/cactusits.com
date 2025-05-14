"use client";
import React from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

interface PotentialProps {
  description: string;
  serviceCards: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  index
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg border border-gray-100 flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1"
    >
      <div className="mb-4 text-primary bg-primary bg-opacity-10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-base leading-relaxed flex-grow">{description}</p>
    </motion.div>
  );
};

export default function EnhancedPotential({ description, serviceCards }: PotentialProps) {
  return (
    <div className="w-full bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Unlock Potential with <span className="text-primary">Cactus</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-gray-600 text-lg">
              {description}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <ServiceCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

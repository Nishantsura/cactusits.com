"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

// Define the testimonial type
export type ServiceTestimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
  company?: string;
  service?: string;
};

// Sample testimonials data array that can be overridden by props
const defaultTestimonials: ServiceTestimonial[] = [
  {
    text: "Cactus has been instrumental in our digital transformation journey. Their expertise and strategic guidance have helped us navigate complex technological challenges with confidence.",
    image: "/testimonials/avatar1.png",
    name: "Sarah Johnson",
    role: "CTO",
    company: "Global Innovations"
  },
  {
    text: "Working with Cactus on our cloud migration project exceeded our expectations. Their team's technical knowledge and attention to detail ensured a smooth transition with minimal disruption.",
    image: "/testimonials/avatar2.png",
    name: "Michael Chen",
    role: "IT Director",
    company: "Horizon Solutions"
  },
  {
    text: "The cybersecurity assessment Cactus conducted for our organization was comprehensive and eye-opening. They identified vulnerabilities we weren't aware of and provided practical solutions.",
    image: "/testimonials/avatar3.png",
    name: "Emma Rodriguez",
    role: "Security Manager",
    company: "SecureTech Inc."
  }
];

export default function ServiceTestimonials({ 
  testimonials = defaultTestimonials,
  title = "What Our Clients Say",
  subtitle = "Discover how we've helped organizations across various industries achieve their business objectives through innovative IT solutions."
}: {
  testimonials?: ServiceTestimonial[];
  title?: string;
  subtitle?: string;
}) {
  return (
    <Section id="testimonials" spacing="normal" verticalAlign="center" className="bg-gray-50 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          {title}
        </h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-base">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full"
          >
            {/* Quote icon */}
            <div className="mb-4 text-primary">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11H6C3.79086 11 2 9.20914 2 7V7C2 4.79086 3.79086 3 6 3H7C8.10457 3 9 3.89543 9 5V8C9 8.55228 8.55228 9 8 9H7C5.89543 9 5 9.89543 5 11V13C5 14.1046 5.89543 15 7 15H9C10.1046 15 11 14.1046 11 13V13C11 11.8954 10.1046 11 9 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 11H18C15.7909 11 14 9.20914 14 7V7C14 4.79086 15.7909 3 18 3H19C20.1046 3 21 3.89543 21 5V8C21 8.55228 20.5523 9 20 9H19C17.8954 9 17 9.89543 17 11V13C17 14.1046 17.8954 15 19 15H21C22.1046 15 23 14.1046 23 13V13C23 11.8954 22.1046 11 21 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            
            {/* Testimonial text */}
            <p className="text-gray-700 italic mb-6 flex-grow">
              "{testimonial.text}"
            </p>
            
            {/* Author info */}
            <div className="flex items-center mt-auto">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="h-12 w-12 rounded-full object-cover mr-4 border-2 border-gray-100"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <div className="text-sm text-gray-600">
                  {testimonial.role}{testimonial.company ? `, ${testimonial.company}` : ''}
                </div>
                {testimonial.service && (
                  <div className="text-xs text-primary mt-1">
                    {testimonial.service}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

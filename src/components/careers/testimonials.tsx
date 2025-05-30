"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Define types for our testimonial data
type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

// Testimonials Column Component
const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 30,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div
                  className="p-10 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-warm-white max-w-xs w-full"
                  key={i}
                >
                  <div>{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <div className="h-10 w-10 rounded-full overflow-hidden relative">
                      <Image
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5">
                        {name}
                      </div>
                      <div className="leading-5 opacity-60 tracking-tight">
                        {role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

// Convert existing testimonial data to the new format
const testimonials = [
  {
    text: "Cactus has been very helpful throughout the whole journey of job hunting, their recruitment agents are well trained and taken an account of my interests and goals, when finding a new role for me, as well as during the process of interview, negotiation and placement and after care.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "Zafar Ali",
    role: "Full Stack Developer",
  },
  {
    text: "I have had a great experience with Cactus IT Solutions. They have been extremely helpful from the very beginning in providing all the necessary information needed for my new job and answered all of my questions.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "AS",
    role: "IT Consultant",
  },
  {
    text: "Cactus IT is providing really professional and friendly recruitment services from the first phone call until securing the contract and onboarding. Gowtham and his team have provided all the information regarding the position and the interview details clearly.",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "E Sener",
    role: "Java Full Stack Developer",
  },
  {
    text: "Sandeep's outstanding dedication and guidance made my entire hiring process a pleasure. He provided thorough assistance from the beginning, ensuring I was well-prepared for interviews and kept me updated on follow-ups.",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "Priyanka",
    role: "Test Lead",
  },
  {
    text: "I am incredibly grateful for the opportunity and offer letter I received from Cactus. Accepting the position of DevOps within the esteemed organization fills me with honour and excitement.",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "Vanga",
    role: "DevOps",
  },
  {
    text: "I am deeply grateful to Sai and Vidya for their exceptional support during my job search. Their expert guidance, tailored interview preparation, and professional communication were invaluable, making the process stress-free.",
    image:
      "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "N Habibova",
    role: "Automation Tester",
  },
  {
    text: "The team at Cactus IT Solutions is professional and responsive. They listened to my needs and matched me with a role that aligned perfectly with my skills and career aspirations.",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "Bilal Ahmed",
    role: "Software Engineer",
  },
  {
    text: "Working with Cactus IT Solutions was a game-changer for my career. Their personalized approach and understanding of the tech industry helped me secure a position that perfectly matches my expertise.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "Sana Sheikh",
    role: "UX Designer",
  },
  {
    text: "Cactus IT Solutions provided exceptional service throughout my job search. Their team was attentive, professional, and truly invested in finding the right role for my skills and career goals.",
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    name: "Hassan Ali",
    role: "Data Analyst",
  },
];

// Divide testimonials into three columns
const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// No need for an empty interface

export default function Testimonials() {
  return (
    <section className="bg-background my-10 relative">
      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter">
            Testimonials
          </h2>
          <p className="text-center mt-5 opacity-75">
            Hear directly from professionals who have found success with our
            recruitment services.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={40} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={45}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={42}
          />
        </div>
      </div>
    </section>
  );
}

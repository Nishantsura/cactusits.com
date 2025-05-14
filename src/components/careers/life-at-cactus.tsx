"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ImageData {
  src: string;
  alt: string;
}

// Sample image data - replace with your actual images
const firstRowImages: ImageData[] = [
  {
    src: "/careers/left-1.jpg",
    alt: "Office workspace with people",
  },
  {
    src: "/careers/left-2.jpg",
    alt: "Person working at desk",
  },
  { src: "/careers/left-3.jpg", alt: "Modern office space" },
  { src: "/careers/left-1.jpg", alt: "Team collaboration" },
  { src: "/careers/left-2.jpg", alt: "Office meeting" },
];

const secondRowImages: ImageData[] = [
  { src: "/careers/left-1.jpg", alt: "Team brainstorming" },
  { src: "/careers/left-2.jpg", alt: "People at whiteboard" },
  { src: "/careers/left-3.jpg", alt: "Team discussion" },
  {
    src: "/careers/left-1.jpg",
    alt: "Collaborative workspace",
  },
  { src: "/careers/left-2.jpg", alt: "Office environment" },
];

export default function LifeAtCactus() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 px-4 md:px-8 overflow-hidden bg-warm-white"
      id="life-at-cactus"
    >
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
          Life at Cactus
        </h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Discover what it&apos;s like to work at Cactus. Our vibrant and
          dynamic work environment fosters creativity, collaboration, and
          growth.
        </p>
      </div>

      {/* First row - scrolling left */}
      <div className="mb-6 relative">
        <div
          className={`flex gap-4 md:gap-6 ${isVisible ? "animate-scroll-left" : ""}`}
          style={{
            width: "fit-content",
            animation: isVisible ? "scrollLeft 30s linear infinite" : "none",
          }}
        >
          {/* Duplicate images for seamless looping */}
          {[...firstRowImages, ...firstRowImages].map((image, index) => (
            <div
              key={`first-row-${index}`}
              className="flex-shrink-0 rounded-lg overflow-hidden h-64"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={1000}
                height={1000}
                className="w-auto h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - scrolling right */}
      <div className="relative">
        <div
          className={`flex gap-4 md:gap-6 ${isVisible ? "animate-scroll-right" : ""}`}
          style={{
            width: "fit-content",
            animation: isVisible ? "scrollRight 30s linear infinite" : "none",
          }}
        >
          {/* Duplicate images for seamless looping */}
          {[...secondRowImages, ...secondRowImages].map((image, index) => (
            <div
              key={`second-row-${index}`}
              className="flex-shrink-0 rounded-lg overflow-hidden h-64"
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                width={1000}
                height={1000}
                className="w-auto h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

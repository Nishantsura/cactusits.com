"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "./interactive-hover-button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "smart automation",
      "secure systems",
      "agile delivery",
      "scalable tech",
    ],
    [],
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative h-screen overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/shapelined-_JBKdviweXI-unsplash.jpg"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Light overlay for subtle background effect */}
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          {/* Removed 'Trusted by 1000+ Jobseekers' div as requested */}
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50">
                Empowering Businesses with
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-primary"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-lg leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Welcome to Cactus, where innovation meets excellence. Established
              in 2021, we have rapidly grown into a trusted partner for
              businesses across the UK and Europe, providing cutting-edge IT
              services and staffing & recruitment solutions.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href={"/contact"}>
              <InteractiveHoverButton
                text="Get in touch"
                className="h-12 px-8 text-base font-medium bg-white text-black w-auto min-w-[160px] hover:bg-green-500 hover:text-white group-hover:text-white"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };

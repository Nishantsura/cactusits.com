"use client";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

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
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div>
            <div className="flex items-center gap-4">
              <Image
                src="/aboutus/3ppl.png"
                alt="images of trusted people"
                width={1000}
                height={1000}
                className="h-6 w-auto"
              />
              <h3 className="uppercase text-gray-txt text-sm tracking-wide  flex items-center gap-4">
                {" "}
                Trusted by 1000+ Jobseekers over 5 years
              </h3>
            </div>
          </div>
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
            <button className="w-44 border-2 border-slate-200 px-2 py-3">
              Frequent Queries
            </button>
            <Link href={"/#contactus"}>
              <button className="w-44 bg-foreground text-background px-2 py-3">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="w-full bg-[#F5F5F5] flex flex-col items-center justify-center">
      <div className="bg-background w-full h-full py-16 flex flex-col lg:flex-row px-6 lg:pl-28 lg:pr-28">
        <div className="mb-10 lg:mb-0 lg:pr-10">
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/logo.svg"
              alt="cactus image"
              width={1000}
              height={1000}
              className="w-10 h-auto"
            />
            <h1 className="text-3xl lg:text-4xl flex items-center gap-4">
              Cactus
            </h1>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Services Section */}
          <div>
            <h3 className="text-lg mb-6">Services</h3>
            <ul className="space-y-4 text-[#666] text-sm">
              <li>
                <Link href="/services/it-consulting">
                  IT Consulting, Strategy & Services
                </Link>
              </li>
              <li>
                <Link href="/services/digital-transformation">
                  Digital Transformation
                </Link>
              </li>
              <li>
                <Link href="/services/cloud-services">Cloud Services</Link>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/services">View all</Link>
                <span className="text-black flex items-center gap-1">
                  <Image
                    src="/landing/Bullet.png"
                    alt="bullet point"
                    width={1000}
                    height={1000}
                    className="w-4 h-auto"
                  />
                  New
                </span>
              </li>
            </ul>
          </div>

          {/* Industries Section */}
          <div>
            <h3 className="text-lg mb-6">Industries</h3>
            <ul className="space-y-4 text-[#666] text-sm">
              <li>
                <Link href="/industries/banking-financial">
                  Banking & Financial Services
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <Link href="/industries/healthcare">Healthcare</Link>
                <span className="text-black flex items-center gap-1">
                  <Image
                    src="/landing/Bullet.png"
                    alt="bullet point"
                    width={1000}
                    height={1000}
                    className="w-4 h-auto"
                  />
                  New
                </span>
              </li>
              <li>
                <Link href="/industries/public-sector">Public Sector</Link>
              </li>
              <li>
                <Link href="/industries">View all</Link>
              </li>
            </ul>
          </div>

          {/* Careers Section */}
          <div>
            <h3 className="text-lg mb-6">Careers</h3>
            <ul className="space-y-4 text-[#666] text-sm">
              <li>
                <Link href="/careers/#job-listings">View Jobs</Link>
              </li>
              <li>
                <Link href="/careers/#life-at-cactus">Life at Cactus</Link>
              </li>
              <li>
                <Link href="/careers/#testimonial">Our Talent</Link>
              </li>
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg mb-6">Social</h3>
            <ul className="space-y-4 text-[#666] text-sm">
              <li className="flex items-center">
                <Link
                  href="https://www.linkedin.com/company/cactus-it-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Linkedin <ArrowRight className="ml-1 w-4" />
                </Link>
              </li>
              <li className="flex items-center">
                <Link
                  href="https://x.com/CactusITS_UKLtd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  Twitter <ArrowRight className="ml-1 w-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full min-h-10 px-6 lg:px-32 flex flex-col lg:flex-row text-gray-txt justify-between text-sm pt-2">
        <div>
          <p>©2025 Cactusits, All Rights Reserved.</p>
          <p>
            Made by <Link href="https://nishantsura.com">nishant sura</Link>
          </p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-10 mt-2 lg:mt-0">
          <p>Privacy Policy</p>
          <p>Terms of Service</p>
          <p>Cookies Settings</p>
        </div>
      </div>
    </div>
  );
}

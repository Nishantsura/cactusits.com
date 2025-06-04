"use client";
import React from "react";
import ContactUs from "@/components/landing/ContactUs";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Left Column - Contact Information */}
          <div className="flex flex-col justify-center max-w-xl mx-auto lg:mx-0 w-full">
            <div className="mb-8 sm:mb-10">
              <h2 className="text-3xl lg:text-5xl tracking-tighter font-normal mb-4 sm:mb-6">
                We&apos;d Love to Hear from You
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
                We&apos;re here to help. Reach out to us for any inquiries,
                support, or feedback.
              </p>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Call Us:</p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      +44 118 466 1766
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email:</p>
                    <p className="text-gray-600 text-sm sm:text-base break-words">
                      sales@cactusits.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="bg-primary/10 p-2 sm:p-3 rounded-full flex-shrink-0">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Address:</p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      200 Brook Drive, Green Park, Reading, Berkshire RG2 6UB
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">
                Follow Us
              </h3>
              <div className="flex gap-4">
                <Link
                  href="https://www.linkedin.com/company/cactus-it-solutions/posts/?feedView=all"
                  target="_blank"
                  className="hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <ContactUs />
          </div>
        </div>
      </div>
    </div>
  );
}

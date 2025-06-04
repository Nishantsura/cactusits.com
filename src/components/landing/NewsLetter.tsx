"use client";
import React from "react";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

interface SubscriptionFormProps {
  heading?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ heading }) => {
  return (
    <div className="bg-[#F3F4F6] w-full py-6 sm:py-10 flex justify-center items-center">
      <div className="w-full max-w-[95%] sm:max-w-[90%] bg-background rounded-2xl p-4 sm:p-8 md:p-12 shadow-sm">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl lg:text-5xl tracking-tighter font-regular mb-4 sm:mb-6">
            {heading ? heading : "Join Us On Our Journey"}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-4xl mx-auto mb-8">
            We are more than just an IT company. We are your partners in
            success. Join us on our journey to transform businesses and drive
            innovation. Together, we can achieve great things.
          </p>

          <div className="flex justify-center">
            <Link href="/contact">
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
};

export default SubscriptionForm;

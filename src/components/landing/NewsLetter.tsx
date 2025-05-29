"use client";
import React from "react";
import Link from "next/link";

interface SubscriptionFormProps {
  heading?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ heading }) => {
  return (
    <div className="bg-[#F3F4F6] w-full py-6 sm:py-10 flex justify-center items-center">
      <div className="w-full max-w-[95%] sm:max-w-[90%] bg-background rounded-2xl p-4 sm:p-8 md:p-12 shadow-sm">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {heading ? heading : "Join us on your Journey"}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-4xl mx-auto mb-8">
            At Cactus, we are more than just an IT company. We are your partners
            in success. Join us on our journey to transform businesses and drive
            innovation. Together, we can achieve great things.
          </p>

          <div className="flex justify-center">
            <Link href="/#contactus">
              <button className="px-6 py-3 bg-foreground text-white font-medium transition-colors text-sm sm:text-base">
                Get in touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionForm;

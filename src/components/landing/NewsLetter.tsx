"use client";
import React, { useState } from "react";

//to do https://21st.dev/magicui/retro-grid/default

interface SubscriptionFormProps {
  onSubmit?: (email: string) => void;
  heading?: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({
  onSubmit,
  heading,
}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && onSubmit) {
      onSubmit(email);
    }
  };

  return (
    <div className="bg-[#F3F4F6] w-full py-6 sm:py-10 flex justify-center items-center">
      <div className="w-full max-w-[95%] sm:max-w-[90%] bg-background rounded-2xl p-4 sm:p-8 md:p-12 shadow-sm">
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            {heading ? heading : "Join us on your Journey"}
          </h1>
          <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl sm:max-w-4xl mx-auto">
            At Cactus, we are more than just an IT company. We are your partners
            in success. Join us on our journey to transform businesses and drive
            innovation. Together, we can achieve great things.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-sm sm:max-w-md md:max-w-xl mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email"
            className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-foreground text-sm sm:text-base"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-foreground text-white font-medium transition-colors text-sm sm:text-base text-nowrap"
          >
            Subscribe now
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionForm;

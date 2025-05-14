"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import type { Job } from "@/types/job";

interface ApplicationModalProps {
  job: Job;
  onClose: () => void;
}

export default function ApplicationModal({ onClose }: ApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    location: "",
    experience: "",
    salary: "",
    interests: "",
  });

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close modal when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    // Close modal on escape key
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Application submitted successfully!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div
        ref={modalRef}
        className="bg-warm-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Your Application</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Complete the forms below to apply to our company.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="e.g John"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Search your Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Oxford"
                  className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="experience"
                  className="block text-sm font-medium mb-1"
                >
                  Years of experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-warm-white"
                  required
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5+">5+ years</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="salary"
                  className="block text-sm font-medium mb-1"
                >
                  Desired Salary
                </label>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter Amount in GBP"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="interests"
                className="block text-sm font-medium mb-1"
              >
                What interests about this company?
              </label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-foreground text-white px-6 py-2 rounded-full text-sm font-medium"
              >
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

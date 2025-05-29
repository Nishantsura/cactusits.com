"use client";
import React, { useState, FormEvent } from "react";
import { Send } from "lucide-react";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formError, setFormError] = useState<string>("");
  const [userType, setUserType] = useState<"hiring-manager" | "job-seeker">(
    "job-seeker",
  );
  const [fileName, setFileName] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setFormError("");

    try {
      const formData = new FormData(e.currentTarget);
      // Get form data
      const data: Record<string, any> = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        message: formData.get("message") as string,
        userType: userType,
      };

      // Handle file upload if present
      const resumeFile = formData.get("resume") as File;
      if (resumeFile && resumeFile.name) {
        // In a real implementation, you would upload the file to a storage service
        // and include the URL in the form data
        data.resumeFileName = resumeFile.name;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setShowSuccess(true);
      e.currentTarget.reset();
      setFileName(""); // Reset file name after successful submission
    } catch (error) {
      console.error("Error:", error);
      setFormError("Failed to submit the form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative w-full py-4 md:py-5 lg:py-6 flex flex-col items-center justify-center bg-gray-50"
      id="contactus"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30vw] -right-[10vw] w-[70vw] h-[70vw] bg-primary/5 rounded-full"></div>
        <div className="absolute -bottom-[20vw] -left-[10vw] w-[50vw] h-[50vw] bg-primary/5 rounded-full"></div>
      </div>
      <div className="z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="mb-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
            Get in touch
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto">
            At Cactus, we're eager to understand how we can support your career
            growth, whether you're looking to join our team or seeking our
            services.
          </p>
        </div>
        <div className="bg-warm-white shadow-xl rounded-2xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-4 sm:p-6">
            {/* User type toggle */}
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-700 mb-2">I am a:</p>
              <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setUserType("job-seeker")}
                  className={`py-2 px-4 rounded-md transition-all text-sm font-medium flex-1 sm:flex-none ${userType === "job-seeker" ? "bg-white shadow-sm text-primary" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Job Seeker
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("hiring-manager")}
                  className={`py-2 px-4 rounded-md transition-all text-sm font-medium flex-1 sm:flex-none ${userType === "hiring-manager" ? "bg-white shadow-sm text-primary" : "text-gray-600 hover:text-gray-900"}`}
                >
                  Hiring Manager
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {userType === "hiring-manager"
                    ? "Company Name"
                    : "Current Company (Optional)"}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  required={userType === "hiring-manager"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {userType === "hiring-manager"
                  ? "Tell us about your hiring needs"
                  : "Tell us about your career goals"}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder={
                  userType === "hiring-manager"
                    ? "Please tell us about your company and hiring requirements..."
                    : "Please share your experience, skills, and what you're looking for in your next role..."
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* File upload for resumes - only for job seekers */}
            {userType === "job-seeker" && (
              <div className="mb-4">
                <label
                  htmlFor="resume"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Resume/CV (Optional)
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12 0h8m-8 0v-8m0 0v-20a4 4 0 014-4h12"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="resume"
                          type="file"
                          className="sr-only"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              setFileName(file.name);
                            }
                          }}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    {fileName && (
                      <p className="mt-2 text-sm text-primary truncate max-w-xs mx-auto">
                        Selected: {fileName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      PDF, DOC, DOCX up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                ) : (
                  <Send className="h-5 w-5" />
                )}
                Send Message
              </button>
            </div>
            {showSuccess && (
              <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                Message sent successfully!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

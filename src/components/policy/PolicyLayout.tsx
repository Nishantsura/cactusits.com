"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface PolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

export default function PolicyLayout({ title, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center"
          >
            {title}
          </motion.h1>
          {lastUpdated && (
            <p className="text-center mt-4 text-white/80">Last Updated: {lastUpdated}</p>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex space-x-4 md:space-x-8 whitespace-nowrap">
            <Link
              href="/terms-of-use"
              className="text-sm md:text-base px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/privacy-policy"
              className="text-sm md:text-base px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/website-disclaimer"
              className="text-sm md:text-base px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Website Disclaimer
            </Link>
            <Link
              href="/cookies-policy"
              className="text-sm md:text-base px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              Cookies Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8 lg:p-10 prose prose-sm md:prose-base lg:prose-lg max-w-none"
        >
          {children}
        </motion.div>

        {/* Help Section */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
          <p className="mb-4">If you have any questions about our policies, please contact us.</p>
          <Link
            href="/#contactus"
            className="inline-block bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Back to Top Button */}
      <div className="fixed bottom-6 right-6">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Back to top"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

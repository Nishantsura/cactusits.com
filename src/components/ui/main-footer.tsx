"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowUp, Linkedin, Twitter as X } from "lucide-react";
import Container from "./container";
// ThemeToggle removed as requested

// Navigation structure for Cactus AI
const navigation = {
  categories: [
    {
      id: "main",
      name: "Main",
      sections: [
        {
          id: "services",
          name: "Services",
          items: [
            { name: "IT Consulting", href: "/services/it-consulting" },
            {
              name: "Digital Transformation",
              href: "/services/digital-transformation",
            },
            { name: "Cloud Services", href: "/services/cloud-services" },
            { name: "Data & AI", href: "/services/data-ai" },
            { name: "Cybersecurity", href: "/services/cybersecurity" },
            { name: "IT Infrastructure", href: "/services/it-infrastructure" },
          ],
        },
        {
          id: "industries",
          name: "Industries",
          items: [
            {
              name: "Banking & Financial",
              href: "/industries/banking-financial",
            },
            { name: "Healthcare", href: "/industries/healthcare" },
            { name: "Public Sector", href: "/industries/public-sector" },
            {
              name: "Retail & eCommerce",
              href: "/industries/retail-ecommerce",
            },
            { name: "View all Industries", href: "/industries" },
          ],
        },
        {
          id: "company",
          name: "Company",
          items: [
            { name: "About Us", href: "/aboutus" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/contact" },
            { name: "Blog", href: "/blog" },
          ],
        },
        // Resources section removed
      ],
    },
  ],
};

// Styling for social media links
const socialIconStyle = `p-1 rounded-full transition-all text-black hover:text-white hover:bg-purple-600 hover:scale-105`;

export function MainFooter() {
  return (
    <footer className="border-primary/20 w-full border-t bg-background">
      {/* Top logo section removed as requested */}

      <Container className="py-8">
        <div className="border-b border-dotted"></div>
        <div className="py-6 md:py-8 lg:py-10 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 flex-row justify-between gap-4 sm:gap-6 leading-6">
            {/* Logo and company name in first column */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center mb-4">
                <Image
                  src="/logo.svg"
                  alt="Cactus AI Logo"
                  width={24}
                  height={24}
                  className="mr-2 h-6 w-6"
                />
                <span className="text-xl font-semibold">CACTUS</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  <span className="text-sm">sales@cactusits.com</span>
                </div>
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-sm">+44 118 466 1766</span>
                </div>
                <div className="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 mr-2 mt-0.5"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-sm">
                    200 Brook Drive, Green Park, Reading, Berkshire RG2 6UB
                  </span>
                </div>
              </div>
            </div>

            {/* Services column */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-medium text-base mb-3 md:mb-4">
                <Link
                  href="/services"
                  className="hover:text-purple-600 transition-colors"
                >
                  Services
                </Link>
              </h3>
              <ul
                role="list"
                aria-labelledby="main-services-heading-mobile"
                className="flex flex-col space-y-2"
              >
                {navigation.categories[0].sections[0].items.map((item) => (
                  <li key={item.name} className="flow-root">
                    <Link
                      href={item.href}
                      className="text-base !text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries column */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-medium text-base mb-3 md:mb-4">
                <Link
                  href="/industries"
                  className="hover:text-purple-600 transition-colors"
                >
                  Industries
                </Link>
              </h3>
              <ul
                role="list"
                aria-labelledby="main-industries-heading-mobile"
                className="flex flex-col space-y-2"
              >
                {navigation.categories[0].sections[1].items.map((item) => (
                  <li key={item.name} className="flow-root">
                    <Link
                      href={item.href}
                      className="text-base !text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company column */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-medium text-base mb-3 md:mb-4">Company</h3>
              <ul
                role="list"
                aria-labelledby="main-company-heading-mobile"
                className="flex flex-col space-y-2"
              >
                {navigation.categories[0].sections[2].items.map((item) => (
                  <li key={item.name} className="flow-root">
                    <Link
                      href={item.href}
                      className="text-base !text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="border-b border-dotted"></div>
      </Container>

      {/* Social media icons removed as requested */}

      <Container className="mt-4 mb-6 md:mt-6 md:mb-8 relative">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="absolute right-0 -top-4 bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-md transition-colors text-sm"
          aria-label="Go to top of page"
        >
          Go to top
        </button>
        <div className="flex flex-col justify-between text-center text-base">
          {/* Policy links moved above copyright text */}
          <div className="mb-6 flex justify-center gap-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className={socialIconStyle}
            >
              <Linkedin size={20} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              className={socialIconStyle}
            >
              <X size={20} />
            </a>
            <a
              href="mailto:contact@cactusits.com"
              aria-label="Email"
              className={socialIconStyle}
            >
              <Mail size={20} />
            </a>
          </div>
          <div
            className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-base text-black"
            data-component-name="MainFooter"
          >
            <Link
              href="/privacy-policy"
              className="text-black hover:text-purple-600 transition-colors font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-black hover:text-purple-600 transition-colors font-medium"
            >
              Terms of Use
            </Link>
            <Link
              href="/website-disclaimer"
              className="text-black hover:text-purple-600 transition-colors font-medium"
            >
              Website Disclaimer
            </Link>
            <Link
              href="/cookies-policy"
              className="text-black hover:text-purple-600 transition-colors font-medium"
            >
              Cookies Policy
            </Link>
            <Link
              href="/accessibility-statement"
              className="text-black hover:text-purple-600 transition-colors font-medium"
            >
              Accessibility Statement
            </Link>
            <Link
              href="/modern-slavery-act"
              className="text-black hover:text-purple-600 transition-colors font-medium"
            >
              Modern Slavery
            </Link>
          </div>

          <div className="flex flex-row items-center justify-center gap-1 text-black font-normal">
            <span>
              © {new Date().getFullYear()} Cactus AI. All rights reserved.
            </span>
            <span className="mx-2">|</span>
            <span>Made with</span>
            <span className="text-blue-500 mx-1">💙</span>
            <span>by</span>
            <Link
              href="https://nishantsura.com"
              target="_blank"
              rel="noreferrer"
              className="text-purple-600 hover:underline mx-1 dark:text-purple-400"
            >
              Nishant Sura
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default MainFooter;

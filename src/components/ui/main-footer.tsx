"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react";
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
        <div className="py-6 md:py-8 lg:py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 flex-row justify-between gap-4 sm:gap-6 leading-6">
            {/* Logo and company name in first column */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-center mb-4">
                <Image
                  src="/logo.svg"
                  alt="Cactus AI Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-semibold">Cactus</span>
              </div>
            </div>

            {/* Services column */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-medium text-base mb-3 md:mb-4">Services</h3>
              <ul
                role="list"
                aria-labelledby="main-services-heading-mobile"
                className="flex flex-col space-y-2"
              >
                {navigation.categories[0].sections[0].items.map((item) => (
                  <li key={item.name} className="flow-root">
                    <Link
                      href={item.href}
                      className="text-sm !text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries column */}
            <div className="mb-6 md:mb-8">
              <h3 className="font-medium text-base mb-3 md:mb-4">Industries</h3>
              <ul
                role="list"
                aria-labelledby="main-industries-heading-mobile"
                className="flex flex-col space-y-2"
              >
                {navigation.categories[0].sections[1].items.map((item) => (
                  <li key={item.name} className="flow-root">
                    <Link
                      href={item.href}
                      className="text-sm !text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
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
                      className="text-sm !text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
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

      <Container className="mt-4 mb-6 md:mt-6 md:mb-8">
        <div className="flex flex-col justify-between text-center text-xs">
          {/* Policy links moved above copyright text */}
          <div
            className="mb-4 flex justify-center gap-4 text-xs text-slate-500"
            data-component-name="MainFooter"
          >
            <Link
              href="/privacy-policy"
              className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
            >
              Terms of Use
            </Link>
            <Link
              href="/website-disclaimer"
              className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
            >
              Website Disclaimer
            </Link>
            <Link
              href="/cookies-policy"
              className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors"
            >
              Cookies Policy
            </Link>
          </div>

          <div className="flex flex-row items-center justify-center gap-1 text-black dark:text-gray-300">
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
              className="font-medium text-purple-600 hover:underline mx-1 dark:text-purple-400"
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

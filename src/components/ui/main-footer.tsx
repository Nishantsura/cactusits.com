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
            { name: "Digital Transformation", href: "/services/digital-transformation" },
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
            { name: "Banking & Financial", href: "/industries/banking-financial" },
            { name: "Healthcare", href: "/industries/healthcare" },
            { name: "Public Sector", href: "/industries/public-sector" },
            { name: "Retail & eCommerce", href: "/industries/retail-ecommerce" },
            { name: "View all Industries", href: "/industries" },
          ],
        },
        {
          id: "company",
          name: "Company",
          items: [
            { name: "About Us", href: "/aboutus" },
            { name: "Careers", href: "/careers" },
            { name: "Contact", href: "/#contactus" },
            { name: "Blog", href: "/blog" },
          ],
        },
        {
          id: "resources",
          name: "Resources",
          items: [
            { name: "Case Studies", href: "/case-studies" },
            { name: "Insights", href: "/insights" },
            { name: "Events", href: "/events" },
            { name: "FAQs", href: "/faqs" },
          ],
        },
      ],
    },
  ],
};

// Styling for social media links
const socialIconStyle = `p-1 rounded-full transition-all text-black hover:text-white hover:bg-purple-600 hover:scale-105`;

export function MainFooter() {
  return (
    <footer className="border-primary/20 w-full border-t bg-background">
      <Container className="relative pt-8 pb-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
        <Link href="/">
          <div className="flex items-center justify-center">
            <Image 
              src="/logo.svg" 
              alt="Cactus AI Logo" 
              width={40} 
              height={40} 
              className="mr-2"
            />
            <span className="text-xl font-semibold">Cactus</span>
          </div>
        </Link>
        <p className="bg-transparent text-center text-xs leading-4 text-primary/60 md:text-left max-w-3xl">
          At Cactus AI, we're committed to delivering exceptional IT services across diverse industries. 
          Our expertise and innovative approach enable us to meet the unique requirements of each business 
          we serve. Through quality solutions and dedicated support, we help organizations harness the 
          power of technology to drive growth and achieve their strategic objectives.
        </p>
        </div>
      </Container>

      <Container className="py-8">
        <div className="border-b border-dotted"></div>
        <div className="py-6 md:py-8 lg:py-10">
          {navigation.categories.map((category) => (
            <div
              key={category.name}
              className="grid grid-cols-2 md:grid-cols-4 flex-row justify-between gap-4 sm:gap-6 leading-6"
            >
              {category.sections.map((section) => (
                <div key={section.name} className="mb-6 md:mb-8">
                  <h3 className="font-medium text-base mb-3 md:mb-4">{section.name}</h3>
                  <ul
                    role="list"
                    aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                    className="flex flex-col space-y-2"
                  >
                    {section.items.map((item) => (
                      <li key={item.name} className="flow-root" data-component-name="MainFooter">
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
              ))}
            </div>
          ))}
        </div>
        <div className="border-b border-dotted"></div>
      </Container>

      <Container className="py-4">
        <div className="flex flex-wrap items-center justify-center gap-2" data-component-name="MainFooter">
          <Link
            aria-label="Email"
            href="mailto:contact@cactusai.com"
            rel="noreferrer"
            target="_blank"
            className={socialIconStyle}
          >
            <Mail strokeWidth={1} className="h-4 w-4" />
          </Link>
          <Link
            aria-label="X"
            href="https://twitter.com/cactusai"
            rel="noreferrer"
            target="_blank"
            className={socialIconStyle}
          >
            <X strokeWidth={1} className="h-4 w-4" />
          </Link>
          <Link
            aria-label="Instagram"
            href="https://www.instagram.com/cactusai/"
            rel="noreferrer"
            target="_blank"
            className={socialIconStyle}
          >
            <Instagram strokeWidth={1} className="h-4 w-4" />
          </Link>
          <Link
            aria-label="Facebook"
            href="https://www.facebook.com/cactusai"
            rel="noreferrer"
            target="_blank"
            className={socialIconStyle}
          >
            <Facebook strokeWidth={1} className="h-4 w-4" />
          </Link>
          <Link
            aria-label="LinkedIn"
            href="https://www.linkedin.com/company/cactusai"
            rel="noreferrer"
            target="_blank"
            className={socialIconStyle}
          >
            <Linkedin strokeWidth={1} className="h-4 w-4" />
          </Link>
          <Link
            aria-label="YouTube"
            href="https://www.youtube.com/cactusai"
            rel="noreferrer"
            target="_blank"
            className={socialIconStyle}
          >
            <Youtube strokeWidth={1} className="h-4 w-4" />
          </Link>
        </div>
      </Container>

      <Container className="mt-4 mb-6 md:mt-6 md:mb-8">
        <div className="flex flex-col justify-between text-center text-xs">
          <div className="flex flex-row items-center justify-center gap-1 text-black dark:text-gray-300">
            <span>© {new Date().getFullYear()} Cactus AI. All rights reserved.</span>
            <span className="mx-2">|</span>
            <span>Made with</span>
            <span className="text-blue-500 mx-1">💙</span>
            <span>by</span>
            <Link href="https://nishantsura.com" target="_blank" rel="noreferrer" className="font-medium text-purple-600 hover:underline mx-1 dark:text-purple-400">Nishant Sura</Link>
          </div>
          <div className="mt-2 flex justify-center gap-4 text-xs text-slate-500" data-component-name="MainFooter">
            <Link href="/privacy-policy" className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-use" className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors">Terms of Use</Link>
            <Link href="/website-disclaimer" className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors">Website Disclaimer</Link>
            <Link href="/cookies-policy" className="text-black hover:text-purple-600 dark:text-gray-300 hover:dark:text-purple-400 transition-colors">Cookies Policy</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default MainFooter;

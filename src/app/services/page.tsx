import NewsLetter from "@/components/landing/NewsLetter";
import { CircleCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getAllServices } from "./data-provider";

export const metadata = {
  title: "Comprehensive IT Services for Business Success | Cactus",
  description:
    "Explore our wide range of IT services, including consulting, digital transformation, cloud services, data and AI, cybersecurity, and more. Empower your business with Cactus.",
  keywords: [
    "IT services",
    "consulting",
    "digital transformation",
    "cloud services",
    "data analytics",
    "AI solutions",
    "cybersecurity",
    "Cactus",
  ],
  openGraph: {
    title: "Comprehensive IT Services for Business Success | Cactus",
    description:
      "Explore our wide range of IT services, from consulting to cybersecurity.",
    type: "website",
    url: "/services",
  },
};

export default async function Home() {
  // Fetch all services from the database
  const services = await getAllServices();
  
  // Group services for display with appropriate ordering
  const serviceSections = services.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));

  return (
    <div className="w-full">
      <main className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-[115px]">
        {/* Map through fetched services and render them */}
        {serviceSections.map((service, index) => {
          // Determine if this section should have its image on the left or right
          const imageOnLeft = index % 2 !== 0;
          
          return (
            <section
              key={service.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 items-center"
              id={service.slug}
            >
              {/* Image - conditionally rendered on left or right */}
              {imageOnLeft && (
                <div className="order-2 md:order-1 relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                  <Image
                    src={service.hero_image || `/services/img${(index % 7) + 1}.png`}
                    alt={service.image_alt || `${service.title} image`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              
              {/* Content */}
              <div className={imageOnLeft ? "order-1 md:order-2" : ""}>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
                  {service.hero_title || "EMPOWER YOUR BUSINESS"}
                </p>
                <h2 className={`${index === 0 ? "text-2xl sm:text-3xl md:text-4xl lg:text-5xl" : "text-xl sm:text-2xl md:text-3xl lg:text-4xl"} font-bold text-gray-900 mb-4 sm:mb-6`}>
                  {service.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                  {service.hero_description || service.description}
                </p>
                
                {/* Conditionally render bullet points if available */}
                {service.hero_bulletpoints && service.hero_bulletpoints.length > 0 && (
                  <>
                    <h3 className="text-xs sm:text-sm uppercase tracking-wider font-bold mb-4">
                      BENEFITS
                    </h3>
                    <ul className="space-y-2 my-4 sm:my-6 mb-6 sm:mb-8 text-sm sm:text-base">
                      {(typeof service.hero_bulletpoints === 'string' 
                        ? JSON.parse(service.hero_bulletpoints) 
                        : service.hero_bulletpoints
                      ).map((point: string, i: number) => (
                        <li key={i} className="flex gap-2 items-center">
                          <CircleCheck size={16} fill="var(--foreground)" className="text-white" />{" "}
                          {point}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link
                    href="/get-started"
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-foreground text-white font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                  <Link
                    href={`/services/${service.slug}`}
                    className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-muted font-medium hover:text-gray-900 transition-colors border-2 border-slate-100"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              
              {/* Image - if not on the left, show on the right */}
              {!imageOnLeft && (
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                  <Image
                    src={service.hero_image || `/services/img${(index % 7) + 1}.png`}
                    alt={service.image_alt || `${service.title} image`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              )}
            </section>
          );
        })}
        
        {/* If no services are available, show a fallback message */}
        {serviceSections.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">No services available</h2>
            <p className="text-gray-600 mb-8">Please check back later or contact us for more information.</p>
            <Link
              href="/contact"
              className="px-6 py-3 bg-foreground text-white font-medium rounded-md hover:bg-opacity-90 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        )}
      </main>
      <NewsLetter />
    </div>
  );
}

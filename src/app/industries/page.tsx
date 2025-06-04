import NewsLetter from "@/components/landing/NewsLetter";
import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { CircleCheck } from "lucide-react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { mapToLocalImage } from "@/lib/image-mapping";

// Define the industry type based on Supabase schema
type Industry = {
  id: string;
  name: string;
  description: string;
  image: string;
  image_alt?: string;
  slug: string;
  bullet_points?: string[];
  is_active: boolean;
  order_index: number;
};

// Fetch industries from Supabase
async function getIndustries() {
  const supabase = createServerSupabaseClient();
  
  const { data, error } = await supabase
    .from("industries")
    .select("*")
    .eq("is_active", true)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Error fetching industries:", error);
    return [];
  }

  return data || [];
}

// Function to generate default bullet points if none are provided
function generateDefaultBulletPoints(industryName: string) {
  return [
    `Specialized solutions for ${industryName} businesses`,
    `Secure and compliant systems for ${industryName.toLowerCase()} environments`,
    `Tailored IT support for all your ${industryName.toLowerCase()} needs`,
  ];
}

export default async function IndustriesPage() {
  // Get industries data from Supabase
  const industries = await getIndustries();
  return (
    <div className="w-full">
      <main className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 mt-[115px]">
        {/* Page introduction */}
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-5xl tracking-tighter mb-4 font-normal">
            Industries We Serve
          </h1>
        </div>

        {/* Map through industries and render them in the same layout as services page */}
        {industries.map((industry, index) => {
          // Determine if this section should have its image on the left or right
          const imageOnLeft = index % 2 !== 0;

          return (
            <section
              key={industry.id}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 items-center"
              id={industry.slug}
            >
              {/* Image - conditionally rendered on left or right */}
              {imageOnLeft && (
                <div className="order-2 md:order-1 relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                <Image
                  src={mapToLocalImage(industry.image, industry.slug)}
                  alt={industry.image_alt || industry.name}
                  fill
                  className="object-cover"
                />
              </div>
              )}

              {/* Content */}
              <div className={imageOnLeft ? "order-1 md:order-2" : ""}>
                <p className="text-xs sm:text-sm font-medium uppercase tracking-wider text-gray-600 mb-2">
                  TAILORED SOLUTIONS FOR {industry.name.toUpperCase()}
                </p>
                <h2 className="text-3xl lg:text-5xl tracking-tighter font-normal text-gray-900 mb-4 sm:mb-6">
                  {industry.name}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
                  {industry.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-2 my-4 sm:my-6 mb-6 sm:mb-8 text-sm sm:text-base">
                  {(industry.bullet_points || generateDefaultBulletPoints(industry.name)).map((point: string, i: number) => (
                    <li key={i} className="flex gap-2 items-center">
                      <CircleCheck
                        size={16}
                        fill="var(--foreground)"
                        className="text-white"
                      />{" "}
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <Link href={`/industries/${industry.slug}`} passHref>
                    <InteractiveHoverButton
                      text="Learn More"
                      className="h-12 px-8 text-base font-medium bg-transparent text-black w-auto min-w-[180px]"
                    />
                  </Link>
                </div>
              </div>

              {/* Image - if not on the left, show on the right */}
              {!imageOnLeft && (
                <div className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[400px]">
                  <Image
                    src={mapToLocalImage(industry.image, industry.slug)}
                    alt={industry.image_alt || industry.name}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              )}
            </section>
          );
        })}

        {/* If no industries are available, show a fallback message */}
        {industries.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">
              No industries available
            </h2>
            <p className="text-gray-600 mb-8">
              Please check back later or contact us for more information.
            </p>
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

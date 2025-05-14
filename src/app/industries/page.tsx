import NewsLetter from "@/components/landing/NewsLetter";
import Image from "next/image";
import Link from "next/link";

// Define the industry type
type Industry = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  url: string;
};

// Sample data for industries
const industries: Industry[] = [
  {
    id: "1",
    title: "Financial Services",
    description:
      "Delivering secure, scalable, and innovative solutions for banking, insurance, and fintech.",
    imageUrl: "/industries/Finiancial Services.jpg",
    imageAlt: "Banking and financial services",
    url: "banking-financial",
  },
  {
    id: "2",
    title: "Healthcare",
    description:
      "Implementing IT systems that enhance patient care, compliance, and operational efficiency.",
    imageUrl: "/industries/Healthcare.jpg",
    imageAlt: "Healthcare services",
    url: "healthcare",
  },
  {
    id: "3",
    title: "Information Technology",
    description:
      "Top-tier talent and innovative tech solutions to power digital transformation and IT innovation.",
    imageUrl: "/industries/vecteezy_portrait-of-a-serious-and-focused-female-programmer-working_54880456.jpeg",
    imageAlt: "Serious and focused female programmer working with code",
    url: "public-sector",
  },
  {
    id: "4",
    title: "Public Sector & Defence",
    description:
      "Transforming operations with agile technologies and digital platforms for government and defense.",
    imageUrl: "/industries/vecteezy_handsome-prosperous-businessman-reads-useful-information-in_8168158.jpg",
    imageAlt: "Defence and security services",
    url: "public-sector-defence",
  },
];

export default function IndustriesPage() {
  return (
    <>
      <div className="w-[90vw] max-w-7xl mx-auto px-4 py-16 mt-[115px]">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Industries We Serve
          </h1>
          <p className="max-w-2xl mx-auto text-gray-700 text-sm md:text-base">
            At Cactus, we are committed to delivering exceptional IT services
            across a diverse range of industries. Our expertise and innovative
            approach enable us to meet the unique requirements of each sector we
            serve.
          </p>
        </div>

        <div className="space-y-12">
          {industries.map((industry) => (
            <div
              key={industry.id}
              id={industry.url}
              className="relative overflow-hidden bg-warm-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
              style={{ borderRadius: '0px' }}
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-full md:w-2/5 relative">
                  <div className="aspect-w-4 aspect-h-3 relative h-60 md:h-80 overflow-hidden">
                    <Image
                      src={industry.imageUrl || "/placeholder.svg"}
                      alt={industry.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2">
                    {industry.title}
                  </h2>
                  <p className="text-gray-600 text-sm md:text-base mb-4">
                    {industry.description}
                  </p>
                  <div className="flex space-x-3">
                    <Link
                      href={`/industries/${industry.url}`}
                      className="px-4 py-2 bg-primary text-white rounded-none text-sm font-medium hover:bg-opacity-90 transition-all flex items-center"
                    >
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="ml-1">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </Link>
                    <button className="px-4 py-2 bg-warm-white text-[#2d2d40] border border-gray-200 rounded-none text-sm font-medium hover:bg-gray-50 transition-all">
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <NewsLetter />
    </>
  );
}

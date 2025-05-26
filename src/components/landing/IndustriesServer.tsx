import Image from "next/image";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { getIndustriesForLanding } from "./utils/data-fetching";

interface IndustryCardProps {
  title: string;
  description: string;
  image: string;
  slug: string;
}

const IndustryCard: React.FC<IndustryCardProps> = ({
  title,
  description,
  image,
  slug,
}) => {
  return (
    <div className="relative overflow-hidden min-w-[300px] sm:min-w-[350px] h-[250px] bg-warm-white rounded-lg p-6 flex flex-col justify-between border border-gray-100 shadow-sm">
      <div className="absolute top-0 right-0 ">
        <Image
          src={image || "/careers/industry-1.svg"}
          alt={title}
          width={1000}
          height={1000}
          className="w-44 h-auto"
        />
      </div>
      <div className="mt-16">
        <h3 className="font-semibold text-[#2d2d40]">{title}</h3>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default async function IndustriesServerSection() {
  // Fetch industries from Supabase
  const industries = await getIndustriesForLanding();

  return (
    <div className="w-full max-w-[85vw] mx-auto px-4 py-6">
      {/* Header */}
      <div className="mb-3 border-t-2 pt-2">
        <div className="flex items-center mb-2">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="ml-2 text-sm font-medium">Our Industries</span>
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#2d2d40] leading-tight mb-4">
          We cater to a diverse range of industries,
          <br /> providing specialised{" "}
          <span className="text-primary">IT solutions</span>
        </h1>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row gap-4 mt-4 justify-between overflow-hidden">
        {/* Left column with heading and image */}
        <div className="w-fit lg:w-3/12 relative inline-block">
          <Image
            src="/landing/industry-1.svg"
            alt="left industry"
            width={1000}
            height={1000}
            className="h-auto max-w-44 sm:max-w-64 w-full lg:w-auto"
          />
          <Link href="/industries">
            <button className="flex w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-foreground items-center justify-center text-white border-8 absolute bottom-0 -right-10 lg:left-44 text-xs sm:text-sm">
              VIEW ALL <MoveUpRight className="h-4 w-auto" />
            </button>
          </Link>
        </div>

        {/* Right column with description and industries */}
        <div className="w-full lg:w-9/12 relative">
          <p className="text-gray-muted my-4 sm:my-6 text-sm sm:text-base">
            At Cactus IT Solutions, we deliver specialised IT services across a
            wide range of industries. From powering innovation in tech driven
            enterprises to enhancing compliance and efficiency in healthcare,
            finance, and the public sector, our tailored solutions are designed
            to meet the unique challenges of each domain. Whether it&apos;s
            cloud transformation, cybersecurity, or AI adoption, we help
            organisations stay agile, secure, and future ready.
          </p>

          {/* Grid of industry cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {industries.map((industry, index) => (
              <Link key={index} href={`/industries/${industry.slug}`}>
                <IndustryCard
                  title={industry.name}
                  description={industry.description || ""}
                  image={industry.image || "/careers/industry-1.svg"}
                  slug={industry.slug}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

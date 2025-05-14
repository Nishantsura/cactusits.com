import type { ServiceCardProps } from "@/types/job";

interface OurApproachProps {
  Approach: ServiceCardProps[];
}

// This component can be rendered on the server
export default function OurApproach({ Approach }: OurApproachProps) {
  return (
    <section className="py-16 px-4 max-w-[85vw] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Approach</h2>
        <p className="max-w-2xl mx-auto text-gray-600">
          Our consulting services provide strategic advice to help financial
          institutions stay ahead in a competitive market.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Approach.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 transition-shadow hover:shadow-md">
      <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

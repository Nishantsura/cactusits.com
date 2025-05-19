import type { ServiceCardProps } from "@/types/job";
import { CheckCircle } from "lucide-react";

interface OurApproachProps {
  Approach: ServiceCardProps[];
}

// This component can be rendered on the server
export default function OurApproach({ Approach }: OurApproachProps) {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-[85vw] mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-gray-800">
          Our Approach
        </h2>
        <p className="text-lg text-gray-600 mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed">
          Our industry expertise and tailored solutions help businesses achieve
          their goals and stay ahead of the competition.
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
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-[1.03]">
      <div className="p-3 bg-blue-100 rounded-full mb-5 text-blue-600 inline-block">
        <CheckCircle size={28} className="text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2.5 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
}

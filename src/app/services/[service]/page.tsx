import { PagePropsSer, data, getServiceData } from "./data";
import EnhancedHero from "@/components/Services/EnhancedHero";
import EnhancedPotential from "@/components/Services/EnhancedPotential";
import Explore from "@/components/Services/Explore";
import { ServicePageSection, FadeInSection } from "@/components/Services/ServicePageLayout";
import ServiceContactForm from "@/components/Services/ServiceContactForm";


interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const lookup = {
    "it-consulting": 0,
    "digital-transformation": 1,
    "cloud-services": 2,
    "data-ai": 3,
    cybersecurity: 4,
    "it-infrastructure": 5,
    "agile-delivery": 6,
  };

  const { service } = await params;
  const index = lookup[service as keyof typeof lookup];
  const serviceData = await getServiceData(index);

  if (!serviceData) {
    return {
      title: "Service Not Found | Cactus",
      description: "The requested service could not be found.",
    };
  }

  return {
    title: `${serviceData.title} | IT Services | Cactus`,
    description:
      serviceData.description ||
      `Learn about our ${serviceData.title} IT service and how it can benefit your business.`,
    keywords: [...serviceData.keywords, "IT services", "Cactus"],
    openGraph: {
      title: `${serviceData.title} | IT Services | Cactus`,
      description: serviceData.description,
      type: "website",
      url: `/services/${service}`,
    },
  };
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-warm-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="mb-4 text-gray-700">{icon}</div>
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export default async function Page({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const lookup = {
    "it-consulting": 0,
    "digital-transformation": 1,
    "cloud-services": 2,
    "data-ai": 3,
    cybersecurity: 4,
    "it-infrastructure": 5,
    "agile-delivery": 6,
  };

  const { service } = await params;
  const index = lookup[service as keyof typeof lookup];
  const pageData: PagePropsSer = data[index];

  if (!pageData) {
    return <div>Service not found</div>;
  }

  const { Hero, Potential, Explore: ExploreData } = pageData;

  return (
    <div className="w-full">
      {/* Enhanced Hero Section */}
      <EnhancedHero
        service={Hero.service}
        title={Hero.title}
        description={Hero.description}
        bulletpoints={Hero.bulletpoints}
        image={Hero.image}
      />

      {/* Enhanced Potential Section */}
      <EnhancedPotential
        description={Potential.description}
        serviceCards={Potential.serviceCards}
      />

      {/* Explore Section */}
      <ServicePageSection 
        id="features" 
        title="Key Features & Capabilities" 
        subtitle="Explore the comprehensive suite of services we offer"
        background="gradient"
      >
        <FadeInSection>
          <Explore
            serviceDetails={ExploreData.serviceDetails}
            serviceFeatures={ExploreData.serviceFeatures}
          />
        </FadeInSection>
      </ServicePageSection>



      {/* Contact Form Section */}
      <ServicePageSection 
        id="contact" 
        title="Ready to Transform Your Business?" 
        subtitle={`Get in touch to learn how our ${Hero.service.toLowerCase()} services can help you achieve your business goals.`}
        background="white"
      >
        <FadeInSection>
          <div className="max-w-3xl mx-auto">
            <ServiceContactForm 
              serviceTitle={Hero.service.toLowerCase()}
            />
          </div>
        </FadeInSection>
      </ServicePageSection>
    </div>
  );
}

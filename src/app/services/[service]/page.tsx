import { PagePropsSer } from "./data";
import { getServiceBySlug, getAllServiceSlugs } from "./data-provider";
import EnhancedHero from "@/components/Services/EnhancedHero";
import EnhancedPotential from "@/components/Services/EnhancedPotential";
import Explore from "@/components/Services/Explore";
import {
  ServicePageSection,
  FadeInSection,
} from "@/components/Services/ServicePageLayout";
import ServiceContactForm from "@/components/Services/ServiceContactForm";

export async function generateMetadata({
  params,
}: {
  params: { service: string };
}) {
  const { service } = params;
  const pageData = await getServiceBySlug(service);
  
  if (!pageData) {
    return {
      title: "Service Not Found | Cactus",
      description: "The requested service could not be found.",
    };
  }
  
  // Extract metadata from the service data
  const { Hero } = pageData;
  
  return {
    title: `${Hero.service} | IT Services | Cactus`,
    description: Hero.description || `Learn about our ${Hero.service} IT service and how it can benefit your business.`,
    keywords: ["IT services", "Cactus"],
    openGraph: {
      title: `${Hero.service} | IT Services | Cactus`,
      description: Hero.description,
      type: "website",
      url: `/services/${service}`,
    },
  };
}

export async function generateStaticParams() {
  const services = await getAllServiceSlugs();
  return services;
}

export default async function Page({
  params,
}: {
  params: { service: string };
}) {
  const { service } = params;
  const pageData = await getServiceBySlug(service);

  if (!pageData) {
    return <div>Service not found</div>;
  }

  const { Hero, Potential } = pageData;

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

      {/* Explore Section - Key Features & Capabilities */}
      <ServicePageSection
        id="features"
        title="Key Features & Capabilities"
        subtitle="Discover the comprehensive suite of features and capabilities that our service offers."
        background="light"
      >
        <FadeInSection>
          <Explore
            serviceFeatures={pageData.Explore.serviceFeatures || []}
            serviceDetails={pageData.Explore.serviceDetails || {}}
          />
        </FadeInSection>
      </ServicePageSection>

      {/* Contact Form Section */}
      <ServicePageSection
        id="contact"
        title="Ready to Transform Your Business?"
        subtitle={`Get in touch to learn how our ${Hero.service ? Hero.service.toLowerCase() : 'selected'} services can help you achieve your business goals.`}
        background="white"
      >
        <FadeInSection>
          <div className="max-w-3xl mx-auto">
            <ServiceContactForm serviceTitle={Hero.service ? Hero.service.toLowerCase() : 'selected service'} />
          </div>
        </FadeInSection>
      </ServicePageSection>
    </div>
  );
}

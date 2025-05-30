import { PagePropsSer } from "./data";
import { getServiceBySlug, getAllServiceSlugs } from "./data-provider";
import EnhancedHero from "@/components/Services/EnhancedHero";
import EnhancedPotential from "@/components/Services/EnhancedPotential";
import SubscriptionForm from "@/components/landing/NewsLetter";

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
    description:
      Hero.description ||
      `Learn about our ${Hero.service} IT service and how it can benefit your business.`,
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

      {/* Subscription Form */}
      <SubscriptionForm />
    </div>
  );
}

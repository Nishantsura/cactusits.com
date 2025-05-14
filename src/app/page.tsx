import { LandingContent } from "@/components/landing/LandingContent";

export const metadata = {
  title: "Empowering Businesses Through Innovation and Technology | Cactus",
  description:
    "Discover how Cactus transforms businesses with cutting-edge IT services and expert consulting. Explore our innovative solutions and drive your business success.",
  keywords: [
    "IT solutions",
    "business transformation",
    "innovative technology",
    "expert consulting",
    "Cactus",
  ],
  openGraph: {
    title: "Empowering Businesses Through Innovation and Technology | Cactus",
    description:
      "Discover how Cactus transforms businesses with cutting-edge IT services and expert consulting.",
    type: "website",
    url: "/",
  },
};

export default function Landing() {
  return <LandingContent />;
}

import Image from "next/image";
import { data } from "./data";
import OurApproach from "@/components/industry/our-approach";
import Link from "next/link";
import ChooseUs from "@/components/ChooseUs";
import ContactForm from "@/components/landing/ContactUs";
import { Section } from "@/components/ui/section";


export default async function Page({
  params,
}: {
  params: Promise<{ industry: string }>;
}) {
  const { industry } = await params;
  const info = data.find((item) => item[industry]);
  if (!info) {
    return <div>Industry not found</div>;
  }
  const { Hero, Approach } = info[industry];
  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Section */}
      <Section id="hero" spacing="minimal" verticalAlign="center" className="flex flex-col lg:flex-row max-w-[90vw] w-full p-4 lg:p-8 gap-8 pt-[115px]">
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm uppercase tracking-wide text-gray-500 mb-4">
            {Hero.industry}
          </p>

          <h1 className="text-3xl lg:text-5xl font-bold leading-tight text-gray-900 mb-6">
            {Hero.title.split(" ").map((word, i) =>
              i === 2 ? (
                <span key={i} className="text-primary">
                  {word}{" "}
                </span>
              ) : (
                word + " "
              ),
            )}
          </h1>

          <p className="text-base lg:text-lg leading-relaxed text-gray-600 mb-8">
            {Hero.description}
          </p>

          <div className="flex gap-4 justify-start mt-4">
            <Link href="/#contactus">
              <button className="w-44 bg-foreground text-background px-2 py-3">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>

        <div className="flex-1 relative min-h-[300px] lg:min-h-[400px] h-[50%] rounded-lg overflow-hidden self-center">
          <Image
            src={Hero.image}
            alt="Hero Image"
            height={1000}
            width={1000}
            className="w-full h-auto"
            priority
          />
        </div>
      </Section>

      <Section id="approach" spacing="none" verticalAlign="center">
        <OurApproach Approach={Approach} />
      </Section>
      
      {/* Why you'd love to choose us section */}
      <Section id="why-choose-us" spacing="none" verticalAlign="center">
        <ChooseUs />
      </Section>
      
      {/* Contact us section */}
      <Section id="contact" spacing="minimal" verticalAlign="center">
        <ContactForm />
      </Section>
    </div>
  );
}

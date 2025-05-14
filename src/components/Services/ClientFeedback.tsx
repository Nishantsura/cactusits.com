"use client";
import React from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/section";

export type FeedbackItem = {
  quote: string;
  industry?: string;
  companySize?: string;
  result?: string;
};

// Service-specific feedback collections
const serviceFeedback: Record<string, FeedbackItem[]> = {
  // IT Consulting feedback
  "it consulting": [
    {
      quote: "The strategic IT roadmap Cactus developed for us aligned perfectly with our business goals. It's been our north star for digital initiatives.",
      industry: "Financial Services",
      companySize: "Enterprise",
      result: "Streamlined IT governance and strategic alignment"
    },
    {
      quote: "Their IT consulting team quickly identified inefficiencies in our systems and proposed practical solutions that were easy to implement.",
      industry: "Manufacturing",
      companySize: "Mid-market",
      result: "30% reduction in operational bottlenecks"
    },
    {
      quote: "The ROI analysis Cactus provided helped us prioritize our technology investments with confidence. Their expertise has been invaluable.",
      industry: "Healthcare",
      companySize: "Large Enterprise",
      result: "Strategic technology investment planning"
    }
  ],
  
  // Digital Transformation feedback
  "digital transformation": [
    {
      quote: "Cactus transformed our legacy systems into a modern digital ecosystem. The transition was smooth and the results have exceeded our expectations.",
      industry: "Retail",
      companySize: "Mid-market",
      result: "65% increase in customer engagement"
    },
    {
      quote: "Our digital transformation journey with Cactus has revolutionized how we interact with customers. The new platform has made us truly competitive in the digital space.",
      industry: "Financial Services",
      companySize: "Enterprise",
      result: "42% improvement in customer satisfaction scores"
    },
    {
      quote: "The digital workflows Cactus implemented have eliminated manual processes and significantly reduced human error in our operations.",
      industry: "Manufacturing",
      companySize: "Small Business",
      result: "75% reduction in processing time"
    }
  ],
  
  // Cloud Services feedback
  "cloud services": [
    {
      quote: "The cloud migration strategy Cactus designed minimized disruption while maximizing the benefits of our new cloud infrastructure.",
      industry: "Technology",
      companySize: "Enterprise",
      result: "40% reduction in IT infrastructure costs"
    },
    {
      quote: "Cactus helped us leverage cloud technologies to scale our operations dynamically based on demand. Game-changing for our seasonal business.",
      industry: "Retail",
      companySize: "Mid-market",
      result: "Improved scalability and 35% cost optimization"
    },
    {
      quote: "Their cloud expertise ensured our sensitive data remained secure throughout our transition to a hybrid cloud model.",
      industry: "Healthcare",
      companySize: "Large Enterprise",
      result: "Enhanced data security and compliance"
    }
  ],
  
  // Data & AI feedback
  "data & ai": [
    {
      quote: "The AI-powered analytics solution from Cactus has transformed how we understand our customer behavior and make strategic decisions.",
      industry: "E-commerce",
      companySize: "Mid-market",
      result: "28% increase in conversion rates"
    },
    {
      quote: "Cactus built a custom data pipeline that consolidated our disparate data sources into actionable insights available to everyone in the organization.",
      industry: "Financial Services",
      companySize: "Enterprise",
      result: "Data-driven decision making across departments"
    },
    {
      quote: "The predictive maintenance AI model Cactus developed has dramatically reduced our equipment downtime and maintenance costs.",
      industry: "Manufacturing",
      companySize: "Large Enterprise",
      result: "62% reduction in unexpected downtime"
    }
  ],
  
  // Cybersecurity feedback
  "cybersecurity": [
    {
      quote: "Cactus conducted a thorough security assessment that uncovered vulnerabilities we weren't aware of and provided a clear remediation roadmap.",
      industry: "Financial Services",
      companySize: "Enterprise",
      result: "Zero security breaches since implementation"
    },
    {
      quote: "Their cybersecurity team responded quickly to a potential breach, containing the threat and strengthening our security posture.",
      industry: "Healthcare",
      companySize: "Mid-market",
      result: "Rapid incident response and improved security"
    },
    {
      quote: "The security awareness training Cactus provided has significantly reduced successful phishing attempts against our employees.",
      industry: "Education",
      companySize: "Large Enterprise",
      result: "90% reduction in successful phishing attacks"
    }
  ],
  
  // IT Infrastructure feedback
  "it infrastructure": [
    {
      quote: "Cactus redesigned our network infrastructure to support our hybrid work model, resulting in improved performance and reliability.",
      industry: "Technology",
      companySize: "Mid-market",
      result: "99.99% network uptime and improved remote work capability"
    },
    {
      quote: "The infrastructure monitoring solution implemented by Cactus has given us unprecedented visibility into our systems and allowed us to address issues proactively.",
      industry: "Financial Services",
      companySize: "Enterprise",
      result: "85% reduction in system outages"
    },
    {
      quote: "Cactus helped us modernize our aging infrastructure with minimal disruption to our day-to-day operations.",
      industry: "Manufacturing",
      companySize: "Large Enterprise",
      result: "Modernized infrastructure with zero downtime"
    }
  ],
  
  // Agile Delivery feedback
  "agile delivery": [
    {
      quote: "Cactus introduced agile methodologies that transformed how we develop and deliver software. Our time-to-market has decreased dramatically.",
      industry: "Software",
      companySize: "Mid-market",
      result: "40% faster product delivery cycles"
    },
    {
      quote: "The agile coaching provided by Cactus helped our teams embrace an iterative approach to development that has improved quality and customer satisfaction.",
      industry: "Technology",
      companySize: "Enterprise",
      result: "Higher quality products and improved team morale"
    },
    {
      quote: "Cactus's agile project management expertise helped us respond quickly to changing market conditions and customer needs during a critical product launch.",
      industry: "Retail",
      companySize: "Large Enterprise",
      result: "Successful product launch despite changing requirements"
    }
  ],
  
  // Default feedback for any other services
  "default": [
    {
      quote: "Cactus transformed our operations with cutting-edge technology solutions, resulting in a significant increase in efficiency.",
      industry: "Manufacturing",
      companySize: "Enterprise",
      result: "40% increase in operational efficiency"
    },
    {
      quote: "Working with Cactus helped us modernize our infrastructure while cutting IT costs. Their expertise was invaluable.",
      industry: "Healthcare",
      companySize: "Mid-market",
      result: "25% reduction in IT costs"
    },
    {
      quote: "The team at Cactus helped us identify and address security vulnerabilities before they became problems. We've seen zero breaches since implementation.",
      industry: "Financial Services",
      companySize: "Large Enterprise",
      result: "Enhanced security posture"
    },
    {
      quote: "Our digital transformation journey with Cactus exceeded expectations. Customer engagement is up significantly since launching our new platform.",
      industry: "Retail",
      companySize: "Small Business",
      result: "65% increase in customer engagement"
    }
  ]
};

// Helper function to get feedback for a specific service
const getFeedbackForService = (serviceType: string): FeedbackItem[] => {
  const normalizedServiceType = serviceType.toLowerCase().trim();
  
  // Check if we have specific feedback for this service
  for (const [key, feedback] of Object.entries(serviceFeedback)) {
    if (normalizedServiceType.includes(key)) {
      return feedback;
    }
  }
  
  // Return default feedback if no match found
  return serviceFeedback.default;
};

export default function ClientFeedback({
  feedback,
  title = "What Our Clients Say",
  subtitle = "Real results from businesses that trusted our expertise",
  serviceType = "IT services"
}: {
  feedback?: FeedbackItem[];
  title?: string;
  subtitle?: string;
  serviceType?: string;
}) {
  // Use provided feedback or get service-specific feedback
  const clientFeedback = feedback || getFeedbackForService(serviceType);
  return (
    <Section id="clientFeedback" spacing="normal" verticalAlign="center" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-base">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {clientFeedback.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col h-full"
            >
              {/* Quote content */}
              <div className="mb-4 text-gray-800 text-lg font-light italic relative">
                <div className="text-primary text-4xl absolute -top-2 -left-2 opacity-20">"</div>
                <p className="relative z-10 pl-4">{item.quote}</p>
                <div className="text-primary text-4xl absolute -bottom-5 right-0 opacity-20">"</div>
              </div>
              
              {/* Client info */}
              <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  {item.industry && (
                    <div>
                      <p className="text-xs text-gray-500">Industry</p>
                      <p className="text-sm font-medium text-gray-800">{item.industry}</p>
                    </div>
                  )}
                  
                  {item.companySize && (
                    <div>
                      <p className="text-xs text-gray-500">Company Size</p>
                      <p className="text-sm font-medium text-gray-800">{item.companySize}</p>
                    </div>
                  )}
                </div>
                
                {item.result && (
                  <div className="mt-4">
                    <p className="text-xs text-gray-500">Result</p>
                    <p className="text-sm font-semibold text-primary">{item.result}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-4">Ready to achieve similar results for your business?</p>
          <a 
            href="#contact"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-500 md:py-3 md:text-lg md:px-8 shadow-md transition-all"
          >
            Get Started with {serviceType}
          </a>
        </div>
      </div>
    </Section>
  );
}

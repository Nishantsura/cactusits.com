// Local industries data using images from public/landing folder
export const industriesData = [
  {
    id: "1",
    name: "Information Technology",
    description: "Specialized IT solutions designed for modern enterprises, helping businesses streamline operations and improve digital capabilities.",
    image: "/landing/pexels-tima-miroshnichenko-5685931.jpg",
    image_alt: "IT professionals working in a modern office",
    slug: "information-technology",
    bullet_points: [
      "Enterprise software development",
      "Cloud migration and management",
      "Digital transformation services",
      "Custom IT infrastructure solutions"
    ],
    is_active: true,
    order_index: 1,
    hero_industry: "INFORMATION TECHNOLOGY",
    hero_title: "Modern IT Solutions",
    hero_description: "Delivering innovative IT solutions that drive business growth and operational excellence.",
    hero_image: "/landing/pexels-tima-miroshnichenko-5685931.jpg",
    approach_items: [
      {
        title: "Analysis & Assessment",
        description: "Thorough evaluation of your existing IT infrastructure to identify strengths and areas for improvement."
      },
      {
        title: "Strategic Planning",
        description: "Crafting a customized IT roadmap aligned with your business objectives and growth targets."
      },
      {
        title: "Implementation",
        description: "Seamless deployment of solutions with minimal disruption to your ongoing operations."
      },
      {
        title: "Continuous Support",
        description: "Proactive monitoring and maintenance to ensure optimal system performance."
      }
    ]
  },
  {
    id: "2",
    name: "Banking & Financial",
    description: "Secure and compliant solutions for the financial sector, enabling institutions to deliver better customer experiences while maintaining regulatory compliance.",
    image: "/landing/pexels-artempodrez-5715847.jpg",
    image_alt: "Financial professionals reviewing data",
    slug: "banking-financial",
    bullet_points: [
      "Regulatory compliance solutions",
      "Digital banking platforms",
      "Financial data security",
      "Payment processing systems"
    ],
    is_active: true,
    order_index: 2,
    hero_industry: "BANKING & FINANCIAL",
    hero_title: "Secure Financial Solutions",
    hero_description: "Empowering financial institutions with secure, compliant technology solutions to drive growth and customer satisfaction.",
    hero_image: "/landing/pexels-artempodrez-5715847.jpg",
    approach_items: [
      {
        title: "Risk Assessment",
        description: "Comprehensive evaluation of security vulnerabilities and compliance requirements."
      },
      {
        title: "Secure Architecture",
        description: "Designing robust systems with multi-layered security protocols and controls."
      },
      {
        title: "Compliance Integration",
        description: "Building solutions that adhere to relevant financial regulations and standards."
      },
      {
        title: "Performance Optimization",
        description: "Ensuring high availability and speed for critical financial operations."
      }
    ]
  },
  {
    id: "3",
    name: "Healthcare",
    description: "Innovative healthcare IT solutions that improve patient care, streamline operations, and ensure compliance with healthcare regulations.",
    image: "/landing/pexels-tiger-lily-7109063.jpg",
    image_alt: "Modern healthcare facility with technology",
    slug: "healthcare",
    bullet_points: [
      "Electronic health record systems",
      "Telemedicine platforms",
      "Healthcare data analytics",
      "HIPAA-compliant infrastructure"
    ],
    is_active: true,
    order_index: 3,
    hero_industry: "HEALTHCARE",
    hero_title: "Advanced Healthcare Technology",
    hero_description: "Transforming patient care through innovative and secure healthcare technology solutions.",
    hero_image: "/landing/pexels-tiger-lily-7109063.jpg",
    approach_items: [
      {
        title: "Patient-Centered Design",
        description: "Creating solutions that prioritize patient experience and care quality."
      },
      {
        title: "Clinical Workflow Integration",
        description: "Seamlessly incorporating technology into existing healthcare processes."
      },
      {
        title: "Compliance Assurance",
        description: "Building systems that meet strict healthcare regulatory requirements."
      },
      {
        title: "Data Security & Privacy",
        description: "Implementing robust protections for sensitive patient information."
      }
    ]
  },
  {
    id: "4",
    name: "Public Sector & Defence",
    description: "Specialized solutions for government and defense needs, focusing on security, efficiency, and reliable service delivery.",
    image: "/landing/pexels-yankrukov-7792745.jpg",
    image_alt: "Public sector technology implementation",
    slug: "public-sector--defence",
    bullet_points: [
      "Secure government infrastructure",
      "Defense information systems",
      "Citizen service platforms",
      "Mission-critical applications"
    ],
    is_active: true,
    order_index: 4,
    hero_industry: "PUBLIC SECTOR & DEFENCE",
    hero_title: "Mission-Critical Solutions",
    hero_description: "Delivering secure, reliable technology solutions that support critical government operations and public services.",
    hero_image: "/landing/pexels-yankrukov-7792745.jpg",
    approach_items: [
      {
        title: "Security-First Architecture",
        description: "Developing systems with the highest levels of security built into every layer."
      },
      {
        title: "Scalable Infrastructure",
        description: "Creating solutions capable of handling variable demands and future growth."
      },
      {
        title: "Interoperability",
        description: "Ensuring seamless integration with existing government systems and databases."
      },
      {
        title: "Continuous Monitoring",
        description: "Implementing robust surveillance to detect and respond to potential threats."
      }
    ]
  }
];

// Helper function to get all industries
export function getLocalIndustries() {
  return industriesData.filter(industry => industry.is_active).sort((a, b) => a.order_index - b.order_index);
}

// Helper function to get an industry by slug
export function getLocalIndustryBySlug(slug: string) {
  const industry = industriesData.find(industry => industry.slug === slug);
  
  if (!industry) return null;
  
  return {
    Hero: {
      industry: industry.hero_industry,
      title: industry.hero_title,
      description: industry.hero_description,
      image: industry.hero_image
    },
    Approach: industry.approach_items || []
  };
}

// Helper function to get all industry slugs
export function getAllLocalIndustrySlugs() {
  return industriesData
    .filter(industry => industry.is_active)
    .map(industry => ({ industry: industry.slug }));
}

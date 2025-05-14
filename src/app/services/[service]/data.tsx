import React from "react";
import {
  Building2,
  Users2,
  ShieldCheck,
  BarChart2,
  ClipboardList,
  MonitorSmartphone,
  Lightbulb,
  Cloud,
  Database,
  LockKeyhole,
  Network,
  Server,
  Compass,
  HardDrive,
  Layout,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react";

export interface PagePropsSer {
  Hero: {
    service: string;
    title: string;
    description: string;
    bulletpoints: string[];
    image: string;
  };
  Potential: {
    description: string;
    serviceCards: {
      icon: React.ReactNode;
      title: string;
      description: string;
    }[];
  };
  Explore: {
    serviceFeatures: {
      id: string;
      title: string;
      icon: React.ReactNode;
    }[];
    serviceDetails: {
      [key: string]: {
        id: string;
        title: string;
        description: string;
        features: {
          id: string;
          title: string;
        }[];
      };
    };
  };
}

export interface ServiceData {
  title: string;
  description: string;
  keywords: string[];
  service: string;
}

export const getServiceData = async (index: number) => {
  const service = data[index];
  if (!service) return null;

  // Extract keywords from bulletpoints and service cards
  const bulletKeywords = service.Hero.bulletpoints.flatMap((point) =>
    point
      .split(/[:,.]/)
      .map((keyword) => keyword.trim().toLowerCase())
      .filter(Boolean),
  );

  const cardKeywords = service.Potential.serviceCards.map((card) =>
    card.title.toLowerCase(),
  );

  // Create the service data object
  const serviceData: ServiceData = {
    title: service.Hero.service,
    description: service.Hero.description,
    keywords: [...new Set([...bulletKeywords, ...cardKeywords])],
    service: service.Hero.service,
  };

  return serviceData;
};

export const data: PagePropsSer[] = [
  // IT CONSULTING, STRATEGY & SERVICES
  {
    Hero: {
      service: "IT CONSULTING, STRATEGY & SERVICES",
      title: "Redefine Your Business Strategy",
      description:
        "Empower your business with actionable insights and innovative strategies.",
      bulletpoints: [
        "Business strategy, customer experience, and digital transformation.",
        "Professional services: Strategy, consulting, and technical IT support.",
        "Business innovation and technology advisory.",
      ],
      image: "/services/it-cons.jpg",
    },
    Potential: {
      description:
        "At Cactus, we help organisations unlock their full potential through tailored consulting services. Our expertise in business strategy, digital transformation, and technology advisory ensures you stay ahead in an evolving digital landscape.",
      serviceCards: [
        {
          icon: <Building2 size={20} className="text-gray-900" />,
          title: "Business Strategy",
          description:
            "Align your business goals with technology for sustainable growth.",
        },
        {
          icon: <Users2 size={20} className="text-gray-900" />,
          title: "Professional Services",
          description:
            "Expertise in strategy, consulting, and technical IT support.",
        },
        {
          icon: <Lightbulb size={20} className="text-gray-900" />,
          title: "Business Innovation",
          description: "Drive innovation with tailored technology solutions.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "consulting",
          title: "IT Consulting",
          icon: <ClipboardList className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "planning",
          title: "Strategic IT Planning",
          icon: <BarChart2 className="w-6 h-6 text-green-500" />,
        },
        {
          id: "implementation",
          title: "Technology Implementation",
          icon: <MonitorSmartphone className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "managed",
          title: "Managed IT Services",
          icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
        },
      ],
      serviceDetails: {
        consulting: {
          id: "consulting",
          title: "Tailored IT Consulting Services",
          description:
            "Our seasoned consultants collaborate with you to assess your current IT landscape, identify areas for improvement, and develop tailored strategies that drive efficiency and innovation.",
          features: [
            { id: "assessment", title: "Comprehensive IT assessments" },
            { id: "roadmap", title: "Technology roadmap development" },
            { id: "cloud", title: "Cloud migration strategies" },
            { id: "data", title: "Data and infrastructure optimisation" },
          ],
        },
        planning: {
          id: "planning",
          title: "Strategic IT Planning for Growth",
          description:
            "We craft IT strategies that are in harmony with your business goals, ensuring that technology serves as a catalyst for growth and competitive advantage.",
          features: [
            { id: "vision", title: "Long-term IT vision and planning" },
            { id: "capability", title: "Business capability assessments" },
            {
              id: "transformation",
              title: "Digital transformation strategies",
            },
            { id: "compliance", title: "Risk and compliance management" },
          ],
        },
        implementation: {
          id: "implementation",
          title: "Seamless Technology Implementation",
          description:
            "From planning to execution, we ensure seamless integration of new technologies into your business processes, minimising disruption and maximising value.",
          features: [
            { id: "software", title: "Software implementation and upgrades" },
            { id: "cloud", title: "Cloud solutions deployment" },
            { id: "data", title: "Data migration and management" },
            { id: "support", title: "Ongoing technical support" },
          ],
        },
        managed: {
          id: "managed",
          title: "Comprehensive Managed IT Services",
          description:
            "Allow us to manage your IT operations, providing you with the freedom to focus on your core business activities.",
          features: [
            { id: "support", title: "24/7 IT support and monitoring" },
            { id: "maintenance", title: "Proactive system maintenance" },
            { id: "security", title: "Cybersecurity and threat management" },
            {
              id: "performance",
              title: "Scalability and performance optimisation",
            },
          ],
        },
      },
    },
  },

  // DIGITAL TRANSFORMATION
  {
    Hero: {
      service: "DIGITAL TRANSFORMATION",
      title: "Empowering Businesses for Tomorrow",
      description:
        "Cactus helps businesses unlock innovation and achieve sustainable growth through tailored digital transformation solutions.",
      bulletpoints: [
        "Streamline your operations and innovate faster with our end-to-end technology services.",
      ],
      image: "/services/digital-transformation.png",
    },
    Potential: {
      description:
        "In an era defined by rapid technological evolution, staying ahead requires more than just innovation—it demands transformation. At Cactus, we partner with businesses to reimagine their operations, harness the latest digital technologies, and deliver exceptional value to customers.",
      serviceCards: [
        {
          icon: <ClipboardList size={20} className="text-gray-900" />,
          title: "Digital Strategy",
          description:
            "Craft strategies aligned with business goals, focusing on roadmaps and change management.",
        },
        {
          icon: <MonitorSmartphone size={20} className="text-gray-900" />,
          title: "Application Modernisation",
          description:
            "Develop scalable, secure applications while modernising legacy systems.",
        },
        {
          icon: <Database size={20} className="text-gray-900" />,
          title: "Data Analytics & AI",
          description:
            "Leverage data-driven insights and AI tools for smarter decision-making.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "strategy",
          title: "Digital Strategy Consulting",
          icon: <ClipboardList className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "application",
          title: "Application Modernisation",
          icon: <MonitorSmartphone className="w-6 h-6 text-green-500" />,
        },
        {
          id: "cloud",
          title: "Cloud Transformation",
          icon: <Cloud className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "data",
          title: "Data Analytics & AI",
          icon: <Database className="w-6 h-6 text-red-500" />,
        },
        {
          id: "customer",
          title: "Customer Experience",
          icon: <Users2 className="w-6 h-6 text-orange-500" />,
        },
      ],
      serviceDetails: {
        strategy: {
          id: "strategy",
          title: "Crafting a Transformative Digital Strategy",
          description:
            "We guide you in crafting a transformative digital strategy that aligns with your business vision, driving innovation and efficiency at every step.",
          features: [
            {
              id: "assessment",
              title: "Comprehensive digital readiness assessments",
            },
            { id: "roadmap", title: "Future-focused technology roadmaps" },
            {
              id: "change",
              title: "Change management and adoption strategies",
            },
            {
              id: "upskilling",
              title: "Workforce upskilling for digital success",
            },
          ],
        },
        application: {
          id: "application",
          title: "Modern, Scalable Application Solutions",
          description:
            "Your applications should work for you—not the other way around. We create modern, scalable solutions that are intuitive, efficient, and secure.",
          features: [
            { id: "development", title: "End-to-end application development" },
            { id: "modernisation", title: "Legacy application modernisation" },
            { id: "devops", title: "DevOps for seamless integration" },
            { id: "maintenance", title: "Proactive maintenance and support" },
          ],
        },
        cloud: {
          id: "cloud",
          title: "Achieve Agility and Efficiency",
          description:
            "Achieve agility, cost-efficiency, and enhanced performance with our robust cloud and infrastructure services.",
          features: [
            {
              id: "migration",
              title: "Cloud migration planning and execution",
            },
            { id: "hybrid", title: "Hybrid and multi-cloud strategies" },
            { id: "automation", title: "Infrastructure automation" },
            { id: "security", title: "Advanced security solutions" },
          ],
        },
        data: {
          id: "data",
          title: "Data-Driven Insights and AI Tools",
          description:
            "Turn your data into actionable insights with cutting-edge analytics and AI-powered tools. We enable smarter, data-driven decisions to unlock growth.",
          features: [
            {
              id: "governance",
              title: "Data governance and architecture design",
            },
            {
              id: "analytics",
              title: "Real-time analytics and predictive insights",
            },
            {
              id: "ai",
              title: "AI and machine learning for process automation",
            },
            {
              id: "visualization",
              title: "Intuitive dashboards and data visualisation",
            },
          ],
        },
        customer: {
          id: "customer",
          title: "Redefine Customer Engagement",
          description:
            "Redefine how you connect with customers by delivering personalised, seamless, and engaging experiences across every touchpoint.",
          features: [
            { id: "journey", title: "Customer journey mapping" },
            { id: "omnichannel", title: "Omnichannel engagement strategies" },
            { id: "personalized", title: "Personalised content delivery" },
            { id: "ux", title: "UX/UI design for effortless usability" },
          ],
        },
      },
    },
  },

  // CLOUD SERVICES
  {
    Hero: {
      service: "CLOUD SERVICES",
      title: "Explore Our Cloud Services",
      description:
        "At Cactus, we offer a wide range of cloud solutions to help your business thrive in the digital age.",
      bulletpoints: [
        "Streamline your operations and innovate faster with our end-to-end technology services.",
      ],
      image: "/services/cloud-services.png",
    },
    Potential: {
      description:
        "In an era defined by rapid technological evolution, staying ahead requires more than just innovation—it demands transformation. At Cactus, we partner with businesses to reimagine their operations, harness the latest digital technologies, and deliver exceptional value to customers.",
      serviceCards: [
        {
          icon: <ClipboardList size={20} className="text-gray-900" />,
          title: "Cloud Strategy",
          description:
            "Develop a robust cloud strategy tailored to your business needs.",
        },
        {
          icon: <Cloud size={20} className="text-gray-900" />,
          title: "Cloud Migration",
          description:
            "Seamlessly migrate your applications and data to the cloud.",
        },
        {
          icon: <ShieldCheck size={20} className="text-gray-900" />,
          title: "Cloud Security",
          description:
            "Protect your data and ensure compliance with industry standards.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "strategy",
          title: "Cloud Strategy and Consulting",
          icon: <ClipboardList className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "migration",
          title: "Cloud Migration Services",
          icon: <Cloud className="w-6 h-6 text-green-500" />,
        },
        {
          id: "management",
          title: "Cloud Management",
          icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "security",
          title: "Cloud Security",
          icon: <ShieldCheck className="w-6 h-6 text-red-500" />,
        },
        {
          id: "application",
          title: "Cloud Application Development",
          icon: <MonitorSmartphone className="w-6 h-6 text-orange-500" />,
        },
        {
          id: "hybrid",
          title: "Hybrid and Multi-Cloud Solutions",
          icon: <Server className="w-6 h-6 text-teal-500" />,
        },
      ],
      serviceDetails: {
        strategy: {
          id: "strategy",
          title: "Develop a Robust Cloud Strategy",
          description:
            "We work closely with your team to understand your business objectives and create a cloud strategy that aligns with your goals. Our approach ensures that your cloud adoption journey is strategic, efficient, and cost-effective.",
          features: [
            {
              id: "assessment",
              title: "Comprehensive digital readiness assessments",
            },
            { id: "roadmap", title: "Future-focused technology roadmaps" },
            {
              id: "change",
              title: "Change management and adoption strategies",
            },
            {
              id: "upskilling",
              title: "Workforce upskilling for digital success",
            },
          ],
        },
        migration: {
          id: "migration",
          title: "Seamlessly Migrate Your Applications, Data, and Workloads",
          description:
            "Our team ensures a smooth migration of your applications, data, and workloads to the cloud. We use proven methodologies to minimise downtime and ensure data integrity throughout the process.",
          features: [
            {
              id: "downtime",
              title: "Minimising downtime and maintaining data integrity",
            },
            {
              id: "practices",
              title: "Utilising best practices and proven methodologies",
            },
            {
              id: "transition",
              title: "Ensuring a seamless transition with minimal disruption",
            },
          ],
        },
        management: {
          id: "management",
          title: "Monitor and Manage Your Cloud Environment",
          description:
            "Our team provides continuous monitoring and management of your cloud environment to ensure optimal performance. We use advanced tools to track performance metrics and identify areas for improvement.",
          features: [
            {
              id: "cost",
              title:
                "Implementing cost-saving measures and resource optimisation",
            },
            {
              id: "support",
              title: "Providing ongoing support and maintenance",
            },
            {
              id: "security",
              title:
                "Ensuring your cloud environment remains secure and efficient",
            },
          ],
        },
        security: {
          id: "security",
          title: "Protect Your Data and Applications",
          description:
            "We implement advanced security measures to protect your data and applications from threats. Our solutions include encryption, access controls, and continuous monitoring to ensure the highest level of security.",
          features: [
            {
              id: "compliance",
              title:
                "Ensuring compliance with industry standards and regulations",
            },
            {
              id: "assessment",
              title: "Conducting regular security assessments",
            },
            { id: "secure", title: "Maintaining a secure cloud environment" },
          ],
        },
        application: {
          id: "application",
          title: "Develop and Deploy Cloud-Native Applications",
          description:
            "Our team specialises in developing and deploying cloud-native applications tailored to your business needs. We use the latest cloud technologies and frameworks to create scalable, reliable, and high-performance applications.",
          features: [
            {
              id: "technologies",
              title: "Leveraging cutting-edge cloud technologies",
            },
            {
              id: "scalability",
              title: "Ensuring scalability, reliability, and high performance",
            },
            {
              id: "performance",
              title: "Optimising performance to handle increased demand",
            },
          ],
        },
        hybrid: {
          id: "hybrid",
          title: "Design and Implement Hybrid and Multi-Cloud Architectures",
          description:
            "We design and implement hybrid and multi-cloud architectures that provide greater flexibility and resilience. Our solutions enable you to leverage the benefits of multiple cloud platforms.",
          features: [
            {
              id: "integration",
              title: "Integrating on-premises and cloud environments",
            },
            {
              id: "workload",
              title:
                "Optimising workload distribution across multiple cloud platforms",
            },
            {
              id: "experience",
              title: "Ensuring a consistent user experience",
            },
          ],
        },
      },
    },
  },

  // DATA & AI
  {
    Hero: {
      service: "DATA & AI",
      title: "Explore Our Data and AI Services",
      description:
        "Cactus offers a comprehensive suite of Data and AI solutions designed to help your business thrive in the digital age.",
      bulletpoints: [
        "Streamline your operations and innovate faster with our end-to-end technology services.",
      ],
      image: "/services/data-ai.png",
    },
    Potential: {
      description:
        "At Cactus, we provide cutting-edge Data and AI solutions that empower businesses to make informed decisions, optimise operations, and drive innovation. Our comprehensive services are designed to help you unlock the full potential of your data and leverage artificial intelligence to gain a competitive edge.",
      serviceCards: [
        {
          icon: <ClipboardList size={20} className="text-gray-900" />,
          title: "Data Strategy",
          description:
            "Develop a strategic data roadmap tailored to your business goals.",
        },
        {
          icon: <Database size={20} className="text-gray-900" />,
          title: "Data Engineering",
          description:
            "Design and implement scalable data pipelines and integration solutions.",
        },
        {
          icon: <BarChart2 size={20} className="text-gray-900" />,
          title: "Advanced Analytics",
          description:
            "Leverage predictive analytics and business intelligence for real-time insights.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "strategy",
          title: "Data Strategy and Consulting",
          icon: <ClipboardList className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "engineering",
          title: "Data Engineering and Integration",
          icon: <Database className="w-6 h-6 text-green-500" />,
        },
        {
          id: "analytics",
          title: "Advanced Analytics and BI",
          icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "ai",
          title: "Artificial Intelligence and ML",
          icon: <Lightbulb className="w-6 h-6 text-red-500" />,
        },
        {
          id: "bigdata",
          title: "Big Data Solutions",
          icon: <Server className="w-6 h-6 text-orange-500" />,
        },
        {
          id: "security",
          title: "Data Security and Compliance",
          icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
        },
      ],
      serviceDetails: {
        strategy: {
          id: "strategy",
          title: "Develop a Strategic Data Roadmap",
          description:
            "Develop a comprehensive data strategy that aligns with your business objectives and drives growth. Our experts work closely with you to understand your goals and create a roadmap for data-driven success.",
          features: [
            { id: "planning", title: "Strategic planning" },
            { id: "governance", title: "Data governance" },
            {
              id: "guidance",
              title: "Expert guidance on data management and analytics",
            },
          ],
        },
        engineering: {
          id: "engineering",
          title: "Design and Implement Scalable Data Pipelines",
          description:
            "Design and implement scalable data pipelines that enable efficient data processing and transformation. Our solutions ensure that your data flows seamlessly from source to destination, supporting real-time analytics and decision-making.",
          features: [
            { id: "pipeline", title: "Data pipeline development" },
            {
              id: "integration",
              title: "Data integration from various sources",
            },
            { id: "etl", title: "Robust ETL processes" },
          ],
        },
        analytics: {
          id: "analytics",
          title: "Leverage Predictive Analytics and BI",
          description:
            "Utilise advanced analytics techniques to forecast trends, identify patterns, and make data-driven decisions. Our predictive models help you anticipate future outcomes and optimise your business strategies.",
          features: [
            { id: "predictive", title: "Predictive analytics" },
            { id: "bi", title: "Business intelligence dashboards and reports" },
            { id: "visualization", title: "Data visualisation" },
          ],
        },
        ai: {
          id: "ai",
          title: "Develop Custom AI and ML Solutions",
          description:
            "Develop custom AI solutions that automate processes, enhance decision-making, and drive innovation. Our AI applications are designed to address your specific business challenges and deliver measurable results.",
          features: [
            { id: "solutions", title: "AI solutions" },
            { id: "ml", title: "Machine learning models" },
            { id: "nlp", title: "Natural language processing (NLP)" },
          ],
        },
        bigdata: {
          id: "bigdata",
          title: "Implement Scalable Big Data Architectures",
          description:
            "Design and implement scalable big data architectures that support large-scale data processing and analytics. Our solutions enable you to handle vast amounts of data efficiently and derive actionable insights.",
          features: [
            { id: "architecture", title: "Big data architecture" },
            { id: "lakes", title: "Data lakes and warehouses" },
            { id: "processing", title: "Real-time data processing" },
          ],
        },
        security: {
          id: "security",
          title: "Protect Your Data and Ensure Compliance",
          description:
            "Implement advanced security measures to protect your data from unauthorised access, breaches, and other threats. Our solutions include encryption, access controls, and monitoring to ensure the confidentiality, integrity, and availability of your data.",
          features: [
            { id: "protection", title: "Data protection" },
            { id: "compliance", title: "Regulatory compliance" },
            { id: "risk", title: "Risk management" },
          ],
        },
      },
    },
  },

  // CYBERSECURITY
  {
    Hero: {
      service: "CYBERSECURITY",
      title: "Stay Secure in a Digital World",
      description: "Explore Our Cybersecurity Services",
      bulletpoints: [
        "Comprehensive security solutions designed to protect your business from evolving threats.",
      ],
      image: "/services/cybersecurity.png",
    },
    Potential: {
      description:
        "Cactus offers a comprehensive suite of cybersecurity solutions designed to protect your business from evolving threats.",
      serviceCards: [
        {
          icon: <ClipboardList size={20} className="text-gray-900" />,
          title: "Security Strategy",
          description:
            "Develop a strategic cybersecurity roadmap tailored to your business needs.",
        },
        {
          icon: <ShieldCheck size={20} className="text-gray-900" />,
          title: "Threat Detection",
          description:
            "Implement advanced threat detection and effective incident response plans.",
        },
        {
          icon: <LockKeyhole size={20} className="text-gray-900" />,
          title: "Data Protection",
          description:
            "Protect your sensitive information and ensure compliance with privacy regulations.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "strategy",
          title: "Cybersecurity Strategy",
          icon: <ClipboardList className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "threat",
          title: "Threat Detection and Response",
          icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
        },
        {
          id: "network",
          title: "Network Security",
          icon: <Network className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "endpoint",
          title: "Endpoint Security",
          icon: <MonitorSmartphone className="w-6 h-6 text-red-500" />,
        },
        {
          id: "identity",
          title: "Identity and Access Management",
          icon: <Users2 className="w-6 h-6 text-orange-500" />,
        },
        {
          id: "data",
          title: "Data Protection and Privacy",
          icon: <LockKeyhole className="w-6 h-6 text-teal-500" />,
        },
      ],
      serviceDetails: {
        strategy: {
          id: "strategy",
          title: "Develop a Strategic Cybersecurity Roadmap",
          description:
            "Develop a comprehensive cybersecurity strategy that aligns with your business objectives. Our experts work closely with you to understand your unique security needs and create a tailored roadmap for protection.",
          features: [
            { id: "planning", title: "Strategic planning" },
            { id: "risk", title: "Risk assessment" },
            {
              id: "guidance",
              title: "Expert guidance on cybersecurity best practices",
            },
          ],
        },
        threat: {
          id: "threat",
          title: "Implement Advanced Threat Detection and Response",
          description:
            "Implement advanced threat detection systems to identify and mitigate potential security incidents. Our solutions use cutting-edge technologies to monitor your environment and detect anomalies in real-time.",
          features: [
            { id: "detection", title: "Advanced threat detection" },
            { id: "response", title: "Incident response plans" },
            { id: "monitoring", title: "Continuous monitoring" },
          ],
        },
        network: {
          id: "network",
          title: "Protect Your Network with Secure Architectures",
          description:
            "Implement and manage firewalls to protect your network from unauthorised access. Our solutions include configuring, monitoring, and maintaining firewalls to ensure optimal performance and security.",
          features: [
            { id: "firewall", title: "Firewall management" },
            { id: "intrusion", title: "Intrusion detection and prevention" },
            { id: "architecture", title: "Secure network architecture" },
          ],
        },
        endpoint: {
          id: "endpoint",
          title: "Secure Your Devices with Comprehensive Protection",
          description:
            "Implement comprehensive endpoint protection solutions to secure your devices. Our solutions include antivirus, anti-malware, and endpoint detection and response (EDR) technologies.",
          features: [
            { id: "protection", title: "Endpoint protection" },
            { id: "management", title: "Device management" },
            { id: "patch", title: "Patch management" },
          ],
        },
        identity: {
          id: "identity",
          title: "Manage User Identities and Access Rights",
          description:
            "Implement robust user authentication mechanisms to verify the identity of users. Our solutions include multi-factor authentication (MFA) and single sign-on (SSO) to enhance security.",
          features: [
            { id: "authentication", title: "User authentication" },
            { id: "control", title: "Access control" },
            { id: "governance", title: "Identity governance" },
          ],
        },
        data: {
          id: "data",
          title: "Protect Your Sensitive Information",
          description:
            "Implement advanced security measures to protect your data from unauthorised access, breaches, and other threats. Our solutions include encryption, access controls, and monitoring to ensure the confidentiality, integrity, and availability of your data.",
          features: [
            { id: "encryption", title: "Data encryption" },
            { id: "dlp", title: "Data loss prevention (DLP)" },
            { id: "privacy", title: "Privacy compliance" },
          ],
        },
      },
    },
  },

  // IT INFRASTRUCTURE AND LIFECYCLE MANAGEMENT
  {
    Hero: {
      service: "IT INFRASTRUCTURE AND LIFECYCLE MANAGEMENT",
      title: "Optimise Your IT Backbone",
      description:
        "Build, maintain, and optimise resilient IT infrastructure with our lifecycle solutions.",
      bulletpoints: [
        "Networking, Data Centres, and Storage: Design and manage efficient infrastructure for seamless connectivity.",
        "Lifecycle Management: From procurement to end-of-life services, we manage your IT assets with precision.",
      ],
      image: "/services/infrastructure.png",
    },
    Potential: {
      description:
        "Build resilient and scalable IT infrastructure to support your business growth.",
      serviceCards: [
        {
          icon: <Network size={20} className="text-gray-900" />,
          title: "Networking",
          description:
            "Design and manage efficient network infrastructure for seamless connectivity.",
        },
        {
          icon: <Server size={20} className="text-gray-900" />,
          title: "Data Centres",
          description:
            "Build and optimise data centres to ensure high availability and performance.",
        },
        {
          icon: <HardDrive size={20} className="text-gray-900" />,
          title: "Storage Optimisation",
          description:
            "Implement scalable storage solutions to meet your data needs.",
        },
        {
          icon: <RefreshCw size={20} className="text-gray-900" />,
          title: "Lifecycle Management",
          description:
            "Manage your IT assets from procurement to end-of-life with precision.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "networking",
          title: "Networking",
          icon: <Network className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "datacenters",
          title: "Data Centres",
          icon: <Server className="w-6 h-6 text-green-500" />,
        },
        {
          id: "storage",
          title: "Storage Optimisation",
          icon: <HardDrive className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "lifecycle",
          title: "Lifecycle Management",
          icon: <RefreshCw className="w-6 h-6 text-red-500" />,
        },
      ],
      serviceDetails: {
        networking: {
          id: "networking",
          title: "Design and Manage Efficient Network Infrastructure",
          description:
            "Develop robust network architectures that ensure seamless connectivity and high performance. Our networking solutions are designed to support your business operations and growth.",
          features: [
            { id: "design", title: "Network design and implementation" },
            { id: "monitoring", title: "Network monitoring and management" },
            { id: "security", title: "Security and compliance" },
          ],
        },
        datacenters: {
          id: "datacenters",
          title: "Build and Optimise High-Performance Data Centres",
          description:
            "Design and build data centres that provide high availability, scalability, and performance. Our data centre solutions ensure that your critical applications and data are always accessible.",
          features: [
            { id: "design", title: "Data centre design and construction" },
            { id: "cooling", title: "Cooling and power management" },
            {
              id: "disaster",
              title: "Disaster recovery and business continuity",
            },
          ],
        },
        storage: {
          id: "storage",
          title: "Implement Scalable Storage Solutions",
          description:
            "Develop and implement storage solutions that meet your data needs. Our storage optimisation services ensure that your data is stored securely and efficiently.",
          features: [
            { id: "design", title: "Storage design and implementation" },
            { id: "backup", title: "Data backup and recovery" },
            { id: "monitoring", title: "Storage performance monitoring" },
          ],
        },
        lifecycle: {
          id: "lifecycle",
          title: "Manage Your IT Assets with Precision",
          description:
            "Provide end-to-end lifecycle management for your IT assets, from procurement to end-of-life. Our lifecycle management services ensure that your IT infrastructure remains up-to-date and efficient.",
          features: [
            { id: "procurement", title: "Asset procurement and deployment" },
            { id: "maintenance", title: "Maintenance and technical support" },
            { id: "tracking", title: "Asset tracking and management" },
            { id: "disposal", title: "Decommissioning and disposal" },
          ],
        },
      },
    },
  },

  // AGILE DELIVERY
  {
    Hero: {
      service: "AGILE DELIVERY",
      title: "Deliver Projects with Speed and Precision",
      description:
        "Adopt agile methodologies for efficient software development and business transformation.",
      bulletpoints: [
        "Agile Methodologies: We enable flexibility and efficiency in your IT projects to respond to evolving business needs.",
        "Streamlined Transformation: Use agile frameworks to reduce project risks, improve collaboration, and accelerate delivery.",
      ],
      image: "/services/agile.png",
    },
    Potential: {
      description:
        "Deliver value faster with our agile methodologies for software development and business transformation.",
      serviceCards: [
        {
          icon: <Compass size={20} className="text-gray-900" />,
          title: "Agile Consulting",
          description: "Tailor agile methodologies to your business needs.",
        },
        {
          icon: <Layout size={20} className="text-gray-900" />,
          title: "Scrum and Kanban Implementation",
          description:
            "Implement Scrum and Kanban frameworks for effective project management.",
        },
        {
          icon: <Users size={20} className="text-gray-900" />,
          title: "Agile Coaching and Training",
          description:
            "Provide coaching and training to build agile capabilities within your team.",
        },
        {
          icon: <ClipboardList size={20} className="text-gray-900" />,
          title: "Agile Project Management",
          description:
            "Manage projects with agility to ensure timely and successful delivery.",
        },
        {
          icon: <TrendingUp size={20} className="text-gray-900" />,
          title: "Continuous Improvement",
          description:
            "Foster a culture of continuous improvement and innovation.",
        },
      ],
    },
    Explore: {
      serviceFeatures: [
        {
          id: "consulting",
          title: "Agile Consulting",
          icon: <Compass className="w-6 h-6 text-blue-500" />,
        },
        {
          id: "implementation",
          title: "Scrum and Kanban Implementation",
          icon: <Layout className="w-6 h-6 text-green-500" />,
        },
        {
          id: "coaching",
          title: "Agile Coaching and Training",
          icon: <Users className="w-6 h-6 text-purple-500" />,
        },
        {
          id: "management",
          title: "Agile Project Management",
          icon: <ClipboardList className="w-6 h-6 text-red-500" />,
        },
        {
          id: "improvement",
          title: "Continuous Improvement",
          icon: <TrendingUp className="w-6 h-6 text-yellow-500" />,
        },
      ],
      serviceDetails: {
        consulting: {
          id: "consulting",
          title: "Tailor Agile Methodologies to Your Business Needs",
          description:
            "Develop and implement agile methodologies that align with your business objectives. Our agile consulting services ensure that your projects are flexible, efficient, and responsive to change.",
          features: [
            { id: "assessment", title: "Agile readiness assessments" },
            { id: "framework", title: "Customised agile frameworks" },
            { id: "change", title: "Change management strategies" },
          ],
        },
        implementation: {
          id: "implementation",
          title: "Implement Scrum and Kanban Frameworks",
          description:
            "Implement Scrum and Kanban frameworks to enhance project management and delivery. Our solutions help you manage tasks, track progress, and ensure timely completion of projects.",
          features: [
            { id: "scrum", title: "Scrum framework implementation" },
            { id: "kanban", title: "Kanban board setup and management" },
            { id: "workflow", title: "Workflow optimisation" },
          ],
        },
        coaching: {
          id: "coaching",
          title: "Build Agile Capabilities Within Your Team",
          description:
            "Provide coaching and training to build agile capabilities within your team. Our agile experts work with your team to develop the skills and knowledge needed to succeed in an agile environment.",
          features: [
            { id: "sessions", title: "Agile coaching sessions" },
            { id: "workshops", title: "Training workshops and seminars" },
            { id: "learning", title: "Continuous learning and development" },
          ],
        },
        management: {
          id: "management",
          title: "Manage Projects with Agility",
          description:
            "Manage projects with agility to ensure timely and successful delivery. Our agile project management services help you stay on track, adapt to changes, and deliver value to your customers.",
          features: [
            { id: "planning", title: "Agile project planning" },
            { id: "development", title: "Iterative development cycles" },
            { id: "collaboration", title: "Stakeholder collaboration" },
          ],
        },
        improvement: {
          id: "improvement",
          title: "Foster a Culture of Continuous Improvement",
          description:
            "Foster a culture of continuous improvement and innovation within your organisation. Our continuous improvement services help you identify areas for enhancement and implement changes that drive success.",
          features: [
            { id: "analysis", title: "Retrospective analysis" },
            { id: "optimisation", title: "Process optimisation" },
            { id: "workshops", title: "Innovation workshops" },
          ],
        },
      },
    },
  },
];

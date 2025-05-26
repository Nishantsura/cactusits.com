-- Full data population script for Cactus IT Solutions
-- This script populates the database with complete sample data that matches the hardcoded content

-- Clear existing sample data (uncomment if needed)
-- TRUNCATE services RESTART IDENTITY CASCADE;
-- TRUNCATE industries RESTART IDENTITY CASCADE;
-- TRUNCATE testimonials RESTART IDENTITY CASCADE;

-- Insert complete services data
INSERT INTO services (
  slug, title, description, icon_name, accent_color, accent_position, 
  image, image_position, image_width, image_height, image_alt,
  hero_service, hero_title, hero_description, hero_bulletpoints, hero_image,
  potential_description, potential_service_cards,
  explore_service_features, explore_service_details,
  order_index, is_active
) VALUES
(
  'it-consulting', 
  'IT CONSULTING',
  'Expert guidance for your technology initiatives',
  'LightbulbIcon',
  'bg-purple-500/20',
  'top-right',
  '/landing/services-1.png', 
  'top-0 right-0', 
  400, 
  400, 
  'IT Consulting Services',
  'IT CONSULTING, STRATEGY & SERVICES',
  'Redefine Your Business Strategy',
  'Our IT consulting services deliver customized guidance to help you leverage technology solutions that drive business growth and operational excellence.',
  '[
    "Specialized technical expertise",
    "Customized technology strategies", 
    "Improved operational efficiency", 
    "Increased ROI on technology investments"
  ]',
  '/services/it-consulting-hero.jpg',
  'Discover how our IT consulting services can transform your organization',
  '[
    {
      "icon": "TrendingUp",
      "title": "Strategic IT Planning",
      "description": "Future-proof your business with comprehensive technology strategies aligned with your goals."
    },
    {
      "icon": "Settings",
      "title": "Technology Assessment",
      "description": "Evaluate your current IT infrastructure to identify improvement opportunities."
    },
    {
      "icon": "Shield",
      "title": "Risk Management",
      "description": "Identify potential risks and develop mitigation strategies to protect your business."
    },
    {
      "icon": "BarChart2",
      "title": "Process Optimization",
      "description": "Streamline operations through improved IT processes and automation."
    }
  ]',
  '[
    {"id": "strategy", "title": "Strategic Planning", "icon": "LineChart"},
    {"id": "assessment", "title": "Technology Assessment", "icon": "Search"},
    {"id": "architecture", "title": "Enterprise Architecture", "icon": "Layers"},
    {"id": "roadmap", "title": "Technology Roadmap", "icon": "Map"}
  ]',
  '{
    "strategy": {
      "title": "Strategic IT Planning",
      "description": "We help develop comprehensive IT strategies that align with your business objectives, ensuring that technology investments deliver maximum value.",
      "benefits": [
        "Aligned IT and business goals",
        "Prioritized technology investments",
        "Clear implementation roadmap",
        "Improved technology ROI"
      ]
    },
    "assessment": {
      "title": "Technology Assessment",
      "description": "Our experts evaluate your current IT environment to identify strengths, weaknesses, and opportunities for improvement.",
      "benefits": [
        "Comprehensive system evaluation",
        "Gap analysis and recommendations",
        "Optimization opportunities",
        "Risk identification"
      ]
    },
    "architecture": {
      "title": "Enterprise Architecture",
      "description": "We design scalable and flexible technology architectures that support your business needs while preparing for future growth.",
      "benefits": [
        "Scalable technology foundation",
        "Reduced technical debt",
        "Improved system integration",
        "Enhanced business agility"
      ]
    },
    "roadmap": {
      "title": "Technology Roadmap",
      "description": "We create detailed implementation plans that guide your technology evolution, ensuring smooth transitions and minimal disruption.",
      "benefits": [
        "Clear implementation timeline",
        "Phased adoption approach",
        "Risk mitigation strategies",
        "Resource optimization plan"
      ]
    }
  }',
  1,
  true
),
(
  'digital-transformation', 
  'DIGITAL TRANSFORMATION',
  'Revolutionize your business with modern digital solutions',
  'RefreshCwIcon',
  'bg-blue-500/20',
  'bottom-left',
  '/landing/services-2.png', 
  'bottom-0 left-0', 
  450, 
  450, 
  'Digital Transformation Services',
  'DIGITAL TRANSFORMATION',
  'Reinvent Your Business for the Digital Age',
  'We help businesses evolve through strategic digital solutions that enhance customer experiences, streamline operations, and unlock new growth opportunities.',
  '[
    "Enhanced customer experiences",
    "Streamlined business processes", 
    "Data-driven decision making", 
    "New digital revenue streams"
  ]',
  '/services/digital-transformation-hero.jpg',
  'Embrace digital innovation to stay competitive in today''s rapidly evolving marketplace',
  '[
    {
      "icon": "Users",
      "title": "Customer Experience",
      "description": "Create seamless digital experiences that delight customers and build loyalty."
    },
    {
      "icon": "Workflow",
      "title": "Process Automation",
      "description": "Streamline operations with intelligent automation and workflow optimization."
    },
    {
      "icon": "Database",
      "title": "Data Strategy",
      "description": "Leverage your data assets to drive insights and strategic decision-making."
    },
    {
      "icon": "Zap",
      "title": "Innovation Enablement",
      "description": "Foster a culture of innovation with modern technology platforms."
    }
  ]',
  '[
    {"id": "strategy", "title": "Digital Strategy", "icon": "Compass"},
    {"id": "experience", "title": "Customer Experience", "icon": "Users"},
    {"id": "automation", "title": "Process Automation", "icon": "Workflow"},
    {"id": "analytics", "title": "Data & Analytics", "icon": "BarChart"}
  ]',
  '{
    "strategy": {
      "title": "Digital Strategy Development",
      "description": "We create comprehensive digital transformation strategies that align with your business objectives and market opportunities.",
      "benefits": [
        "Clear digital vision and roadmap",
        "Competitive digital positioning",
        "Prioritized transformation initiatives",
        "Measurable outcomes and KPIs"
      ]
    },
    "experience": {
      "title": "Customer Experience Design",
      "description": "We design and implement seamless customer journeys across all digital touchpoints to improve satisfaction and loyalty.",
      "benefits": [
        "Improved customer satisfaction",
        "Higher conversion rates",
        "Reduced friction points",
        "Consistent omnichannel experience"
      ]
    },
    "automation": {
      "title": "Intelligent Process Automation",
      "description": "We identify and automate key business processes to increase efficiency, reduce errors, and free up resources for higher-value activities.",
      "benefits": [
        "Streamlined operations",
        "Reduced operational costs",
        "Improved accuracy and quality",
        "Faster process execution"
      ]
    },
    "analytics": {
      "title": "Data-Driven Decision Making",
      "description": "We implement advanced analytics capabilities that transform your data into actionable business insights.",
      "benefits": [
        "Real-time business intelligence",
        "Predictive analytics",
        "Data-driven decision culture",
        "Competitive market insights"
      ]
    }
  }',
  2,
  true
),
(
  'cloud-services', 
  'CLOUD SERVICES',
  'Scalable and secure cloud solutions for modern businesses',
  'CloudIcon',
  'bg-blue-500/20',
  'top-left',
  '/landing/services-3.png', 
  'top-0 left-0', 
  420, 
  420, 
  'Cloud Services',
  'CLOUD SERVICES & SOLUTIONS',
  'Transform Your Business with the Power of Cloud',
  'Our cloud services help you migrate, optimize, and innovate in the cloud environment, enabling scalability, flexibility, and cost-efficiency.',
  '[
    "Increased business agility",
    "Optimized infrastructure costs", 
    "Enhanced security and compliance", 
    "Scalable technology foundation"
  ]',
  '/services/cloud-services-hero.jpg',
  'Leverage the full potential of cloud technology for your business',
  '[
    {
      "icon": "Upload",
      "title": "Cloud Migration",
      "description": "Seamlessly move your applications and data to the cloud with minimal disruption."
    },
    {
      "icon": "Server",
      "title": "Cloud Infrastructure",
      "description": "Design and implement robust, scalable cloud environments tailored to your needs."
    },
    {
      "icon": "CloudDrizzle",
      "title": "Hybrid & Multi-Cloud",
      "description": "Optimize workload placement across multiple platforms for best performance and cost."
    },
    {
      "icon": "Shield",
      "title": "Cloud Security",
      "description": "Implement comprehensive security controls to protect your cloud resources."
    }
  ]',
  '[
    {"id": "migration", "title": "Cloud Migration", "icon": "MoveRight"},
    {"id": "infrastructure", "title": "Cloud Infrastructure", "icon": "Server"},
    {"id": "optimization", "title": "Cost Optimization", "icon": "DollarSign"},
    {"id": "security", "title": "Cloud Security", "icon": "Shield"}
  ]',
  '{
    "migration": {
      "title": "Cloud Migration Services",
      "description": "We help you navigate the journey to the cloud with comprehensive planning, seamless execution, and ongoing support.",
      "benefits": [
        "Minimal business disruption",
        "Phased migration approach",
        "Legacy system integration",
        "Post-migration optimization"
      ]
    },
    "infrastructure": {
      "title": "Cloud Infrastructure Solutions",
      "description": "We design, implement, and manage cloud environments that provide the performance, reliability, and scalability your business needs.",
      "benefits": [
        "Scalable architecture",
        "High availability systems",
        "Disaster recovery capabilities",
        "Automated infrastructure provisioning"
      ]
    },
    "optimization": {
      "title": "Cloud Cost Optimization",
      "description": "We help you control and optimize your cloud spending with strategic resource planning and management.",
      "benefits": [
        "Reduced cloud spend",
        "Resource right-sizing",
        "Reserved capacity planning",
        "Cost allocation visibility"
      ]
    },
    "security": {
      "title": "Cloud Security & Compliance",
      "description": "We implement robust security measures to protect your cloud environment from threats while ensuring regulatory compliance.",
      "benefits": [
        "Comprehensive security controls",
        "Regulatory compliance",
        "Identity and access management",
        "Continuous security monitoring"
      ]
    }
  }',
  3,
  true
),
(
  'data-ai', 
  'DATA & AI',
  'Unlock insights and automation with data and AI solutions',
  'DatabaseIcon',
  'bg-green-500/20',
  'bottom-right',
  '/landing/services-4.png', 
  'bottom-0 right-0', 
  430, 
  430, 
  'Data & AI Services',
  'DATA & ARTIFICIAL INTELLIGENCE',
  'Turn Your Data into Strategic Business Value',
  'Our data and AI services help you harness the power of your information assets to drive insights, automation, and competitive advantage.',
  '[
    "Data-driven decision making",
    "Intelligent process automation", 
    "Personalized customer experiences", 
    "Predictive business insights"
  ]',
  '/services/data-ai-hero.jpg',
  'Leverage advanced analytics and AI to transform your business operations',
  '[
    {
      "icon": "Database",
      "title": "Data Strategy",
      "description": "Develop a comprehensive approach to managing and leveraging your data assets."
    },
    {
      "icon": "BarChart2",
      "title": "Business Intelligence",
      "description": "Transform raw data into meaningful insights that drive better decisions."
    },
    {
      "icon": "Cpu",
      "title": "Machine Learning",
      "description": "Implement AI solutions that learn from your data to automate and enhance processes."
    },
    {
      "icon": "MessageCircle",
      "title": "AI Applications",
      "description": "Create practical AI applications that solve real business problems."
    }
  ]',
  '[
    {"id": "strategy", "title": "Data Strategy", "icon": "Database"},
    {"id": "analytics", "title": "Advanced Analytics", "icon": "BarChart2"},
    {"id": "ml", "title": "Machine Learning", "icon": "Brain"},
    {"id": "apps", "title": "AI Applications", "icon": "Cpu"}
  ]',
  '{
    "strategy": {
      "title": "Enterprise Data Strategy",
      "description": "We help you develop a comprehensive approach to data management that treats your information as a strategic asset.",
      "benefits": [
        "Unified data governance",
        "Improved data quality",
        "Enhanced data accessibility",
        "Regulatory compliance"
      ]
    },
    "analytics": {
      "title": "Advanced Analytics",
      "description": "We implement analytics solutions that transform your data into actionable insights for better decision-making.",
      "benefits": [
        "Real-time business dashboards",
        "Self-service analytics",
        "Predictive modeling",
        "Data visualization"
      ]
    },
    "ml": {
      "title": "Machine Learning Solutions",
      "description": "We develop custom machine learning models that learn from your data to solve specific business challenges.",
      "benefits": [
        "Predictive capabilities",
        "Pattern recognition",
        "Anomaly detection",
        "Process optimization"
      ]
    },
    "apps": {
      "title": "AI-Powered Applications",
      "description": "We create practical AI applications that enhance your products, services, and internal operations.",
      "benefits": [
        "Chatbots and virtual assistants",
        "Recommendation engines",
        "Document processing automation",
        "Intelligent forecasting"
      ]
    }
  }',
  4,
  true
);

-- Insert sample industries
INSERT INTO industries (
  slug, name, description, image, order_index, is_active,
  hero_industry, hero_title, hero_description, hero_image,
  approach_items
) VALUES
(
  'information-technology', 
  'Information Technology',
  'Specialized talent for the tech industry',
  '/industries/it.jpg',
  1,
  true,
  'Information Technology',
  'Connecting You with IT Professionals Who Drive Success',
  'We understand the unique talent needs of the technology sector. Our specialized consultants have deep industry knowledge and access to pre-vetted IT professionals across all specializations.',
  '/industries/it-hero.jpg',
  '[
    {
      "title": "Technology-First Assessment",
      "description": "Our technical recruiters have IT backgrounds, allowing them to accurately evaluate technical skills and cultural fit."
    },
    {
      "title": "Specialized Talent Pools",
      "description": "We maintain networks of pre-vetted professionals across all IT specialties, from software development to cybersecurity."
    },
    {
      "title": "Agile Recruitment Process",
      "description": "Our streamlined process moves at the pace of tech, ensuring you secure top talent before your competitors."
    },
    {
      "title": "Technical Skill Validation",
      "description": "We utilize practical assessments and technical interviews to verify candidate capabilities before presentation."
    }
  ]'
),
(
  'banking-financial', 
  'Banking & Financial Services',
  'Talent solutions for the financial sector',
  '/industries/banking.jpg',
  2,
  true,
  'Banking & Financial Services',
  'Elite Talent for the Financial Services Industry',
  'The financial sector demands specialized talent with a unique blend of technical and regulatory expertise. We help institutions find professionals who can navigate complex financial systems while driving innovation.',
  '/industries/banking-hero.jpg',
  '[
    {
      "title": "Compliance-Focused Screening",
      "description": "Our recruitment process incorporates financial regulations and compliance requirements specific to your institution."
    },
    {
      "title": "FinTech Specialization",
      "description": "We have dedicated recruiters who understand the intersection of finance and technology for digital transformation initiatives."
    },
    {
      "title": "Security-Cleared Professionals",
      "description": "Access to candidates with the necessary clearances and understanding of data protection requirements in financial services."
    },
    {
      "title": "Industry Experience Prioritization",
      "description": "We target candidates with proven experience in financial services who can contribute from day one."
    }
  ]'
),
(
  'healthcare', 
  'Healthcare',
  'Specialized technical talent for healthcare providers',
  '/industries/healthcare.jpg',
  3,
  true,
  'Healthcare',
  'Technology Professionals for the Modern Healthcare Environment',
  'We help healthcare organizations find IT talent that understands both technology and the unique challenges of the healthcare industry, from patient care systems to regulatory compliance.',
  '/industries/healthcare-hero.jpg',
  '[
    {
      "title": "HIPAA-Trained Recruitment Team",
      "description": "Our healthcare recruiters understand compliance requirements and prioritize data security awareness."
    },
    {
      "title": "Healthcare IT Experience",
      "description": "We source candidates with specific experience in healthcare systems, EHR platforms, and medical technologies."
    },
    {
      "title": "Patient-Centric Focus",
      "description": "Our selection process emphasizes candidates who understand how their work impacts patient care outcomes."
    },
    {
      "title": "Interoperability Expertise",
      "description": "Access to professionals skilled in connecting disparate healthcare systems and ensuring seamless data flow."
    }
  ]'
);

-- Insert sample testimonials
INSERT INTO testimonials (
  name, position, company, quote, image_path, rating, type, is_featured
) VALUES
(
  'Jennifer Martinez',
  'CTO',
  'TechForward Solutions',
  'Cactus IT Solutions transformed our talent acquisition approach. They understood our technical requirements perfectly and delivered candidates who not only had the skills but also fit our culture beautifully.',
  '/testimonials/person1.jpg',
  5,
  'client',
  true
),
(
  'Michael Robinson',
  'IT Director',
  'Global Financial Group',
  'What impressed me most was their understanding of our industry-specific needs. The candidates they presented already understood compliance requirements, which shortened our onboarding time significantly.',
  '/testimonials/person2.jpg',
  5,
  'client',
  true
),
(
  'Sarah Johnson',
  'Senior Java Developer',
  'Placed at EnterpriseTech Inc.',
  'Unlike other recruiters, Cactus IT took the time to understand my career goals and technical expertise. They found me a role that perfectly matched my skills and offered the growth opportunities I was looking for.',
  '/testimonials/person3.jpg',
  5,
  'employee',
  true
),
(
  'David Chen',
  'DevOps Engineer',
  'Placed at CloudNative Systems',
  'The Cactus IT team was refreshingly transparent throughout the entire process. They provided excellent preparation for my interviews and negotiated a compensation package that exceeded my expectations.',
  '/testimonials/person4.jpg',
  5,
  'employee',
  true
);

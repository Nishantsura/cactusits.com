interface PageProps {
  Hero: {
    industry: string;
    title: string;
    description: string;
    image: string;
  };
  Approach: {
    title: string;
    description: string;
  }[];
}

export const data: Record<string, PageProps>[] = [
  {
    "information-technology": {
      Hero: {
        industry: "Information Technology",
        title: "Connecting You with IT Professionals Who Drive Success",
        description:
          "In today's fast-paced digital world, the Information Technology (IT) sector is the backbone of innovation and efficiency. Our IT staffing solutions are designed to meet the unique needs of this dynamic industry, providing top-tier talent that drives technological advancements and business success.",
        image:
          "/industries/vecteezy_portrait-of-a-serious-and-focused-female-programmer-working_54880456.jpeg",
      },
      Approach: [
        {
          title: "Technical Expertise",
          description:
            "Connect with professionals who excel in various programming languages and frameworks.",
        },
        {
          title: "Software Development",
          description:
            "Build robust applications with developers skilled in the latest technologies.",
        },
        {
          title: "Cloud Architecture",
          description:
            "Design and implement scalable cloud solutions with certified cloud architects.",
        },
        {
          title: "DevOps Engineering",
          description:
            "Streamline your development pipeline with experienced DevOps engineers.",
        },
        {
          title: "Data Analysis",
          description:
            "Transform your data into actionable insights with expert data analysts.",
        },
        {
          title: "Cybersecurity",
          description:
            "Protect your digital assets with experts in security protocols and threat mitigation.",
        },
        {
          title: "IT Project Management",
          description:
            "Ensure your projects are delivered on time and within budget with experienced managers.",
        },
        {
          title: "Network Engineering",
          description:
            "Build and maintain reliable network infrastructure with skilled network engineers.",
        },
        {
          title: "UI/UX Design",
          description:
            "Create intuitive and engaging user experiences with talented designers.",
        },
        {
          title: "Quality Assurance",
          description:
            "Ensure software reliability with meticulous QA specialists and automated testing.",
        },
      ],
    },
    "banking-financial": {
      Hero: {
        industry: "Banking & Financial Services",
        title: "Delivering Secure, Scalable, and Innovative Solutions",
        description:
          "For the financial services sector, we deliver secure, scalable, and innovative solutions for banking, insurance, and fintech. Our consulting services provide strategic advice to help financial institutions stay ahead in a competitive market.",
        image: "/industries/Finiancial Services.jpg",
      },
      Approach: [
        {
          title: "Consulting Services",
          description:
            "Provide strategic advice to help financial institutions stay ahead in a competitive market.",
        },
        {
          title: "Technology Services",
          description:
            "Enhance business operations with our technology services and implement robust enterprise IT solutions to support large-scale financial operations.",
        },
        {
          title: "Secure Cloud Services",
          description:
            "Enhance flexibility and scalability with secure cloud services.",
        },
        {
          title: "Data Analytics and AI Solutions",
          description:
            "Provide insights that drive business growth and efficiency.",
        },
        {
          title: "Agile Methodologies",
          description:
            "Ensure timely and efficient project delivery with agile methodologies.",
        },
        {
          title: "Cybersecurity Measures",
          description:
            "Protect sensitive financial data with advanced cybersecurity measures.",
        },
        {
          title: "IT Infrastructure and Lifecycle Management",
          description:
            "Ensure reliability and performance with comprehensive IT infrastructure and lifecycle management services.",
        },
        {
          title: "Regulatory Compliance",
          description:
            "Ensure compliance with financial regulations such as GDPR, PCI DSS, and SOX.",
        },
        {
          title: "Customer Experience",
          description:
            "Enhance customer experience through digital banking solutions and personalised services.",
        },
        {
          title: "Risk Management",
          description:
            "Implement risk management solutions to identify, assess, and mitigate financial risks.",
        },
      ],
    },
    "retail-ecommerce": {
      Hero: {
        industry: "Retail eCommerce & Consumer Packaged Goods",
        title: "Transforming Retail Operations with Agile Technologies",
        description:
          "The retail industry is evolving rapidly, with a significant shift toward online sales. Companies worldwide are adopting agile technologies and automating operations to improve efficiency, aiming to deliver outstanding service and experiences to their customers.",
        image:
          "/industries/vecteezy_handsome-prosperous-businessman-reads-useful-information-in_8168158.jpg",
      },
      Approach: [
        {
          title: "Digital Transformation",
          description:
            "Recognise that digital transformation is essential for long-term success.",
        },
        {
          title: "Personalised Experiences",
          description:
            "Adapt to increasing demand for personalised experiences for both customers and supply chains.",
        },
        {
          title: "Cloud-Based Solutions",
          description:
            "Drive the shift with the adoption of cloud-based retail consulting solutions and performance-oriented digital platforms.",
        },
        {
          title: "Process Optimisation",
          description:
            "Implement technologies and optimise processes to enhance efficiency and deliver exceptional customer experiences.",
        },
        {
          title: "Omnichannel Retailing",
          description:
            "Implement omnichannel retail strategies to provide a seamless shopping experience across online and offline channels.",
        },
        {
          title: "Inventory Management",
          description:
            "Use advanced inventory management systems to optimise stock levels and reduce costs.",
        },
        {
          title: "Customer Analytics",
          description:
            "Leverage customer analytics to understand buying behaviour and tailor marketing strategies.",
        },
      ],
    },
    healthcare: {
      Hero: {
        industry: "Healthcare",
        title: "Enhancing Patient Care and Operational Efficiency",
        description:
          "In the healthcare sector, we implement IT systems that enhance patient care, compliance, and operational efficiency. Our consulting services offer expert advice to optimise healthcare IT systems and processes.",
        image: "/industries/Healthcare.jpg",
      },
      Approach: [
        {
          title: "Consulting Services",
          description:
            "Offer expert advice to optimise healthcare IT systems and processes.",
        },
        {
          title: "Technology Solutions",
          description:
            "Provide innovative technology solutions to improve patient care and operational efficiency.",
        },
        {
          title: "Enterprise IT Solutions",
          description:
            "Implement scalable enterprise IT solutions to support large healthcare organisations.",
        },
        {
          title: "Secure Cloud Services",
          description:
            "Enable flexible and secure data management with secure cloud services.",
        },
        {
          title: "Data Analytics and AI Solutions",
          description:
            "Enhance patient outcomes and operational efficiency with data analytics and AI solutions.",
        },
        {
          title: "Agile Methodologies",
          description:
            "Ensure efficient project delivery with agile methodologies.",
        },
        {
          title: "Cybersecurity Measures",
          description:
            "Protect patient data with robust cybersecurity measures.",
        },
        {
          title: "IT Infrastructure and Lifecycle Management",
          description:
            "Ensure optimal performance and compliance with comprehensive IT infrastructure and lifecycle management services.",
        },
        {
          title: "Electronic Health Records (EHR)",
          description:
            "Implement and manage EHR systems to improve patient care and data accessibility.",
        },
        {
          title: "Telemedicine Solutions",
          description:
            "Develop telemedicine platforms to provide remote healthcare services.",
        },
        {
          title: "Regulatory Compliance",
          description:
            "Ensure compliance with healthcare regulations such as HIPAA and GDPR.",
        },
      ],
    },
    "public-sector": {
      Hero: {
        industry: "Information Technology",
        title: "Connecting You with IT Professionals Who Drive Success",
        description:
          "In today's fast-paced digital world, the Information Technology (IT) sector is the backbone of innovation and efficiency. Our IT staffing solutions are designed to meet the unique needs of this dynamic industry, providing top-tier talent that drives technological advancements and business success.",
        image:
          "/industries/vecteezy_portrait-of-a-serious-and-focused-female-programmer-working_54880456.jpeg",
      },
      Approach: [
        {
          title: "Tailored Recruitment",
          description:
            "We understand that every IT project is unique. Our recruitment process is customised to find candidates with the specific skills and experience needed for your projects.",
        },
        {
          title: "Comprehensive Screening",
          description:
            "We conduct thorough screenings, including technical assessments and background checks, to ensure that our candidates meet the highest standards.",
        },
        {
          title: "Industry Expertise",
          description:
            "Our team has deep knowledge of the IT sector, enabling us to match the right talent with the right opportunities.",
        },
        {
          title: "Ongoing Support",
          description:
            "We provide continuous support to both our clients and candidates, ensuring a smooth integration and long-term success.",
        },
        {
          title: "Software Development",
          description:
            "Connect with expert developers skilled in various programming languages and frameworks.",
        },
        {
          title: "Network Engineering",
          description:
            "Find specialists who can design, implement, and maintain your network infrastructure.",
        },
        {
          title: "Data Analysis",
          description:
            "Hire professionals who can transform your data into actionable insights.",
        },
        {
          title: "Cybersecurity",
          description:
            "Protect your digital assets with experts in security protocols and threat mitigation.",
        },
        {
          title: "IT Project Management",
          description:
            "Ensure your projects are delivered on time and within budget with experienced IT project managers.",
        },
        {
          title: "Flexible Staffing Solutions",
          description:
            "Whether you need temporary, contract-to-hire, or permanent placements, we offer flexible staffing solutions to meet your needs.",
        },
        {
          title: "Client Success Stories",
          description:
            "Our clients range from startups to the most trusted public sector departments, all benefiting from our dedicated IT staffing services.",
        },
        {
          title: "Continuous Learning",
          description:
            "We emphasize ongoing professional development to ensure our talent stays current with the latest technologies and methodologies.",
        },
      ],
    },
    "public-sector-defence": {
      Hero: {
        industry: "Public Sector & Defence",
        title: "Improving Service Delivery Through Technology",
        description:
          "For the public sector, we help government organisations and agencies improve service delivery through technology. Our consulting services provide strategic advice to enhance public sector IT systems and processes.",
        image:
          "/industries/vecteezy_a-woman-in-a-business-suit-standing-with-her-arms-crossed_56505159.jpeg",
      },
      Approach: [
        {
          title: "Consulting Services",
          description:
            "Provide strategic advice to enhance public sector IT systems and processes.",
        },
        {
          title: "Technology Solutions",
          description:
            "Offer innovative technology solutions to improve service delivery.",
        },
        {
          title: "Enterprise IT Solutions",
          description:
            "Implement robust enterprise IT solutions to support large-scale government operations.",
        },
        {
          title: "Secure Cloud Services",
          description:
            "Enhance flexibility and scalability with secure cloud services.",
        },
        {
          title: "Data Analytics and AI Solutions",
          description:
            "Improve decision-making and service delivery with data analytics and AI solutions.",
        },
        {
          title: "Agile Methodologies",
          description:
            "Ensure timely and efficient project delivery with agile methodologies.",
        },
        {
          title: "Specialised IT Services",
          description:
            "Offer specialised IT services designed for government agencies.",
        },
        {
          title: "Cybersecurity & IT Infrastructure Measures",
          description:
            "Protect sensitive government data with advanced cybersecurity measures.",
        },
        {
          title: "IT Infrastructure and Lifecycle Management",
          description:
            "Ensure reliability and performance with comprehensive IT infrastructure and lifecycle management services.",
        },
        {
          title: "Citizen Engagement",
          description:
            "Develop digital platforms to enhance citizen engagement and service delivery.",
        },
        {
          title: "Smart City Solutions",
          description:
            "Implement smart city technologies to improve urban infrastructure and services.",
        },
        {
          title: "Regulatory Compliance",
          description:
            "Ensure compliance with government regulations and standards.",
        },
      ],
    },
  },
];

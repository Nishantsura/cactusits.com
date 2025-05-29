"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getServices, getIndustries } from "@/lib/data-utils";

type SubMenuItem = {
  title: string;
  url: string;
  description: string;
};

type MenuItem = {
  title: string;
  url: string;
  submenu?: SubMenuItem[];
};

type PlatformItem = {
  title: string;
  url: string;
  icon: React.ReactNode;
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Check if a menu item is currently active based on the current path
  const isActive = (url: string) => {
    if (url === "/" && pathname === "/") return true;
    if (url !== "/" && pathname.startsWith(url)) return true;
    return false;
  };

  // Close mobile menu
  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Only trigger the hide/show after scrolling at least 5px
        // This prevents sensitivity to small scroll movements
        if (currentScrollY > lastScrollY + 5) {
          setScrollingDown(true);
        } else if (currentScrollY < lastScrollY - 5) {
          setScrollingDown(false);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // State for services and industries from the database
  const [servicesItems, setServicesItems] = useState<SubMenuItem[]>([]);
  const [industriesItems, setIndustriesItems] = useState<SubMenuItem[]>([]);

  // Fetch services and industries from Supabase
  useEffect(() => {
    const fetchServicesAndIndustries = async () => {
      try {
        // Fetch services
        const { data: servicesData } = await getServices();
        if (servicesData) {
          const formattedServices = servicesData
            .filter((service) => service.is_active !== false) // Only show active services
            .sort((a, b) => (a.order_index || 999) - (b.order_index || 999)) // Sort by order_index
            .map((service) => ({
              title: service.title,
              url: `/services/${service.slug}`,
              description: service.description || "",
            }));
          setServicesItems(formattedServices);
        }

        // Fetch industries
        const { data: industriesData } = await getIndustries();
        if (industriesData) {
          const formattedIndustries = industriesData
            .filter((industry) => industry.is_active !== false) // Only show active industries
            .sort((a, b) => (a.order_index || 999) - (b.order_index || 999)) // Sort by order_index
            .map((industry) => ({
              title:
                industry.name ||
                industry.hero_industry ||
                industry.title ||
                "Industry", // Try all possible title fields
              url: `/industries/${industry.slug}`,
              description:
                industry.description || industry.hero_description || "",
            }));
          setIndustriesItems(formattedIndustries);
        }
      } catch (error) {
        console.error("Error fetching navigation data:", error);
      }
    };

    fetchServicesAndIndustries();
  }, []);

  // Sample data for platform section (Quick Links)
  const platformItems: PlatformItem[] = [
    {
      title: "Why Us",
      url: "/#why-choose-us",
      icon: (
        <Image
          src="/landing/nav-quick-1.svg"
          alt="Why Us"
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "Talk to our agent",
      url: "/#contactus",
      icon: (
        <Image
          src="/landing/nav-quick-2.svg"
          alt="Talk to our agent"
          width={20}
          height={20}
        />
      ),
    },
    {
      title: "Careers",
      url: "/careers",
      icon: (
        <Image
          src="/landing/nav-quick-3.svg"
          alt="Careers"
          width={20}
          height={20}
        />
      ),
    },
  ];

  // Main navigation items - define static items
  const staticNavItems: MenuItem[] = [
    { title: "About Us", url: "/aboutus" },
    { title: "Careers", url: "/careers" },
  ];

  // Create dynamic navItems by combining static items with dynamic services and industries
  const [navItems, setNavItems] = useState<MenuItem[]>([
    { title: "Services", url: "/services", submenu: [] },
    { title: "Industries", url: "/industries", submenu: [] },
    ...staticNavItems,
  ]);

  // Update navItems when services or industries change
  useEffect(() => {
    setNavItems([
      { title: "Services", url: "/services", submenu: servicesItems },
      { title: "Industries", url: "/industries", submenu: industriesItems },
      ...staticNavItems,
    ]);
  }, [servicesItems, industriesItems]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (title: string) => {
    if (!isMobile) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      setActiveMenu(title);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      // Set a timeout to delay the closing of the dropdown
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 300);
    }
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleDropdownMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setActiveMenu(null);
      }, 300);
    }
  };

  const toggleSubmenu = (title: string) => {
    setActiveMenu(activeMenu === title ? null : title);
  };

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 transition-transform duration-300 bg-[#F0F0F0] shadow-sm backdrop-blur-sm backdrop-saturate-150"
      style={{
        transform: scrollingDown ? "translateY(-100%)" : "translateY(0)",
      }}
      ref={menuRef}
    >
      {/* Main navbar */}
      <div className="relative w-screen min-h-16 bg-[#F0F0F0]">
        <div className="w-[85vw] mx-auto">
          <div className="flex items-center justify-between h-16 w-full">
            {/* Logo */}
            <div className="flex items-center border-r-2 border-slate-100 pr-4 md:pr-10">
              <Link href="/" className="flex items-center">
                <div className="flex items-center">
                  <Image
                    src="/logo.svg"
                    alt="cactus it logo"
                    width={1000}
                    height={1000}
                    className="w-8 h-auto"
                  />
                  <span className="ml-2 text-xl font-bold">CACTUS</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center w-full justify-between ml-10">
              <div className="flex gap-4">
                {navItems.map((item) => (
                  <div
                    key={item.title}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.title)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={item.url}
                      className={`
                        px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center
                        ${
                          isActive(item.url)
                            ? "bg-foreground/10 text-foreground font-semibold"
                            : "text-gray-txt hover:bg-gray-100"
                        }
                      `}
                    >
                      <span>{item.title}</span>
                      {item.submenu && (
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                            activeMenu === item.title ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </Link>

                    {/* Dropdown for Services and Industries */}
                    {item.submenu && activeMenu === item.title && (
                      <div
                        className="absolute left-0 mt-1 w-screen max-w-2xl bg-[#F0F0F0] shadow-lg z-50 rounded-b-md border border-gray-200"
                        style={{ marginLeft: "-100px" }}
                        onMouseEnter={handleDropdownMouseEnter}
                        onMouseLeave={handleDropdownMouseLeave}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                          <div className="col-span-1 md:col-span-2 grid grid-cols-1 gap-4">
                            <div className="mb-2">
                              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                                ALL {item.title}
                              </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.title}
                                  href={subItem.url}
                                  className="group flex items-start p-2 hover:bg-gray-50 rounded-md"
                                >
                                  <div className="flex-shrink-0 h-2 w-2 flex items-center justify-center text-primary mt-1">
                                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary flex items-center">
                                      {subItem.title}
                                      <ArrowUpRight className="ml-1 h-3 w-3" />
                                    </p>
                                    <p className="mt-1 text-xs text-gray-500">
                                      {subItem.description}
                                    </p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="mb-2">
                              <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200">
                                QUICK LINKS
                              </h3>
                            </div>
                            <div className="grid grid-cols-1 gap-0">
                              {platformItems.map((platformItem) => (
                                <Link
                                  key={platformItem.title}
                                  href={platformItem.url}
                                  className="group flex items-center justify-between p-2 hover:bg-gray-50 rounded-md"
                                >
                                  <div className="flex gap-2 items-center">
                                    {platformItem.icon}
                                    <p className="text-sm font-medium text-gray-900 group-hover:text-primary">
                                      {platformItem.title}
                                    </p>
                                  </div>
                                  <ArrowUpRight className="h-4 w-4 text-gray-600 group-hover:text-primary" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <Link
                  href="/#contactus"
                  className="bg-foreground hover:bg-primary text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </nav>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <span className="sr-only">
                  {isOpen ? "Close menu" : "Open menu"}
                </span>
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            className="lg:hidden absolute w-full bg-[#F0F0F0] border-t border-gray-200 shadow-lg z-50"
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <div key={item.title} className="py-1">
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.url}
                      onClick={closeMobileMenu}
                      className={`
                        flex-1 flex items-center px-3 py-2 text-base font-medium rounded-md
                        ${
                          isActive(item.url)
                            ? "bg-foreground/10 text-foreground"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }
                      `}
                    >
                      <span>{item.title}</span>
                    </Link>
                    {item.submenu && (
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className="px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                        aria-label={`Toggle ${item.title} submenu`}
                      >
                        <svg
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeMenu === item.title ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {item.submenu && activeMenu === item.title && (
                    <div className="mt-2 space-y-2 pl-4">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.url}
                          onClick={closeMobileMenu}
                          className="block px-3 py-2 text-sm text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md cursor-pointer"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                      <div className="border-t border-gray-200 my-4"></div>
                      <div className="px-3 py-2">
                        <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          QUICK LINKS
                        </h3>
                        <div className="mt-2 space-y-2">
                          {platformItems.map((platformItem) => (
                            <Link
                              key={platformItem.title}
                              href={platformItem.url}
                              onClick={closeMobileMenu}
                              className="flex items-center justify-between py-2 text-sm text-gray-700 hover:text-primary"
                            >
                              <div className="flex items-center gap-2">
                                {platformItem.icon}
                                <span>{platformItem.title}</span>
                              </div>
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 pb-4">
                <Link
                  href="/#contactus"
                  onClick={closeMobileMenu}
                  className="block w-full text-center bg-foreground hover:bg-primary text-white px-4 py-2 rounded-md text-base font-medium transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

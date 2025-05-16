import { useEffect, useState, useCallback, useRef } from 'react';

interface SectionScrollOptions {
  sectionSelector: string;
  threshold?: number;
  scrollDuration?: number;
  offset?: number; // Optional offset for fixed headers
}

export function useSectionScroll({
  sectionSelector,
  // threshold param is not used in the implementation
  scrollDuration = 800, // Increased for smoother animation
  offset = 0, // Default no offset
}: SectionScrollOptions) {
  const [activeSection, setActiveSection] = useState<number>(0);
  const [sections, setSections] = useState<HTMLElement[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const lastScrollTime = useRef<number>(0);
  const wheelEventCount = useRef<number>(0);

  // Initialize sections
  useEffect(() => {
    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>(sectionSelector)
    );
    setSections(sectionElements);

    // Initially set to the section that's most visible
    if (sectionElements.length > 0) {
      const initialSection = findVisibleSection(sectionElements);
      setActiveSection(initialSection);
    }
  }, [sectionSelector]);

  // Helper to find the most visible section
  const findVisibleSection = useCallback((sectionEls: HTMLElement[]) => {
    const windowHeight = window.innerHeight;
    
    let bestSection = 0;
    let maxVisibility = 0;
    
    sectionEls.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sectionHeight = rect.height;
      const sectionTop = rect.top;
      
      // Calculate visibility ratio (how much of the section is visible)
      const visibleHeight = Math.min(windowHeight, sectionTop + sectionHeight) - 
                           Math.max(0, sectionTop);
      const visibilityRatio = visibleHeight / sectionHeight;
      
      if (visibilityRatio > maxVisibility) {
        maxVisibility = visibilityRatio;
        bestSection = index;
      }
    });
    
    return bestSection;
  }, []);

  // Smooth scroll to section with enhanced behavior
  const scrollToSection = useCallback((index: number) => {
    if (!sections[index] || isScrolling) return;
    
    setIsScrolling(true);
    const targetSection = sections[index];
    
    // Calculate target position with offset
    const targetPosition = targetSection.offsetTop - offset;
    
    // Use smooth scrolling with the right timing function
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
    
    // Update active section
    setActiveSection(index);
    
    // Reset scrolling state after animation completes
    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }
    
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false);
      
      // Ensure we're exactly at the target position (fix any small offsets)
      const currentPos = window.scrollY;
      const distance = Math.abs(currentPos - targetPosition);
      
      if (distance < 5) {
        window.scrollTo({
          top: targetPosition,
          behavior: 'auto'
        });
      }
    }, scrollDuration);
  }, [sections, isScrolling, scrollDuration, offset]);

  // Handle scroll events
  useEffect(() => {
    if (!sections.length) return;
    
    const handleScroll = () => {
      // Skip if currently in an animated scroll
      if (isScrolling) return;
      
      // Debounce scroll events
      const now = Date.now();
      if (now - lastScrollTime.current < 50) return;
      lastScrollTime.current = now;
      
      const newActiveSection = findVisibleSection(sections);
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection);
      }
    };
    
    // Handle wheel events for section-to-section scrolling
    const handleWheel = (e: WheelEvent) => {
      // Prevent too frequent wheel events (helps with trackpad scrolling)
      wheelEventCount.current += 1;
      if (wheelEventCount.current % 2 !== 0) return;
      
      if (isScrolling) {
        e.preventDefault();
        return;
      }
      
      // Detect scroll direction
      const delta = e.deltaY;
      
      // Skip small deltas (for precise trackpad gestures)
      if (Math.abs(delta) < 20) return;
      
      // Debounce wheel events
      const now = Date.now();
      if (now - lastScrollTime.current < 200) return;
      lastScrollTime.current = now;
      
      // Handle direction
      if (delta > 0 && activeSection < sections.length - 1) {
        // Scrolling down
        e.preventDefault();
        scrollToSection(activeSection + 1);
      } else if (delta < 0 && activeSection > 0) {
        // Scrolling up
        e.preventDefault();
        scrollToSection(activeSection - 1);
      }
    };
    
    // Also handle keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      // Arrow keys for navigation
      if (e.key === 'ArrowDown' && activeSection < sections.length - 1) {
        e.preventDefault();
        scrollToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' && activeSection > 0) {
        e.preventDefault();
        scrollToSection(activeSection - 1);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      
      if (scrollTimeoutRef.current) {
        window.clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sections, activeSection, isScrolling, scrollDuration, findVisibleSection, scrollToSection]);

  return {
    activeSection,
    scrollToSection,
    sections,
  };
}

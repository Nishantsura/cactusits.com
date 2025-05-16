"use client";

import React, { forwardRef, HTMLAttributes, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface SnapContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  snapType?: "y" | "x" | "both";
  snapStop?: "always" | "normal";
}

const SnapContainer = forwardRef<HTMLDivElement, SnapContainerProps>(
  (
    { className, children, snapType = "y", snapStop = "always", ...props },
    ref,
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const combinedRef = (node: HTMLDivElement) => {
      // Pass the ref to both our local ref and the forwarded ref
      containerRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    // Setup scrolling behavior
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // No need to store scroll position in this implementation

      const handleScroll = () => {
        // Prevent default behavior if needed
        if (window.scrollY !== 0) {
          window.scrollTo(0, 0);
        }
      };

      const handleWheelEvent = (e: WheelEvent) => {
        // Prevent default scrolling behavior
        e.preventDefault();

        const delta = e.deltaY;
        const sections = Array.from(
          container.querySelectorAll("[data-section]"),
        );

        // Find current active section
        const viewportCenter = window.innerHeight / 2;

        let activeIndex = 0;
        let closestDistance = Infinity;

        sections.forEach((section, index) => {
          const sectionRect = section.getBoundingClientRect();
          const sectionCenter = sectionRect.top + sectionRect.height / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            activeIndex = index;
          }
        });

        // Determine target section
        let targetIndex = activeIndex;
        if (delta > 0 && activeIndex < sections.length - 1) {
          // Scrolling down
          targetIndex = activeIndex + 1;
        } else if (delta < 0 && activeIndex > 0) {
          // Scrolling up
          targetIndex = activeIndex - 1;
        }

        // Scroll to target section
        if (sections[targetIndex]) {
          sections[targetIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      };

      // Add event listeners
      window.addEventListener("scroll", handleScroll);
      container.addEventListener("wheel", handleWheelEvent, { passive: false });

      return () => {
        window.removeEventListener("scroll", handleScroll);
        container.removeEventListener("wheel", handleWheelEvent);
      };
    }, []);

    return (
      <div
        ref={combinedRef}
        className={cn(
          "overflow-y-scroll",
          "h-screen w-full",
          // CSS snap scrolling styles
          snapType === "y" && "snap-y",
          snapType === "x" && "snap-x",
          snapType === "both" && "snap-both",
          snapStop === "always" && "snap-mandatory",
          snapStop === "normal" && "snap-proximity",
          // Hide scrollbar but keep functionality
          "scrollbar-hide",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

SnapContainer.displayName = "SnapContainer";

export { SnapContainer };

import React, { forwardRef, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  verticalAlign?: "top" | "center" | "bottom";
  innerPadding?: boolean;
  fullHeight?: boolean;
  spacing?: "none" | "minimal" | "compact" | "normal";
  noPadding?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      children,
      verticalAlign = "center",
      innerPadding = true,
      spacing = "normal",
      fullHeight = false,
      ...props
    },
    ref,
  ) => {
    return (
      <section
        ref={ref}
        className={cn(
          "relative w-full",
          // Optional full height
          fullHeight ? "min-h-screen" : "py-8 md:py-12",

          // Spacing between sections (reduced)
          spacing === "none" && "py-0",
          spacing === "minimal" && "py-4",
          spacing === "compact" && "py-6 md:py-8",
          spacing === "normal" && "py-8 md:py-12",

          // Flexible layout with alignment options
          "flex flex-col items-center",
          verticalAlign === "top" && "justify-start",
          verticalAlign === "center" && "justify-center",
          verticalAlign === "bottom" && "justify-end",

          // Apply padding only inside the section
          innerPadding && "px-4 lg:px-8",

          // Apply custom className last to allow overrides
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
);

Section.displayName = "Section";

export { Section };

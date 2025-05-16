import React, { createContext, useContext, ReactNode } from "react";
import { useSectionScroll } from "@/hooks/useSectionScroll";

interface SectionScrollContextProps {
  activeSection: number;
  scrollToSection: (index: number) => void;
  sections: HTMLElement[];
}

const SectionScrollContext = createContext<
  SectionScrollContextProps | undefined
>(undefined);

interface SectionScrollProviderProps {
  children: ReactNode;
  sectionSelector?: string;
}

export function SectionScrollProvider({
  children,
  sectionSelector = "[data-section]",
}: SectionScrollProviderProps) {
  const sectionScroll = useSectionScroll({
    sectionSelector,
  });

  return (
    <SectionScrollContext.Provider value={sectionScroll}>
      {children}
    </SectionScrollContext.Provider>
  );
}

export function useSectionScrollContext() {
  const context = useContext(SectionScrollContext);
  if (context === undefined) {
    throw new Error(
      "useSectionScrollContext must be used within a SectionScrollProvider",
    );
  }
  return context;
}

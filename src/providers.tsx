'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';
import { SectionScrollProvider } from '@/providers/SectionScrollProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <SectionScrollProvider>
        {children}
      </SectionScrollProvider>
    </ThemeProvider>
  );
}

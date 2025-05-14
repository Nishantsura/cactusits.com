'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import with client-side only rendering
const DynamicSnapContainer = dynamic(
  () => import('@/components/ui/snap-container').then(mod => mod.SnapContainer),
  { ssr: false }
);

interface ClientSnapContainerProps {
  children: React.ReactNode;
  className?: string;
  snapType?: 'y' | 'x' | 'both';
  snapStop?: 'always' | 'normal';
}

export function ClientSnapContainer({
  children,
  className,
  snapType = 'y',
  snapStop = 'always',
}: ClientSnapContainerProps) {
  return (
    <DynamicSnapContainer 
      className={className} 
      snapType={snapType} 
      snapStop={snapStop}
    >
      {children}
    </DynamicSnapContainer>
  );
}

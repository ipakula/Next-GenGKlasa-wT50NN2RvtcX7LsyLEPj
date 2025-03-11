
import React from 'react';
import { Transition } from '@/components/ui/transition';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <Transition 
      type="scale" 
      duration="normal"
      className="w-full h-full"
    >
      {children}
    </Transition>
  );
}

export default PageTransition;

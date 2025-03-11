
import React from 'react';
import { cn } from '@/lib/utils';

interface TransitionProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  appear?: boolean;
  type?: 'fade' | 'scale' | 'slide-up' | 'slide-down';
  duration?: 'fast' | 'normal' | 'slow';
  delay?: number;
  unmount?: boolean;
  children: React.ReactNode;
}

export function Transition({
  show = true,
  appear = false,
  type = 'fade',
  duration = 'normal',
  delay = 0,
  unmount = true,
  className,
  children,
  ...props
}: TransitionProps) {
  const [shouldRender, setShouldRender] = React.useState(show || appear);
  
  React.useEffect(() => {
    if (show) setShouldRender(true);
    
    let timeoutId: NodeJS.Timeout;
    if (!show && shouldRender) {
      timeoutId = setTimeout(() => {
        setShouldRender(false);
      }, getDurationValue(duration) + delay);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, shouldRender, duration, delay]);
  
  if (unmount && !shouldRender) return null;
  
  const durationClass = {
    fast: 'duration-200',
    normal: 'duration-300',
    slow: 'duration-500',
  }[duration];
  
  const transitionClass = {
    fade: 'transition-opacity',
    scale: 'transition-transform transition-opacity transform',
    'slide-up': 'transition-transform transition-opacity transform',
    'slide-down': 'transition-transform transition-opacity transform',
  }[type];
  
  const hiddenClass = {
    fade: 'opacity-0',
    scale: 'opacity-0 scale-95',
    'slide-up': 'opacity-0 translate-y-4',
    'slide-down': 'opacity-0 -translate-y-4',
  }[type];
  
  const visibleClass = {
    fade: 'opacity-100',
    scale: 'opacity-100 scale-100',
    'slide-up': 'opacity-100 translate-y-0',
    'slide-down': 'opacity-100 translate-y-0',
  }[type];
  
  const styles = {
    transitionDelay: `${delay}ms`,
  };
  
  return (
    <div
      className={cn(
        transitionClass,
        durationClass,
        'ease-out',
        show ? visibleClass : hiddenClass,
        className
      )}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
}

function getDurationValue(duration: 'fast' | 'normal' | 'slow'): number {
  const values = {
    fast: 200,
    normal: 300,
    slow: 500,
  };
  return values[duration];
}

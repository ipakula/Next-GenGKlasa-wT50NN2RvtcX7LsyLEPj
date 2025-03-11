
import React from 'react';
import { Transition } from '@/components/ui/transition';
import { WaitlistForm } from './WaitlistForm';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-4 max-w-7xl mx-auto min-h-[calc(100vh-5rem)] flex flex-col justify-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[30%] w-[80%] h-[80%] rounded-full bg-primary/5 animate-spin-slow" />
        <div className="absolute -bottom-[40%] -left-[30%] w-[80%] h-[80%] rounded-full bg-accent/5 animate-spin-slow" />
      </div>
      
      <div className="max-w-3xl mx-auto text-center space-y-8">
        <Transition type="slide-down" delay={100}>
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Now in private beta
          </span>
        </Transition>
        
        <Transition type="slide-down" delay={200}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Automate your business with <span className="text-primary">AI-powered workflows</span>
          </h1>
        </Transition>
        
        <Transition type="slide-down" delay={300}>
          <p className="text-lg md:text-xl text-muted-foreground">
            Deploy scalable business projects without manual intervention. Let AI agents handle your email campaigns, blog content, and lead generation.
          </p>
        </Transition>
        
        <Transition type="slide-up" delay={400}>
          <WaitlistForm />
        </Transition>
        
        <Transition type="fade" delay={600}>
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Trusted by innovative teams</p>
            <div className="flex flex-wrap justify-center gap-8 opacity-70">
              {['Company 1', 'Company 2', 'Company 3', 'Company 4'].map((company) => (
                <div key={company} className="text-lg font-semibold">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </Transition>
      </div>
    </section>
  );
}

export default HeroSection;

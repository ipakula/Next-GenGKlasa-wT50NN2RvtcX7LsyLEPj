import React from "react";
import  Navbar  from "@/components/layout/Navbar";
import  HeroSection  from "@/components/landing/HeroSection";
import  FeaturesSection  from "@/components/landing/FeaturesSection";
import  HowItWorksSection  from "@/components/landing/HowItWorksSection";
import  PricingSection  from "@/components/landing/PricingSection";
import  FAQSection  from "@/components/landing/FAQSection";
import  CTASection  from "@/components/landing/CTASection";

import  Footer  from "@/components/layout/Footer";
import  PageTransition  from "@/components/layout/PageTransition";

export default function LandingPage() {
  return (
    <PageTransition>
      <div className="relative min-h-screen flex flex-col">
        {/* Globalne dekoracyjne tło */}
        <div className="absolute inset-0 h-full w-full -z-50 overflow-hidden">
          <div className="absolute -top-[30%] -right-[25%] w-[70%] h-[70%] rounded-full bg-primary/5 animate-spin-slow" />
          <div className="absolute -bottom-[30%] -left-[25%] w-[70%] h-[70%] rounded-full bg-accent/5 animate-spin-slow" />
          <div className="absolute -top-[10%] -left-[25%] w-[50%] h-[50%] rounded-full bg-primary/5 animate-spin-slow" />
          <div className="absolute -bottom-[30%] -right-[25%] w-[45%] h-[45%] rounded-full bg-accent/5 animate-spin-slow" />

        </div>

        {/* Zawartość strony */}
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <PricingSection />
          <FAQSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

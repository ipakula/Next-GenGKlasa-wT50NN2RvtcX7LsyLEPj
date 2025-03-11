import React from "react";
import { motion } from "framer-motion";
import { Transition } from "@/components/ui/transition";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

export default function PricingSection() {
  return (
    <section className="relative py-24 px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center space-y-10"
      >
        <Transition type="slide-down" delay={100}>
          <h2 className="text-4xl font-bold tracking-tight">
            Next-Gen G Klasa Pricing
          </h2>
        </Transition>
        <Transition type="fade" delay={200}>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Empower your grassroots football club with our comprehensive pricing plans.
          </p>
        </Transition>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-muted/20 border border-muted-foreground/20 shadow-md p-6 rounded-xl">
            <CardHeader className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-primary" />
            </CardHeader>
            <CardContent className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Affordable Plans</h3>
              <p className="text-muted-foreground">
                Choose from our flexible pricing options.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
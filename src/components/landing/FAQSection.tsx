import React from 'react';
import { motion } from 'framer-motion';
import { Transition } from '@/components/ui/transition';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function FAQSection() {
  return (
    <section className='relative py-24 px-6 lg:px-12'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className='max-w-5xl mx-auto text-center space-y-10'
      >
        <Transition type='slide-down' delay={100}>
          <h2 className='text-4xl font-bold tracking-tight'>Next-Gen G Klasa FAQs</h2>
        </Transition>
        <Transition type='fade' delay={200}>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>Explore the frequently asked questions about Next-Gen G Klasa.</p>
        </Transition>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <Card className='bg-muted/20 border border-muted-foreground/20 shadow-md p-6 rounded-xl'>
            <CardHeader className='flex items-center justify-center'>
              <CheckCircle className='h-12 w-12 text-primary' />
            </CardHeader>
            <CardContent className='text-center space-y-2'>
              <h3 className='text-lg font-semibold'>Comprehensive League Management</h3>
              <p className='text-muted-foreground'>Manage teams, matches, player stats, and engage fans easily.</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
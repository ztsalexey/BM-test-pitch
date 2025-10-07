'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solution from './components/Solution';
import LiveDemo from './components/LiveDemo';
import UseCases from './components/UseCases';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <LiveDemo />
      <UseCases />
      <Pricing />
      <CTA />
    </main>
  );
}

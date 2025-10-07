'use client';

import AnimatedBackground from './components/AnimatedBackground';
import Hero from './components/Hero';
import SpotTheFake from './components/SpotTheFake';
import Solution from './components/Solution';
import LiveDemo from './components/LiveDemo';
import UseCasesSpinner from './components/UseCasesSpinner';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <div className="relative z-10">
        <Hero />
        <SpotTheFake />
        <Solution />
        <LiveDemo />
        <UseCasesSpinner />
        <Pricing />
        <CTA />
      </div>
    </main>
  );
}

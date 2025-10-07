'use client';

import Hero from './components/Hero';
import SpotTheFake from './components/SpotTheFake';
import Solution from './components/Solution';
import LiveDemo from './components/LiveDemo';
import UseCases from './components/UseCases';
import Pricing from './components/Pricing';
import CTA from './components/CTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SpotTheFake />
      <Solution />
      <LiveDemo />
      <UseCases />
      <Pricing />
      <CTA />
    </main>
  );
}

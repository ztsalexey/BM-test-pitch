'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const tiers = [
    { name: 'Public API', icon: '🌐', href: 'https://app.bitmind.ai' },
    { name: 'Enterprise', icon: '🏢', href: 'https://bitmind.ai', highlighted: true },
    { name: 'Custom', icon: '⚙️', href: 'https://bitmind.ai' },
    { name: 'Mega Custom', icon: '🚀', href: 'https://bitmind.ai' },
  ];

  return (
    <section
      id="pricing"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Choose Your <span className="gradient-text">Scale</span>
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            From API access to dedicated infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tiers.map((tier, i) => (
            <motion.a
              key={i}
              href={tier.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`glass rounded-2xl p-8 border-2 transition-all duration-300 cursor-pointer group card-hover ${
                tier.highlighted
                  ? 'border-bitmind-accent glow'
                  : 'border-white/10 hover:border-bitmind-accent/50'
              }`}
            >
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {tier.icon}
              </div>
              <h3 className="text-2xl font-bold gradient-text">{tier.name}</h3>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://bitmind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitmind-accent hover:underline font-semibold text-lg"
          >
            Contact us to find the right plan →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

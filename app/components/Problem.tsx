'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Problem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { number: '$200M+', label: 'Lost to deepfakes in Q1 2025' },
    { number: '500%', label: 'Surge in deepfake scams' },
    { number: '8M', label: 'Deepfakes online right now' },
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-bitmind-gray">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Deepfakes are <span className="gradient-text">everywhere.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            From CEO fraud to social media scams. Your business is at risk.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-bitmind-dark/50 border border-white/10 rounded-2xl p-8 text-center hover:border-bitmind-accent/50 transition-all duration-300"
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                {stat.number}
              </div>
              <div className="text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Real Examples - Simple */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-bitmind-dark/30 border border-red-500/30 rounded-2xl p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-red-400">Real Incidents</h3>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-red-500 mr-3 text-xl">•</span>
              <span><strong>$25M stolen</strong> from UK firm via deepfake video call</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 text-xl">•</span>
              <span><strong>1,740% increase</strong> in deepfake fraud in North America</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-3 text-xl">•</span>
              <span><strong>30 seconds of audio</strong> is all scammers need to clone your CEO</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

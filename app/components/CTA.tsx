'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const resources = [
    { name: 'BitMind.ai', url: 'https://bitmind.ai', icon: '🌐', desc: 'Main Website' },
    { name: 'Live Platform', url: 'https://app.bitmind.ai', icon: '🎯', desc: 'Try Detection' },
    { name: 'TheDetector.ai', url: 'https://thedetector.ai', icon: '🔍', desc: 'Web App' },
    { name: 'Documentation', url: 'https://docs.bitmind.ai', icon: '📚', desc: 'API Docs' },
    { name: 'Mobile App iOS', url: 'https://apps.apple.com/us/app/ai-or-not-ai-detection/id6742792714', icon: '📱', desc: 'App Store' },
    { name: 'Mobile App Android', url: 'https://play.google.com/store/apps/details?id=ai.bitmind.game', icon: '🤖', desc: 'Play Store' },
    { name: 'GitHub', url: 'https://github.com/BitMind-AI', icon: '💻', desc: 'Open Source' },
    { name: 'Twitter', url: 'https://x.com/BitMindLabs', icon: '🐦', desc: '@BitMindLabs' },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Background effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-bitmind-dark via-bitmind-accent/5 to-bitmind-dark" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Stop Deepfakes.
            <br />
            <span className="gradient-text">Start Now.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto">
            Explore all BitMind resources and get started.
          </p>

          {/* Resource Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {resources.map((resource, i) => (
              <motion.a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="bg-bitmind-gray border border-white/10 rounded-2xl p-6 hover:border-bitmind-accent/50 transition-all duration-300 hover:glow group"
              >
                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                  {resource.icon}
                </div>
                <h3 className="text-lg font-bold mb-1">{resource.name}</h3>
                <p className="text-sm text-gray-500">{resource.desc}</p>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-gray-600 text-sm border-t border-white/10 pt-12"
        >
          <p className="text-lg mb-2">© 2025 BitMind. Building the future of trustworthy AI.</p>
          <p className="text-gray-500">Powered by Bittensor Subnet 34 • EU Hosted • Zero Data Retention</p>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Solution() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: '◉',
      title: '88% Accuracy',
      description: 'vs 69% industry standard',
    },
    {
      icon: '⚡',
      title: 'Real-Time',
      description: '<100ms detection for images',
    },
    {
      icon: '◈',
      title: 'Zero Retention',
      description: 'GDPR compliant, no data stored',
    },
    {
      icon: '◐',
      title: 'Images + Videos',
      description: 'Detect across all media types',
    },
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Meet <span className="gradient-text">BitMind</span>
          </h2>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            State-of-the-art deepfake detection, powered by decentralized AI.
          </p>
        </motion.div>

        {/* Features Grid - Premium glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white/90">{feature.title}</h3>
              <p className="text-white/50 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* How it Works - Clean 3 steps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-white/90">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Upload', desc: 'Send image or video via API' },
              { step: '2', title: 'Analyze', desc: 'AI models detect manipulation' },
              { step: '3', title: 'Results', desc: 'Get confidence score instantly' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-bitmind-accent/10 border-2 border-bitmind-accent flex items-center justify-center text-2xl font-bold mx-auto mb-4 backdrop-blur-xl">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold mb-2 text-white/90">{item.title}</h4>
                <p className="text-white/50">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Badge - Premium pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/40 mb-4 text-sm">Powered by Bittensor decentralized AI network</p>
          <div className="flex gap-4 justify-center items-center text-sm flex-wrap">
            <span className="glass px-6 py-2 rounded-full">SOC2 Compliant</span>
            <span className="glass px-6 py-2 rounded-full">GDPR Ready</span>
            <span className="glass px-6 py-2 rounded-full">EU Hosted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function UseCases() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Use case keywords with positioning and sizes
  const words = [
    // Core detection
    { text: 'Deepfake Detection', size: 32, x: 0, y: 0, category: 'core' },
    { text: 'Video Verification', size: 24, x: -200, y: -100, category: 'core' },
    { text: 'Image Analysis', size: 24, x: 200, y: -120, category: 'core' },

    // Finance & Security
    { text: 'KYC Verification', size: 20, x: -280, y: 40, category: 'finance' },
    { text: 'Fraud Prevention', size: 22, x: 260, y: 60, category: 'finance' },
    { text: 'Identity Verification', size: 18, x: -150, y: 140, category: 'finance' },
    { text: 'Wire Transfer Protection', size: 16, x: 180, y: 150, category: 'finance' },
    { text: 'CEO Fraud Defense', size: 18, x: -240, y: -180, category: 'finance' },

    // Social & Content
    { text: 'Content Moderation', size: 20, x: 280, y: -60, category: 'social' },
    { text: 'UGC Verification', size: 18, x: -100, y: -220, category: 'social' },
    { text: 'Scam Detection', size: 19, x: 120, y: -200, category: 'social' },
    { text: 'Trust & Safety', size: 17, x: 320, y: 120, category: 'social' },

    // Media & News
    { text: 'Source Verification', size: 19, x: -320, y: 120, category: 'media' },
    { text: 'Fact Checking', size: 18, x: 100, y: 220, category: 'media' },
    { text: 'News Integrity', size: 17, x: -180, y: 200, category: 'media' },

    // Enterprise
    { text: 'Video Call Auth', size: 18, x: -60, y: 240, category: 'enterprise' },
    { text: 'Compliance', size: 19, x: 240, y: -180, category: 'enterprise' },
    { text: 'Remote Hiring', size: 16, x: -340, y: -40, category: 'enterprise' },
    { text: 'Insider Threat', size: 16, x: 340, y: -20, category: 'enterprise' },

    // Tech
    { text: 'API Integration', size: 17, x: 60, y: -260, category: 'tech' },
    { text: 'Batch Processing', size: 16, x: -240, y: 180, category: 'tech' },
    { text: 'Real-time Detection', size: 18, x: 220, y: 200, category: 'tech' },
    { text: 'Similarity Score', size: 17, x: -120, y: -280, category: 'tech' },
  ];

  const categoryColors = {
    core: '#00FF88',
    finance: '#FFD700',
    social: '#FF6B9D',
    media: '#00D4FF',
    enterprise: '#A78BFA',
    tech: '#FFA500',
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Built for <span className="gradient-text">Everything</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            One API, infinite use cases.
          </p>
        </motion.div>

        {/* Interactive Word Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[600px] flex items-center justify-center overflow-hidden"
        >
          {/* Center glow effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-bitmind-accent/5 rounded-full blur-3xl" />
          </div>

          {/* Word cloud */}
          <div className="relative w-full h-full flex items-center justify-center">
            {words.map((word, i) => {
              const delay = i * 0.05;
              const color = categoryColors[word.category as keyof typeof categoryColors];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: hoveredWord && hoveredWord !== word.text ? 0.3 : 1,
                    scale: hoveredWord === word.text ? 1.2 : 1
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay,
                    scale: { duration: 0.2 }
                  }}
                  className="absolute cursor-pointer transition-all duration-200"
                  style={{
                    left: `calc(50% + ${word.x * 0.8}px)`,
                    top: `calc(50% + ${word.y * 0.8}px)`,
                    fontSize: `${word.size}px`,
                    color: hoveredWord === word.text ? color : '#fff',
                    textShadow: hoveredWord === word.text
                      ? `0 0 20px ${color}`
                      : '0 0 10px rgba(0,255,136,0.3)',
                    fontWeight: word.category === 'core' ? 'bold' : 'normal',
                  }}
                  onMouseEnter={() => setHoveredWord(word.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word.text}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-12"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-gray-500 capitalize">{category}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-400 mb-6">And many more...</p>
          <a
            href="https://docs.bitmind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitmind-accent hover:underline font-semibold"
          >
            Explore All Use Cases →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

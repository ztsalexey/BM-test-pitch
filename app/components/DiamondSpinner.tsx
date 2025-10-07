'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Simple auto-rotation
  useEffect(() => {
    if (!isInView) return;

    let lastTime = Date.now();
    let rafId: number;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setRotation(prev => ({
        x: prev.x + (8 * delta),
        y: prev.y + (12 * delta),
      }));

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  // Simplified use cases - cleaner layout
  const words = [
    // Center
    { text: 'Deepfake Detection', size: 32, x: 0, y: 0, z: 0, category: 'core' },

    // Inner ring
    { text: 'KYC Verification', size: 22, x: -140, y: -70, z: 40, category: 'finance' },
    { text: 'Content Moderation', size: 22, x: 140, y: -70, z: 40, category: 'social' },
    { text: 'Fraud Prevention', size: 22, x: 0, y: 100, z: 40, category: 'finance' },
    { text: 'Identity Verification', size: 20, x: 0, y: -130, z: 40, category: 'finance' },

    // Middle ring
    { text: 'Video Verification', size: 24, x: -180, y: 50, z: -20, category: 'tech' },
    { text: 'Image Analysis', size: 24, x: 180, y: 50, z: -20, category: 'tech' },
    { text: 'Real-time Detection', size: 19, x: -170, y: -130, z: -20, category: 'tech' },
    { text: 'Trust & Safety', size: 19, x: 170, y: -130, z: -20, category: 'social' },

    // Outer ring
    { text: 'CEO Fraud Defense', size: 18, x: -250, y: -30, z: -80, category: 'finance' },
    { text: 'Wire Transfer Protection', size: 16, x: 250, y: -30, z: -80, category: 'finance' },
    { text: 'UGC Verification', size: 18, x: -220, y: 100, z: -80, category: 'social' },
    { text: 'Compliance', size: 18, x: 220, y: 100, z: -80, category: 'enterprise' },
    { text: 'Source Verification', size: 18, x: 0, y: -200, z: -80, category: 'media' },
    { text: 'API Integration', size: 16, x: 0, y: 200, z: -80, category: 'tech' },
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
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            One API, <span className="gradient-text">Infinite Use Cases</span>
          </h2>
          <div className="h-[32px] w-full max-w-3xl mx-auto flex items-center justify-center mb-2">
            <p className="text-xl text-white/60 absolute">
              {hoveredWord ? (
                <span className="gradient-text font-semibold">
                  {hoveredWord}
                </span>
              ) : (
                'Interactive 3D sphere · Hover to explore'
              )}
            </p>
          </div>
          <div className="h-[20px] flex items-center justify-center">
            {!hoveredWord && (
              <p className="text-sm text-white/40">
                Auto-rotating
              </p>
            )}
          </div>
        </motion.div>

        {/* Simplified 3D Word Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-[700px] flex items-center justify-center overflow-visible"
          style={{ perspective: '1200px' }}
        >
          {/* Single center glow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[400px] h-[400px] bg-bitmind-accent rounded-full blur-3xl"
            />
          </div>

          {/* Word cloud with 3D transform */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s linear',
              willChange: 'transform',
            }}
          >
            {words.map((word, i) => {
              const delay = i * 0.04;
              const color = categoryColors[word.category as keyof typeof categoryColors];
              const scale = 1 + word.z / 400;

              const isHovered = hoveredWord === word.text;
              const isFaded = hoveredWord && !isHovered;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: isFaded ? 0.2 : (0.7 + word.z / 200),
                    scale: scale,
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay,
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute cursor-pointer whitespace-nowrap select-none pointer-events-auto"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translateZ(${word.z}px) translate(-50%, -50%)`,
                    fontSize: `${word.size * scale}px`,
                    color: isHovered ? color : word.category === 'core' ? '#fff' : '#e0e0e0',
                    textShadow: isHovered
                      ? `0 0 60px ${color}, 0 0 100px ${color}99, 0 6px 30px ${color}77`
                      : word.category === 'core'
                      ? `0 0 30px rgba(0,255,136,0.5), 0 0 60px rgba(0,255,136,0.2)`
                      : `0 0 20px rgba(0,255,136,0.2)`,
                    fontWeight: word.category === 'core' ? 'bold' : '500',
                    zIndex: isHovered ? 999 : Math.round(word.z + 100),
                    letterSpacing: word.category === 'core' ? '0.02em' : 'normal',
                    filter: isHovered ? 'blur(0px) brightness(1.2)' : `blur(${Math.max(0, -word.z / 150)}px)`,
                    transition: 'color 0.15s ease-out, text-shadow 0.15s ease-out, filter 0.15s ease-out',
                    padding: '4px 8px',
                  }}
                  onMouseEnter={() => setHoveredWord(word.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word.text}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent 10%, ${color} 50%, transparent 90%)`,
                        boxShadow: `0 0 10px ${color}`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
              />
              <span className="text-sm text-white/50 capitalize">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  // Gentle auto-rotation - stops on hover
  useEffect(() => {
    if (!isInView || hoveredWord) return;

    let rafId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setRotation(prev => prev + (12 * delta)); // 12 degrees per second

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, hoveredWord]);

  // Premium use cases - carefully positioned
  const words = [
    // Core center
    { text: 'Deepfake Detection', size: 34, x: 0, y: 0, z: 50, category: 'core' },

    // Inner ring - closer
    { text: 'KYC Verification', size: 22, x: -160, y: -80, z: 60, category: 'finance' },
    { text: 'Content Moderation', size: 22, x: 160, y: -80, z: 60, category: 'social' },
    { text: 'Identity Verification', size: 21, x: 0, y: -150, z: 60, category: 'finance' },
    { text: 'Fraud Prevention', size: 23, x: 0, y: 120, z: 60, category: 'finance' },

    // Middle ring
    { text: 'Video Verification', size: 24, x: -200, y: 40, z: 0, category: 'tech' },
    { text: 'Image Analysis', size: 24, x: 200, y: 40, z: 0, category: 'tech' },
    { text: 'Real-time Detection', size: 20, x: -180, y: -150, z: 0, category: 'tech' },
    { text: 'Trust & Safety', size: 20, x: 180, y: -150, z: 0, category: 'social' },
    { text: 'Media Authentication', size: 19, x: 0, y: 180, z: 0, category: 'media' },

    // Outer ring - further back
    { text: 'CEO Fraud Defense', size: 18, x: -260, y: -40, z: -60, category: 'finance' },
    { text: 'Compliance', size: 19, x: 260, y: -40, z: -60, category: 'enterprise' },
    { text: 'Wire Transfer Protection', size: 17, x: -240, y: 120, z: -60, category: 'finance' },
    { text: 'UGC Verification', size: 18, x: 240, y: 120, z: -60, category: 'social' },
    { text: 'Source Verification', size: 18, x: 0, y: -220, z: -60, category: 'media' },
    { text: 'API Integration', size: 17, x: 0, y: 220, z: -60, category: 'tech' },
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
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            One API, <span className="gradient-text">Infinite Use Cases</span>
          </h2>
          <div className="h-[32px] w-full max-w-3xl mx-auto flex items-center justify-center mb-3">
            <p className="text-xl text-white/70 absolute">
              {hoveredWord ? (
                <span className="gradient-text font-semibold">
                  {hoveredWord}
                </span>
              ) : (
                'Hover to explore · Auto-rotating 3D sphere'
              )}
            </p>
          </div>
        </motion.div>

        {/* Elegant 3D Word Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[700px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          {/* Elegant center glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[450px] h-[450px] bg-gradient-to-r from-bitmind-accent to-cyan-500 rounded-full blur-3xl"
            />
          </div>

          {/* Word cloud with gentle rotation */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: `rotateY(${rotation}deg)`,
              transformStyle: 'preserve-3d',
              willChange: 'transform',
            }}
            animate={{
              rotateY: rotation
            }}
            transition={{
              duration: 0.1,
              ease: "linear"
            }}
          >
            {words.map((word, i) => {
              const color = categoryColors[word.category as keyof typeof categoryColors];
              const scale = 1 + word.z / 300;

              const isHovered = hoveredWord === word.text;
              const isFaded = hoveredWord && !isHovered;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? {
                    opacity: isFaded ? 0.15 : (0.75 + word.z / 250),
                    scale: scale,
                  } : {}}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.05,
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute cursor-pointer whitespace-nowrap select-none"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translateZ(${word.z}px) translate(-50%, -50%)`,
                    fontSize: `${word.size * scale}px`,
                    color: isHovered ? color : word.category === 'core' ? '#ffffff' : '#e8e8e8',
                    textShadow: isHovered
                      ? `0 0 50px ${color}, 0 0 90px ${color}aa, 0 4px 25px ${color}66`
                      : word.category === 'core'
                      ? `0 0 25px rgba(0,255,136,0.4), 0 0 50px rgba(0,255,136,0.15)`
                      : `0 0 15px rgba(255,255,255,0.15)`,
                    fontWeight: word.category === 'core' ? '700' : '500',
                    zIndex: isHovered ? 1000 : Math.round(word.z + 150),
                    letterSpacing: word.category === 'core' ? '0.03em' : '0.01em',
                    filter: isHovered
                      ? 'blur(0px) brightness(1.15)'
                      : word.z < 0
                      ? `blur(${Math.abs(word.z) / 120}px) brightness(0.9)`
                      : 'blur(0px)',
                    transition: 'color 0.2s ease-out, text-shadow 0.2s ease-out, filter 0.2s ease-out',
                    padding: '6px 10px',
                    pointerEvents: 'auto',
                  }}
                  onMouseEnter={() => setHoveredWord(word.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word.text}
                  {/* Elegant underline on hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute -bottom-1 left-2 right-2 h-px rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        boxShadow: `0 0 12px ${color}`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Premium Category Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mt-12"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 glass px-4 py-2.5 rounded-full cursor-default"
              style={{
                backdropFilter: 'blur(12px)',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}`
                }}
              />
              <span className="text-xs text-white/60 capitalize font-medium tracking-wide">
                {category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

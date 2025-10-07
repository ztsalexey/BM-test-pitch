'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useMemo } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [sphereRotation, setSphereRotation] = useState(0);

  // Smooth sphere rotation
  useEffect(() => {
    if (!isInView) return;

    let rafId: number;
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      setSphereRotation(prev => prev + (12 * delta));

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView]);

  // Use cases positioned in clean 3D sphere layout
  const words = useMemo(() => [
    // Core center
    { text: 'Deepfake Detection', size: 32, x: 0, y: 0, z: 40, category: 'core' },

    // Inner ring
    { text: 'KYC Verification', size: 22, x: -140, y: -70, z: 50, category: 'finance' },
    { text: 'Content Moderation', size: 22, x: 140, y: -70, z: 50, category: 'social' },
    { text: 'Fraud Prevention', size: 22, x: 0, y: -130, z: 45, category: 'finance' },
    { text: 'Identity Verification', size: 21, x: 0, y: 110, z: 45, category: 'finance' },
    { text: 'Profile Verification', size: 20, x: -120, y: 90, z: 40, category: 'social' },
    { text: 'Video Verification', size: 20, x: 120, y: 90, z: 40, category: 'tech' },

    // Middle ring
    { text: 'Image Analysis', size: 21, x: 180, y: 0, z: 0, category: 'tech' },
    { text: 'Trust & Safety', size: 20, x: -180, y: 0, z: 0, category: 'social' },
    { text: 'Real-time Detection', size: 19, x: -160, y: -120, z: 5, category: 'tech' },
    { text: 'Media Authentication', size: 19, x: 160, y: -120, z: 5, category: 'media' },
    { text: 'Insurance Claims', size: 19, x: -160, y: 120, z: 5, category: 'finance' },
    { text: 'Dating App Safety', size: 19, x: 160, y: 120, z: 5, category: 'social' },
    { text: 'Customer Onboarding', size: 18, x: 0, y: 170, z: 0, category: 'enterprise' },
    { text: 'Account Takeover', size: 18, x: 0, y: -170, z: 0, category: 'finance' },

    // Outer ring
    { text: 'CEO Fraud Defense', size: 18, x: -220, y: -40, z: -50, category: 'finance' },
    { text: 'Compliance', size: 18, x: 220, y: -40, z: -50, category: 'enterprise' },
    { text: 'Wire Transfer Protection', size: 17, x: -200, y: 100, z: -55, category: 'finance' },
    { text: 'UGC Verification', size: 17, x: 200, y: 100, z: -55, category: 'social' },
    { text: 'Source Verification', size: 17, x: 0, y: -200, z: -60, category: 'media' },
    { text: 'API Integration', size: 17, x: 0, y: 200, z: -60, category: 'tech' },
    { text: 'Marketplace Trust', size: 17, x: -230, y: -140, z: -65, category: 'social' },
    { text: 'Legal Tech', size: 17, x: 230, y: -140, z: -65, category: 'enterprise' },
    { text: 'News Verification', size: 17, x: -230, y: 160, z: -65, category: 'media' },
    { text: 'Healthcare ID', size: 17, x: 230, y: 160, z: -65, category: 'enterprise' },
    { text: 'Digital Evidence', size: 17, x: -190, y: -100, z: -30, category: 'media' },
  ], []);

  const categoryColors = {
    core: '#00FF88',
    finance: '#FFD700',
    social: '#FF6B9D',
    media: '#00D4FF',
    enterprise: '#A78BFA',
    tech: '#FFA500',
  };

  // Generate ambient particles once
  const ambientParticles = useMemo(() =>
    Array.from({ length: 80 }).map((_, i) => {
      const angle = (i / 80) * Math.PI * 2;
      const radius = 200 + Math.random() * 150;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
      const y = Math.sin(angle) * radius + (Math.random() - 0.5) * 100;
      const size = 1.5 + Math.random() * 2.5;
      const opacity = 0.15 + Math.random() * 0.25;
      const duration = 5 + Math.random() * 5;
      const delay = i * 0.02;

      return { x, y, size, opacity, duration, delay };
    }), []
  );

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            One API, <span className="gradient-text">Infinite Use Cases</span>
          </h2>

          <div className="h-[32px] w-full max-w-3xl mx-auto flex items-center justify-center">
            <motion.p className="text-xl absolute">
              {hoveredWord ? (
                <span className="gradient-text font-semibold">
                  {hoveredWord}
                </span>
              ) : (
                <span className="text-white/60">
                  Hover to explore
                </span>
              )}
            </motion.p>
          </div>
        </motion.div>

        {/* Clean 3D Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[700px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          {/* Background effects */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Ambient particle cloud */}
            <div className="absolute w-[600px] h-[600px]">
              {ambientParticles.map((particle, i) => (
                <motion.div
                  key={`ambient-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: [particle.opacity * 0.6, particle.opacity, particle.opacity * 0.6],
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut"
                  }}
                  className="absolute rounded-full bg-bitmind-accent"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    transform: `translate(${particle.x}px, ${particle.y}px)`,
                    boxShadow: `0 0 ${particle.size * 4}px rgba(0, 255, 136, ${particle.opacity * 0.5})`,
                  }}
                />
              ))}
            </div>

            {/* Rotating wireframe sphere */}
            <motion.div
              className="absolute w-[550px] h-[550px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${sphereRotation}deg) rotateX(15deg)`,
              }}
            >
              {/* Sphere particles */}
              {Array.from({ length: 100 }).map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 100);
                const theta = Math.sqrt(100 * Math.PI) * phi;
                const radius = 275;
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);
                const zOpacity = 0.2 + (z / radius) * 0.3;

                return (
                  <motion.div
                    key={`sphere-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: zOpacity, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: i * 0.006 }}
                    className="absolute w-1.5 h-1.5 rounded-full bg-bitmind-accent"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                      boxShadow: `0 0 ${6 + zOpacity * 8}px rgba(0, 255, 136, ${zOpacity * 0.8})`,
                    }}
                  />
                );
              })}

              {/* Orbital rings */}
              {[0, 60, 120].map((angle) => (
                <motion.div
                  key={`ring-${angle}`}
                  className="absolute inset-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateZ(${angle}deg)`,
                  }}
                >
                  {Array.from({ length: 40 }).map((_, i) => {
                    const a = (i / 40) * Math.PI * 2;
                    const r = 275;
                    const x = r * Math.cos(a);
                    const y = r * Math.sin(a);

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.15 } : {}}
                        transition={{ duration: 1, delay: i * 0.01 }}
                        className="absolute w-0.5 h-0.5 rounded-full bg-cyan-400"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate3d(${x}px, ${y}px, 0px)`,
                          boxShadow: '0 0 4px rgba(0, 212, 255, 0.4)',
                        }}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>

            {/* Center glow */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.12, 0.2, 0.12],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[400px] h-[400px] bg-gradient-to-r from-bitmind-accent/30 to-cyan-500/30 rounded-full blur-3xl"
            />
          </div>

          {/* Static interactive use cases */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {words.map((word, i) => {
              const color = categoryColors[word.category as keyof typeof categoryColors];
              const depthScale = 1 + word.z / 350;
              const isHovered = hoveredWord === word.text;
              const isFaded = hoveredWord && !isHovered;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{
                    opacity: isFaded ? 0.15 : (0.8 + word.z / 280),
                    scale: isHovered ? depthScale * 1.1 : depthScale,
                  }}
                  transition={{
                    duration: 0.8,
                    delay: isInView ? i * 0.04 : 0,
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.25, ease: "easeOut" }
                  }}
                  className="absolute cursor-pointer whitespace-nowrap select-none"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translateZ(${word.z}px) translate(-50%, -50%)`,
                    fontSize: `${word.size * depthScale}px`,
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

                  {/* Hover underline */}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
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

        {/* Category Legend */}
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
              className="flex items-center gap-2 px-4 py-2.5 rounded-full cursor-default"
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

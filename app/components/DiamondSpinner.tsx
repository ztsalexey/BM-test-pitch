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

  // Premium use cases with better 3D distribution
  const words = useMemo(() => [
    // Core center - hero use case
    { text: 'Deepfake Detection', size: 38, x: 0, y: 0, z: 80, category: 'core' },

    // Inner sphere - critical use cases
    { text: 'KYC Verification', size: 24, x: -180, y: -90, z: 100, category: 'finance' },
    { text: 'Content Moderation', size: 24, x: 180, y: -90, z: 100, category: 'social' },
    { text: 'Identity Verification', size: 23, x: 0, y: -170, z: 90, category: 'finance' },
    { text: 'Fraud Prevention', size: 25, x: 0, y: 140, z: 110, category: 'finance' },
    { text: 'Profile Verification', size: 22, x: 160, y: 110, z: 85, category: 'social' },
    { text: 'Video Verification', size: 24, x: -190, y: 50, z: 70, category: 'tech' },

    // Middle sphere - important use cases
    { text: 'Image Analysis', size: 23, x: 220, y: 50, z: 20, category: 'tech' },
    { text: 'Real-time Detection', size: 21, x: -200, y: -160, z: 30, category: 'tech' },
    { text: 'Trust & Safety', size: 21, x: 200, y: -160, z: 20, category: 'social' },
    { text: 'Media Authentication', size: 20, x: 0, y: 200, z: 40, category: 'media' },
    { text: 'Insurance Claims', size: 20, x: 240, y: -110, z: 10, category: 'finance' },
    { text: 'Dating App Safety', size: 20, x: -210, y: 150, z: 25, category: 'social' },
    { text: 'Customer Onboarding', size: 20, x: 210, y: 150, z: 15, category: 'enterprise' },
    { text: 'Account Takeover Prevention', size: 19, x: -150, y: 120, z: 50, category: 'finance' },

    // Outer sphere - extended use cases
    { text: 'CEO Fraud Defense', size: 19, x: -280, y: -50, z: -40, category: 'finance' },
    { text: 'Compliance', size: 20, x: 280, y: -50, z: -50, category: 'enterprise' },
    { text: 'Wire Transfer Protection', size: 18, x: -260, y: 130, z: -60, category: 'finance' },
    { text: 'UGC Verification', size: 19, x: 260, y: 130, z: -45, category: 'social' },
    { text: 'Source Verification', size: 19, x: 0, y: -240, z: -55, category: 'media' },
    { text: 'API Integration', size: 18, x: 0, y: 240, z: -65, category: 'tech' },
    { text: 'Marketplace Trust', size: 18, x: -290, y: -170, z: -70, category: 'social' },
    { text: 'Legal Tech', size: 19, x: 290, y: -170, z: -60, category: 'enterprise' },
    { text: 'News Verification', size: 18, x: -270, y: 200, z: -75, category: 'media' },
    { text: 'Healthcare ID', size: 18, x: 270, y: 200, z: -70, category: 'enterprise' },
    { text: 'Digital Evidence', size: 17, x: -230, y: -120, z: -35, category: 'media' },
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
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-24 bg-black relative overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(0, 255, 136, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="px-6 py-2 rounded-full border border-bitmind-accent/30 bg-bitmind-accent/5 backdrop-blur-sm">
              <span className="text-sm font-medium text-bitmind-accent tracking-wide">VERSATILE INTEGRATION</span>
            </div>
          </motion.div>

          <h2 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight leading-tight">
            One API,<br />
            <span className="gradient-text">Infinite Use Cases</span>
          </h2>

          <div className="h-[36px] w-full max-w-4xl mx-auto flex items-center justify-center">
            <motion.p
              className="text-2xl absolute"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {hoveredWord ? (
                <span className="gradient-text font-bold tracking-wide">
                  {hoveredWord}
                </span>
              ) : (
                <span className="text-white/50 font-light">
                  Explore our solutions
                </span>
              )}
            </motion.p>
          </div>
        </motion.div>

        {/* Premium 3D Sphere Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[800px] flex items-center justify-center"
          style={{ perspective: '1600px' }}
        >
          {/* Layered particle effects */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Volumetric ambient particles */}
            <div className="absolute w-[700px] h-[700px]">
              {ambientParticles.map((particle, i) => (
                <motion.div
                  key={`ambient-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: [particle.opacity, particle.opacity * 1.6, particle.opacity],
                    scale: [1, 1.3, 1],
                  } : {}}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut"
                  }}
                  className="absolute rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    transform: `translate(${particle.x}px, ${particle.y}px)`,
                    background: `radial-gradient(circle, rgba(0, 255, 136, 0.8) 0%, rgba(0, 212, 255, 0.4) 100%)`,
                    boxShadow: `0 0 ${particle.size * 6}px rgba(0, 255, 136, ${particle.opacity * 0.8})`,
                  }}
                />
              ))}
            </div>

            {/* Rotating 3D wireframe sphere */}
            <motion.div
              className="absolute w-[600px] h-[600px]"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${sphereRotation}deg) rotateX(20deg)`,
              }}
            >
              {/* Main sphere particles */}
              {Array.from({ length: 120 }).map((_, i) => {
                const phi = Math.acos(-1 + (2 * i) / 120);
                const theta = Math.sqrt(120 * Math.PI) * phi;
                const radius = 300;
                const x = radius * Math.cos(theta) * Math.sin(phi);
                const y = radius * Math.sin(theta) * Math.sin(phi);
                const z = radius * Math.cos(phi);
                const zOpacity = 0.25 + (z / radius) * 0.35;

                return (
                  <motion.div
                    key={`sphere-${i}`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: zOpacity, scale: 1 } : {}}
                    transition={{ duration: 1.5, delay: i * 0.006 }}
                    className="absolute w-2 h-2 rounded-full bg-bitmind-accent"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                      boxShadow: `0 0 ${8 + zOpacity * 12}px rgba(0, 255, 136, ${zOpacity})`,
                    }}
                  />
                );
              })}

              {/* Elegant orbital rings */}
              {[0, 45, 90].map((angle) => (
                <motion.div
                  key={`ring-${angle}`}
                  className="absolute inset-0"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: `rotateZ(${angle}deg) rotateX(15deg)`,
                  }}
                >
                  {Array.from({ length: 50 }).map((_, i) => {
                    const a = (i / 50) * Math.PI * 2;
                    const r = 300;
                    const x = r * Math.cos(a);
                    const y = r * Math.sin(a);

                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.2 } : {}}
                        transition={{ duration: 1.2, delay: i * 0.008 }}
                        className="absolute w-1 h-1 rounded-full bg-cyan-400"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: `translate3d(${x}px, ${y}px, 0px)`,
                          boxShadow: '0 0 6px rgba(0, 212, 255, 0.5)',
                        }}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </motion.div>

            {/* Subtle center energy core */}
            <motion.div
              animate={{
                scale: [1, 1.12, 1],
                opacity: [0.08, 0.15, 0.08],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="w-[400px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(0, 255, 136, 0.2) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />
          </div>

          {/* Static interactive use cases */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {words.map((word, i) => {
              const color = categoryColors[word.category as keyof typeof categoryColors];
              const depthScale = 1 + word.z / 400;
              const isHovered = hoveredWord === word.text;
              const isFaded = hoveredWord && !isHovered;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{
                    opacity: isFaded ? 0.12 : (0.85 + word.z / 300),
                    scale: isHovered ? depthScale * 1.12 : depthScale,
                  }}
                  transition={{
                    duration: 0.9,
                    delay: isInView ? i * 0.04 : 0,
                    opacity: { duration: 0.25 },
                    scale: { duration: 0.3, ease: "easeOut" }
                  }}
                  className="absolute cursor-pointer whitespace-nowrap select-none group"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translateZ(${word.z}px) translate(-50%, -50%)`,
                    fontSize: `${word.size * depthScale}px`,
                    color: isHovered ? color : word.category === 'core' ? '#ffffff' : '#f0f0f0',
                    textShadow: isHovered
                      ? `0 0 60px ${color}, 0 0 100px ${color}bb, 0 6px 30px ${color}77`
                      : word.category === 'core'
                      ? `0 0 30px rgba(0,255,136,0.5), 0 0 60px rgba(0,255,136,0.2)`
                      : `0 0 20px rgba(255,255,255,0.2)`,
                    fontWeight: word.category === 'core' ? '800' : '600',
                    zIndex: isHovered ? 1000 : Math.round(word.z + 200),
                    letterSpacing: word.category === 'core' ? '0.04em' : '0.02em',
                    filter: isHovered
                      ? 'blur(0px) brightness(1.2)'
                      : word.z < 0
                      ? `blur(${Math.abs(word.z) / 100}px) brightness(0.85)`
                      : 'blur(0px)',
                    transition: 'color 0.25s ease-out, text-shadow 0.25s ease-out, filter 0.25s ease-out',
                    padding: '8px 12px',
                    pointerEvents: 'auto',
                  }}
                  onMouseEnter={() => setHoveredWord(word.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {word.text}

                  {/* Enhanced hover underline */}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="absolute -bottom-1 left-3 right-3 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        boxShadow: `0 0 16px ${color}, 0 2px 8px ${color}88`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Refined Category Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-16"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.08, y: -2 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 px-5 py-3 rounded-full cursor-default"
              style={{
                backdropFilter: 'blur(16px)',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <motion.div
                animate={{
                  boxShadow: [`0 0 8px ${color}`, `0 0 16px ${color}`, `0 0 8px ${color}`],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm text-white/70 capitalize font-semibold tracking-wider">
                {category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

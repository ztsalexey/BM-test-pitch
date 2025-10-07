'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function UseCases() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let rafId: number;
    let lastMouseUpdate = 0;
    const throttleMs = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseUpdate < throttleMs) return;
      lastMouseUpdate = now;

      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceFromCenter = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );

        // Only control if mouse is reasonably close to sphere
        if (distanceFromCenter < 400) {
          const newX = ((e.clientX - rect.left) / rect.width - 0.5) * 25;
          const newY = ((e.clientY - rect.top) / rect.height - 0.5) * 25;

          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            setMousePos({ x: newX, y: newY });
            setAutoRotate(false);
          });
        }
      }
    };

    const handleMouseLeave = () => {
      setAutoRotate(true);
      setMousePos({ x: 0, y: 0 });
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mouseleave', handleMouseLeave);
      currentRef.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (currentRef) {
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
        currentRef.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  // Smooth auto-rotation when not hovering
  useEffect(() => {
    if (!autoRotate || !isInView) return;

    let lastTime = Date.now();
    let rafId: number;

    const animate = () => {
      const now = Date.now();
      const delta = (now - lastTime) / 1000; // Convert to seconds
      lastTime = now;

      setRotation(prev => ({
        x: prev.x + (10 * delta), // 10 degrees per second
        y: prev.y + (15 * delta), // 15 degrees per second
      }));

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [autoRotate, isInView]);

  // Generate orbital particles
  const generateOrbitalParticles = (count: number, radius: number, color: string) => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: i * 0.05,
        color,
      };
    });
  };

  const orbitalRings = [
    { particles: generateOrbitalParticles(16, 280, '#00FF88'), speed: 30 },
    { particles: generateOrbitalParticles(12, 350, '#00D4FF'), speed: 40 },
    { particles: generateOrbitalParticles(8, 420, '#A78BFA'), speed: 50 },
  ];

  // Use case keywords arranged in 3D sphere
  const words = [
    // Center core
    { text: 'Deepfake Detection', size: 36, x: 0, y: 0, z: 0, category: 'core' },

    // Inner ring
    { text: 'KYC Verification', size: 24, x: -150, y: -80, z: 50, category: 'finance' },
    { text: 'Content Moderation', size: 24, x: 150, y: -80, z: 50, category: 'social' },
    { text: 'Fraud Prevention', size: 26, x: 0, y: 120, z: 50, category: 'finance' },
    { text: 'Identity Verification', size: 22, x: 0, y: -140, z: 50, category: 'finance' },

    // Middle ring
    { text: 'Video Verification', size: 28, x: -200, y: 60, z: -30, category: 'core' },
    { text: 'Image Analysis', size: 28, x: 200, y: 60, z: -30, category: 'core' },
    { text: 'Similarity Score', size: 20, x: -180, y: -140, z: -30, category: 'tech' },
    { text: 'Real-time Detection', size: 21, x: 180, y: -140, z: -30, category: 'tech' },

    // Outer ring
    { text: 'CEO Fraud Defense', size: 19, x: -280, y: -40, z: -80, category: 'finance' },
    { text: 'Wire Transfer Protection', size: 17, x: 280, y: -40, z: -80, category: 'finance' },
    { text: 'UGC Verification', size: 20, x: -240, y: 120, z: -80, category: 'social' },
    { text: 'Trust & Safety', size: 19, x: 240, y: 120, z: -80, category: 'social' },
    { text: 'Source Verification', size: 20, x: 0, y: -220, z: -80, category: 'media' },
    { text: 'Fact Checking', size: 19, x: 0, y: 220, z: -80, category: 'media' },

    // Far edges
    { text: 'Scam Detection', size: 18, x: -320, y: 80, z: -120, category: 'social' },
    { text: 'Compliance', size: 20, x: 320, y: 80, z: -120, category: 'enterprise' },
    { text: 'Video Call Auth', size: 18, x: -300, y: -120, z: -120, category: 'enterprise' },
    { text: 'Remote Hiring', size: 17, x: 300, y: -120, z: -120, category: 'enterprise' },
    { text: 'News Integrity', size: 18, x: 0, y: 280, z: -120, category: 'media' },
    { text: 'API Integration', size: 17, x: 0, y: -280, z: -120, category: 'tech' },
    { text: 'Batch Processing', size: 16, x: -160, y: 240, z: -120, category: 'tech' },
    { text: 'Insider Threat', size: 16, x: 160, y: 240, z: -120, category: 'enterprise' },
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
          <p className="text-xl text-white/60 mb-2">
            {hoveredWord ? (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="gradient-text font-semibold"
              >
                {hoveredWord}
              </motion.span>
            ) : (
              'Interactive 3D sphere · Hover to explore'
            )}
          </p>
          {!hoveredWord && (
            <p className="text-sm text-white/40">
              Auto-rotating · Move mouse to control
            </p>
          )}
        </motion.div>

        {/* 3D Word Sphere - Enhanced with orbits and particles */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[800px] flex items-center justify-center overflow-visible"
          style={{ perspective: '1200px' }}
        >
          {/* Enhanced center glow with color breathing */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="w-[500px] h-[500px] bg-bitmind-accent rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-[400px] h-[400px] bg-cyan-500 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.2, 0.3, 0.2],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute w-[300px] h-[300px] bg-purple-500 rounded-full blur-2xl"
            />
          </div>

          {/* Orbital rings with particles */}
          {orbitalRings.map((ring, ringIndex) => (
            <div key={ringIndex} className="absolute inset-0 flex items-center justify-center">
              {ring.particles.map((particle, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1, 0.5],
                    x: particle.x,
                    y: particle.y,
                  }}
                  transition={{
                    opacity: { duration: 2, repeat: Infinity, delay: particle.delay },
                    scale: { duration: 2, repeat: Infinity, delay: particle.delay },
                    x: { duration: ring.speed, repeat: Infinity, ease: "linear" },
                    y: { duration: ring.speed, repeat: Infinity, ease: "linear" },
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    background: particle.color,
                    boxShadow: `0 0 12px ${particle.color}, 0 0 24px ${particle.color}40`,
                  }}
                />
              ))}
            </div>
          ))}

          {/* Connection lines between close particles */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.15 }}>
            <defs>
              <radialGradient id="lineGradient">
                <stop offset="0%" stopColor="#00FF88" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#00FF88" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Draw connecting lines */}
            <motion.circle
              cx="50%"
              cy="50%"
              r="280"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 2, delay: 0.5 }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="350"
              fill="none"
              stroke="#00D4FF"
              strokeWidth="1"
              strokeOpacity="0.2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.7 }}
            />
            <motion.circle
              cx="50%"
              cy="50%"
              r="420"
              fill="none"
              stroke="#A78BFA"
              strokeWidth="1"
              strokeOpacity="0.15"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 0.9 }}
            />
          </svg>

          {/* Word cloud with 3D transform and auto-rotation */}
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: autoRotate
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                : `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.1s linear',
              willChange: 'transform',
            }}
          >
            {words.map((word, i) => {
              const delay = i * 0.03;
              const color = categoryColors[word.category as keyof typeof categoryColors];
              const scale = 1 + word.z / 500; // Closer items are larger

              const isHovered = hoveredWord === word.text;
              const isFaded = hoveredWord && !isHovered;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: isFaded ? 0.15 : (0.7 + word.z / 200),
                    scale: scale, // No scale changes on hover
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
                      ? `0 0 80px ${color}, 0 0 140px ${color}dd, 0 0 200px ${color}70, 0 12px 40px ${color}aa`
                      : word.category === 'core'
                      ? `0 0 35px rgba(0,255,136,0.6), 0 0 70px rgba(0,255,136,0.3), 0 6px 25px rgba(0,255,136,0.2)`
                      : `0 0 25px rgba(0,255,136,0.25)`,
                    fontWeight: word.category === 'core' ? 'bold' : isHovered ? '800' : '500',
                    zIndex: isHovered ? 999 : Math.round(word.z + 100),
                    letterSpacing: isHovered ? '0.1em' : word.category === 'core' ? '0.02em' : 'normal',
                    filter: isHovered ? 'blur(0px) brightness(1.3)' : `blur(${Math.max(0, -word.z / 150)}px)`,
                    transition: 'all 0.15s ease-out',
                    padding: '4px 8px',
                  }}
                  onMouseEnter={() => {
                    setHoveredWord(word.text);
                    setAutoRotate(false);
                  }}
                  onMouseLeave={() => {
                    setHoveredWord(null);
                  }}
                >
                  {word.text}
                  {/* Subtle hover indicator */}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 0.8 }}
                      exit={{ scaleX: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute -bottom-1 left-0 right-0 h-px rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent 10%, ${color} 50%, transparent 90%)`,
                        boxShadow: `0 0 12px ${color}`,
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Category Legend - Premium */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          {Object.entries(categoryColors).map(([category, color]) => (
            <div key={category} className="flex items-center gap-2 glass px-4 py-2 rounded-full">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
              <span className="text-sm text-white/50 capitalize">{category}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

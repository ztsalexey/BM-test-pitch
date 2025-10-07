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
    const handleMouseMove = (e: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const newX = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        const newY = ((e.clientY - rect.top) / rect.height - 0.5) * 30;

        setMousePos({ x: newX, y: newY });

        // Disable auto-rotate when hovering
        if (Math.abs(newX) > 2 || Math.abs(newY) > 2) {
          setAutoRotate(false);
        }
      }
    };

    const handleMouseLeave = () => {
      setAutoRotate(true);
    };

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.addEventListener('mouseleave', handleMouseLeave);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (currentRef) {
        currentRef.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Auto-rotation when not hovering
  useEffect(() => {
    if (!autoRotate || !isInView) return;

    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.15,
        y: prev.y + 0.2,
      }));
    }, 50);

    return () => clearInterval(interval);
  }, [autoRotate, isInView]);

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

        {/* 3D Word Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[700px] flex items-center justify-center overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {/* Enhanced center glow with multiple layers */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-96 h-96 bg-bitmind-accent/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute w-32 h-32 bg-bitmind-accent/20 rounded-full blur-xl" />
          </div>

          {/* Word cloud with 3D transform and auto-rotation */}
          <div
            className="relative w-full h-full flex items-center justify-center ease-out"
            style={{
              transform: autoRotate
                ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
                : `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              transformStyle: 'preserve-3d',
              transition: autoRotate ? 'none' : 'transform 0.3s ease-out',
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
                    opacity: isFaded ? 0.1 : (0.6 + word.z / 200),
                    scale: isHovered ? scale * 1.5 : scale,
                    filter: isHovered ? 'blur(0px)' : `blur(${Math.max(0, -word.z / 150)}px)`,
                  } : {}}
                  whileHover={{
                    scale: scale * 1.6,
                    transition: { duration: 0.2, type: "spring", stiffness: 300 }
                  }}
                  transition={{
                    duration: 0.6,
                    delay,
                    scale: { duration: 0.3, type: "spring", stiffness: 250 },
                    opacity: { duration: 0.3 }
                  }}
                  className="absolute cursor-pointer transition-all duration-300 whitespace-nowrap select-none"
                  style={{
                    left: `calc(50% + ${word.x}px)`,
                    top: `calc(50% + ${word.y}px)`,
                    transform: `translateZ(${word.z}px) translate(-50%, -50%)`,
                    fontSize: `${word.size * scale}px`,
                    color: isHovered ? color : word.category === 'core' ? '#fff' : '#ddd',
                    textShadow: isHovered
                      ? `0 0 50px ${color}, 0 0 100px ${color}, 0 0 150px ${color}60, 0 4px 20px ${color}40`
                      : word.category === 'core'
                      ? `0 0 25px rgba(0,255,136,0.4), 0 0 50px rgba(0,255,136,0.2)`
                      : `0 0 15px rgba(0,255,136,0.2)`,
                    fontWeight: word.category === 'core' ? 'bold' : isHovered ? '700' : '500',
                    zIndex: isHovered ? 999 : Math.round(word.z + 100),
                    letterSpacing: isHovered ? '0.05em' : 'normal',
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
                  {/* Hover indicator */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-0.5 rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        boxShadow: `0 0 10px ${color}`,
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

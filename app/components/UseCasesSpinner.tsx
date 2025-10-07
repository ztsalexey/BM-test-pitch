'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function UseCasesSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  const categoryColors = {
    core: '#00FF88',
    finance: '#FFD700',
    social: '#FF6B9D',
    media: '#00D4FF',
    enterprise: '#A78BFA',
    tech: '#FFA500',
  };

  const useCases = [
    { text: 'Deepfake Detection', angle: 0, radius: 280, category: 'core' },
    { text: 'KYC Verification', angle: 45, radius: 270, category: 'finance' },
    { text: 'Fraud Prevention', angle: 90, radius: 275, category: 'finance' },
    { text: 'Content Moderation', angle: 135, radius: 270, category: 'social' },
    { text: 'Video Verification', angle: 180, radius: 280, category: 'core' },
    { text: 'Identity Check', angle: 225, radius: 265, category: 'finance' },
    { text: 'Trust & Safety', angle: 270, radius: 270, category: 'social' },
    { text: 'Real-time Detection', angle: 315, radius: 275, category: 'tech' },
  ];

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
              'Hover to explore · Continuous rotation'
            )}
          </p>
        </motion.div>

        {/* BitMind Spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[700px] flex items-center justify-center overflow-visible"
        >
          {/* Center glow */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[400px] h-[400px] bg-bitmind-accent/20 rounded-full blur-3xl"
          />

          {/* Main Rotating Spinner Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-[500px] h-[500px]"
          >
            <svg viewBox="0 0 500 500" className="w-full h-full">
              <defs>
                <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {/* Main ring */}
              <circle
                cx="250"
                cy="250"
                r="240"
                fill="none"
                stroke="url(#spinnerGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="20 10"
              />
              {/* Inner ring */}
              <circle
                cx="250"
                cy="250"
                r="200"
                fill="none"
                stroke="#00FF88"
                strokeWidth="1"
                strokeOpacity="0.3"
              />
            </svg>
          </motion.div>

          {/* Counter-rotating segments */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-[450px] h-[450px]"
          >
            {[0, 60, 120, 180, 240, 300].map((angle, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `rotate(${angle}deg) translate(225px, 0)`,
                  transformOrigin: 'center',
                }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: categoryColors[Object.keys(categoryColors)[i % 6] as keyof typeof categoryColors],
                    boxShadow: `0 0 20px ${categoryColors[Object.keys(categoryColors)[i % 6] as keyof typeof categoryColors]}`,
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Use case words positioned around spinner */}
          <div className="absolute w-full h-full flex items-center justify-center">
            {useCases.map((item, i) => {
              const color = categoryColors[item.category as keyof typeof categoryColors];
              const isHovered = hoveredWord === item.text;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: hoveredWord && !isHovered ? 0.2 : 0.9,
                    scale: 1
                  } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="absolute cursor-pointer whitespace-nowrap select-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${item.angle}deg) translate(${item.radius}px, 0) rotate(${-item.angle}deg) translate(-50%, -50%)`,
                    fontSize: item.category === 'core' ? '22px' : '18px',
                    color: isHovered ? color : '#fff',
                    textShadow: isHovered
                      ? `0 0 40px ${color}, 0 0 80px ${color}80, 0 0 120px ${color}50`
                      : item.category === 'core'
                      ? `0 0 25px rgba(0,255,136,0.6)`
                      : `0 0 15px rgba(255,255,255,0.4)`,
                    fontWeight: item.category === 'core' ? 'bold' : isHovered ? '700' : '500',
                    letterSpacing: isHovered ? '0.05em' : 'normal',
                    transition: 'all 0.2s ease-out',
                  }}
                  onMouseEnter={() => setHoveredWord(item.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  {item.text}
                  {isHovered && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                        boxShadow: `0 0 15px ${color}`,
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

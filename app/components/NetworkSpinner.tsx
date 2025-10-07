'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function NetworkSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Generate 3D diamond/rhombus nodes
  const generateNodes = () => {
    const nodes: { x: number; y: number; z: number; id: number }[] = [];
    let id = 0;

    // Top pyramid (4 rings)
    for (let ring = 0; ring < 4; ring++) {
      const radius = ring * 60 + 40;
      const height = 150 - ring * 40;
      const pointsInRing = ring === 0 ? 1 : 8 + ring * 4;

      for (let i = 0; i < pointsInRing; i++) {
        const angle = (i / pointsInRing) * Math.PI * 2;
        nodes.push({
          x: Math.cos(angle) * radius,
          y: -height,
          z: Math.sin(angle) * radius,
          id: id++
        });
      }
    }

    // Middle ring (widest)
    const middleRadius = 240;
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      nodes.push({
        x: Math.cos(angle) * middleRadius,
        y: 0,
        z: Math.sin(angle) * middleRadius,
        id: id++
      });
    }

    // Bottom pyramid (4 rings - mirror of top)
    for (let ring = 0; ring < 4; ring++) {
      const radius = (3 - ring) * 60 + 40;
      const height = 150 - (3 - ring) * 40;
      const pointsInRing = ring === 3 ? 1 : 8 + (3 - ring) * 4;

      for (let i = 0; i < pointsInRing; i++) {
        const angle = (i / pointsInRing) * Math.PI * 2;
        nodes.push({
          x: Math.cos(angle) * radius,
          y: height,
          z: Math.sin(angle) * radius,
          id: id++
        });
      }
    }

    return nodes;
  };

  const nodes = generateNodes();

  const useCases = [
    { text: 'Deepfake Detection', angle: 0, radius: 300, category: 'core' },
    { text: 'KYC Verification', angle: 45, radius: 290, category: 'finance' },
    { text: 'Fraud Prevention', angle: 90, radius: 295, category: 'finance' },
    { text: 'Content Moderation', angle: 135, radius: 290, category: 'social' },
    { text: 'Video Verification', angle: 180, radius: 300, category: 'core' },
    { text: 'Identity Check', angle: 225, radius: 285, category: 'finance' },
    { text: 'Trust & Safety', angle: 270, radius: 290, category: 'social' },
    { text: 'Real-time Detection', angle: 315, radius: 295, category: 'tech' },
  ];

  const categoryColors: { [key: string]: string } = {
    core: '#00FF88',
    finance: '#FFD700',
    social: '#FF6B9D',
    tech: '#00D4FF',
  };

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-black">
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
              '3D Neural Network · Hover to explore'
            )}
          </p>
        </motion.div>

        {/* 3D Network Diamond */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-[800px] flex items-center justify-center overflow-visible"
          style={{ perspective: '1200px' }}
        >
          {/* Rotating 3D container */}
          <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="relative w-full h-full"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Render all nodes */}
            {nodes.map((node) => {
              // Calculate 2D position from 3D
              const scale = 1 + node.z / 400;
              const opacity = 0.3 + (node.z + 250) / 500;

              return (
                <motion.div
                  key={node.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: opacity,
                    scale: scale
                  } : {}}
                  transition={{ duration: 0.6, delay: node.id * 0.01 }}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translateX(${node.x}px) translateY(${node.y}px) translateZ(${node.z}px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 10px rgba(255,255,255,0.5)',
                        '0 0 20px rgba(0,255,136,0.8)',
                        '0 0 10px rgba(255,255,255,0.5)',
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: (node.id % 10) * 0.3 }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                </motion.div>
              );
            })}

            {/* Connection lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.3 }}>
              {nodes.map((node, i) => {
                // Connect to nearby nodes
                return nodes
                  .filter((n, j) => {
                    if (j <= i) return false;
                    const dist = Math.sqrt(
                      Math.pow(node.x - n.x, 2) +
                      Math.pow(node.y - n.y, 2) +
                      Math.pow(node.z - n.z, 2)
                    );
                    return dist < 120;
                  })
                  .map((n, j) => (
                    <line
                      key={`${i}-${j}`}
                      x1={`calc(50% + ${node.x}px)`}
                      y1={`calc(50% + ${node.y}px)`}
                      x2={`calc(50% + ${n.x}px)`}
                      y2={`calc(50% + ${n.y}px)`}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                    />
                  ));
              })}
            </svg>
          </motion.div>

          {/* Use case labels (not rotating) */}
          <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
            {useCases.map((item, i) => {
              const color = categoryColors[item.category];
              const isHovered = hoveredWord === item.text;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? {
                    opacity: hoveredWord && !isHovered ? 0.3 : 0.9,
                    scale: 1
                  } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="absolute cursor-pointer whitespace-nowrap select-none pointer-events-auto"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${item.angle}deg) translate(${item.radius}px, 0) rotate(${-item.angle}deg) translate(-50%, -50%)`,
                    fontSize: item.category === 'core' ? '22px' : '18px',
                    color: isHovered ? color : '#fff',
                    textShadow: isHovered
                      ? `0 0 40px ${color}, 0 0 80px ${color}80`
                      : item.category === 'core'
                      ? `0 0 25px rgba(0,255,136,0.6)`
                      : `0 0 15px rgba(255,255,255,0.4)`,
                    fontWeight: item.category === 'core' ? 'bold' : isHovered ? '700' : '500',
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
      </div>
    </section>
  );
}

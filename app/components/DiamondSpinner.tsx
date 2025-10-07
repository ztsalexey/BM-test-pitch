'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Generate INCEPTION SPINNING TOP - conical top with rounded tip
  const { nodes, connections } = useMemo(() => {
    const nodesArray = [];
    const layers = 35;

    for (let layer = 0; layer < layers; layer++) {
      const t = layer / (layers - 1); // 0 to 1 (top to bottom)

      let radius;
      let y;

      if (t < 0.15) {
        // Rounded tip at top
        const tipT = t / 0.15;
        radius = 8 * tipT; // Small rounded tip
        y = -280 + tipT * 40;
      } else if (t < 0.85) {
        // Main conical body - gradually widens
        const bodyT = (t - 0.15) / 0.7;
        radius = 8 + bodyT * 240; // 8 -> 248
        y = -240 + bodyT * 460;
      } else {
        // Flat base at bottom
        const baseT = (t - 0.85) / 0.15;
        radius = 248;
        y = 220 + baseT * 30;
      }

      const numPoints = Math.max(4, Math.floor(radius / 12));

      // Multiple concentric rings for dense mesh
      const numRings = radius > 150 ? 4 : radius > 80 ? 3 : radius > 20 ? 2 : 1;

      for (let ring = 0; ring < numRings; ring++) {
        const ringRadius = radius * (1 - ring * 0.25);
        const ringPoints = Math.max(4, Math.floor(numPoints * (1 - ring * 0.2)));

        for (let i = 0; i < ringPoints; i++) {
          const angle = (i / ringPoints) * Math.PI * 2 + ring * 0.25;
          nodesArray.push({
            x: Math.cos(angle) * ringRadius,
            y: y,
            z: Math.sin(angle) * ringRadius,
            layer,
            ring,
            isTip: t < 0.15,
            isBase: t > 0.85,
          });
        }
      }
    }

    // Generate connections
    const connectionsArray = [];
    const maxDistance = 65;

    for (let i = 0; i < nodesArray.length; i++) {
      for (let j = i + 1; j < nodesArray.length; j++) {
        const dx = nodesArray[i].x - nodesArray[j].x;
        const dy = nodesArray[i].y - nodesArray[j].y;
        const dz = nodesArray[i].z - nodesArray[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          connectionsArray.push({
            from: i,
            to: j,
            distance,
          });
        }
      }
    }

    return { nodes: nodesArray, connections: connectionsArray };
  }, []);

  // Use cases - some inside, some outside the spinning top
  const useCases = [
    // Core - inside/near the top
    { text: 'Deepfake Detection', x: 0, y: -320, z: 0, isCore: true, color: '#00FF88' },

    // Upper ring - outside
    { text: 'KYC Verification', x: 280, y: -180, z: 0, isCore: false, color: '#FFD700' },
    { text: 'Identity Verification', x: -280, y: -180, z: 0, isCore: false, color: '#A78BFA' },
    { text: 'Age Verification', x: 0, y: -180, z: 280, isCore: false, color: '#00FFFF' },

    // Middle ring - outside
    { text: 'Content Moderation', x: 320, y: 0, z: 0, isCore: false, color: '#FF6B9D' },
    { text: 'Media Authentication', x: -320, y: 0, z: 0, isCore: false, color: '#00D4FF' },
    { text: 'Brand Protection', x: 0, y: 0, z: 320, isCore: false, color: '#88FF00' },
    { text: 'Trust & Safety', x: 0, y: 0, z: -320, isCore: false, color: '#FF88FF' },

    // Lower ring - outside
    { text: 'Fraud Prevention', x: 300, y: 180, z: 0, isCore: false, color: '#FFA500' },
    { text: 'Video Forensics', x: -300, y: 180, z: 0, isCore: false, color: '#FF1493' },
    { text: 'Live Stream Safety', x: 0, y: 180, z: 300, isCore: false, color: '#7FFF00' },
    { text: 'Social Media Protection', x: 0, y: 180, z: -300, isCore: false, color: '#BA55D3' },

    // Base ring - outside wider
    { text: 'Enterprise Security', x: 340, y: 280, z: 0, isCore: false, color: '#00CED1' },
    { text: 'Government ID', x: -340, y: 280, z: 0, isCore: false, color: '#FFB6C1' },
    { text: 'Financial Services', x: 240, y: 280, z: 240, isCore: false, color: '#DDA0DD' },
    { text: 'Healthcare Compliance', x: -240, y: 280, z: 240, isCore: false, color: '#F0E68C' },
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Universal <span className="gradient-text">Use Cases</span>
          </h2>
          <p className="text-xl text-white/60">
            {hoveredWord || 'AI-powered deepfake detection across industries'}
          </p>
        </motion.div>

        {/* Inception Spinning Top */}
        <div className="relative h-[800px] flex items-center justify-center">
          <div
            className="relative w-full h-full"
            style={{
              perspective: '1400px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Rotating spinning top */}
            <motion.div
              animate={{
                rotateY: 360,
              }}
              transition={{
                rotateY: { duration: 18, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(65deg) rotateZ(0deg)',
                willChange: 'transform',
              }}
            >
              {/* SVG mesh */}
              <svg
                viewBox="-450 -450 900 900"
                className="absolute"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.25)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.15))',
                }}
              >
                <defs>
                  <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="0.25" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.2" />
                  </linearGradient>
                  <radialGradient id="nodeGradTop">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.7" />
                  </radialGradient>
                  <linearGradient id="tipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
                  </linearGradient>
                </defs>

                {/* Connections - transparent mesh */}
                {connections.map((conn, i) => {
                  const from = nodes[conn.from];
                  const to = nodes[conn.to];
                  const opacity = 0.08 + (1 - conn.distance / 65) * 0.18;

                  return (
                    <line
                      key={`conn-${i}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="url(#topGrad)"
                      strokeWidth="0.7"
                      strokeOpacity={opacity}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                  const isHighlight = i % 7 === 0 || node.isTip || node.isBase;
                  const size = node.isTip ? 5 : node.isBase ? 3.5 : isHighlight ? 2.8 : 1.8;

                  return (
                    <circle
                      key={`node-${i}`}
                      cx={node.x}
                      cy={node.y}
                      r={size}
                      fill={node.isTip ? "url(#tipGrad)" : isHighlight ? "url(#nodeGradTop)" : "#ffffff"}
                      opacity={node.isTip ? 1 : isHighlight ? 0.75 : 0.5}
                      style={{
                        filter: node.isTip
                          ? 'drop-shadow(0 0 12px #00FF88) drop-shadow(0 0 20px #00D4FF)'
                          : isHighlight
                          ? 'drop-shadow(0 0 6px rgba(0, 255, 136, 0.7))'
                          : 'none',
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Use case labels - 3D positioned */}
            {useCases.map((item, i) => {
              const isHovered = hoveredWord === item.text;

              return (
                <motion.div
                  key={`label-${i}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? {
                    opacity: hoveredWord && !isHovered ? 0.25 : 1,
                    scale: isHovered ? 1.15 : 1,
                  } : { opacity: 0, scale: 0.6 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + i * 0.06,
                    scale: { duration: 0.2, ease: "easeOut" }
                  }}
                  className="absolute cursor-pointer whitespace-nowrap select-none z-10"
                  style={{
                    left: `calc(50% + ${item.x}px)`,
                    top: `calc(50% + ${item.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredWord(item.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  <div
                    className="relative px-3 py-1.5 rounded-md backdrop-blur-md transition-all duration-200"
                    style={{
                      fontSize: item.isCore ? (isHovered ? '24px' : '20px') : (isHovered ? '18px' : '14px'),
                      color: isHovered ? item.color : '#fff',
                      textShadow: isHovered
                        ? `0 0 25px ${item.color}, 0 0 45px ${item.color}90`
                        : item.isCore
                        ? '0 0 20px rgba(255,255,255,0.6)'
                        : '0 0 15px rgba(255,255,255,0.3)',
                      fontWeight: item.isCore ? (isHovered ? '800' : '700') : (isHovered ? '700' : '600'),
                      background: isHovered
                        ? `linear-gradient(135deg, ${item.color}30, ${item.color}10)`
                        : item.isCore
                        ? 'rgba(0,0,0,0.7)'
                        : 'rgba(0,0,0,0.5)',
                      border: isHovered
                        ? `1.5px solid ${item.color}80`
                        : item.isCore
                        ? '1.5px solid rgba(0, 255, 136, 0.4)'
                        : '1px solid rgba(255,255,255,0.2)',
                      boxShadow: isHovered
                        ? `0 0 35px ${item.color}50, 0 8px 30px rgba(0,0,0,0.9)`
                        : item.isCore
                        ? '0 0 25px rgba(0, 255, 136, 0.3), 0 5px 25px rgba(0,0,0,0.8)'
                        : '0 4px 20px rgba(0,0,0,0.7)',
                    }}
                  >
                    {item.text}
                    {isHovered && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute -bottom-0.5 left-0 right-0 h-px rounded-full"
                        style={{
                          background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                          boxShadow: `0 0 20px ${item.color}`,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Energy particles orbiting */}
            {[...Array(70)].map((_, i) => {
              const angle = (i / 70) * Math.PI * 2;
              const radiusVar = 180 + Math.random() * 200;
              const heightVar = (Math.random() - 0.5) * 400;
              const x = Math.cos(angle) * radiusVar;
              const y = heightVar;

              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1.4, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 6,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    background: i % 4 === 0 ? '#00FF88' : i % 4 === 1 ? '#00D4FF' : i % 4 === 2 ? '#A78BFA' : '#FFD700',
                    boxShadow: `0 0 12px ${i % 4 === 0 ? '#00FF88' : i % 4 === 1 ? '#00D4FF' : i % 4 === 2 ? '#A78BFA' : '#FFD700'}`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

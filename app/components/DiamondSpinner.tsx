'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Generate 3D SPHERE with dense mesh
  const { nodes, connections } = useMemo(() => {
    const nodesArray = [];
    const latitudes = 20; // Horizontal layers
    const longitudesPerLat = 24; // Points around each layer

    for (let lat = 0; lat <= latitudes; lat++) {
      const theta = (lat / latitudes) * Math.PI; // 0 to PI (top to bottom)
      const y = Math.cos(theta) * 220; // Vertical position
      const currentRadius = Math.sin(theta) * 220; // Radius at this latitude

      const numPoints = lat === 0 || lat === latitudes ? 1 : longitudesPerLat;

      for (let lon = 0; lon < numPoints; lon++) {
        const phi = (lon / numPoints) * Math.PI * 2; // 0 to 2PI (around)
        const x = Math.cos(phi) * currentRadius;
        const z = Math.sin(phi) * currentRadius;

        nodesArray.push({
          x,
          y,
          z,
          lat,
          lon,
          isPole: lat === 0 || lat === latitudes,
        });
      }
    }

    // Generate connections
    const connectionsArray = [];
    const maxDistance = 70;

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

  // Use cases - positioned around sphere
  const useCases = [
    // Core - top
    { text: 'Deepfake Detection', offsetX: 0, offsetY: -0.45, isCore: true, color: '#00FF88' },

    // Upper ring
    { text: 'KYC Verification', offsetX: 0.4, offsetY: -0.3, isCore: false, color: '#FFD700' },
    { text: 'Identity Verification', offsetX: -0.4, offsetY: -0.3, isCore: false, color: '#A78BFA' },
    { text: 'Age Verification', offsetX: 0.2, offsetY: -0.35, isCore: false, color: '#00FFFF' },
    { text: 'Document Verification', offsetX: -0.2, offsetY: -0.35, isCore: false, color: '#FF6B9D' },

    // Middle ring
    { text: 'Content Moderation', offsetX: 0.45, offsetY: -0.05, isCore: false, color: '#FF6B9D' },
    { text: 'Media Authentication', offsetX: -0.45, offsetY: -0.05, isCore: false, color: '#00D4FF' },
    { text: 'Brand Protection', offsetX: 0.45, offsetY: 0.1, isCore: false, color: '#88FF00' },
    { text: 'Trust & Safety', offsetX: -0.45, offsetY: 0.1, isCore: false, color: '#FF88FF' },

    // Lower ring
    { text: 'Fraud Prevention', offsetX: 0.4, offsetY: 0.3, isCore: false, color: '#FFA500' },
    { text: 'Video Forensics', offsetX: -0.4, offsetY: 0.3, isCore: false, color: '#FF1493' },
    { text: 'Live Stream Safety', offsetX: 0.2, offsetY: 0.35, isCore: false, color: '#7FFF00' },
    { text: 'Social Media Protection', offsetX: -0.2, offsetY: 0.35, isCore: false, color: '#BA55D3' },

    // Bottom ring
    { text: 'Enterprise Security', offsetX: 0.35, offsetY: 0.45, isCore: false, color: '#00CED1' },
    { text: 'Government ID', offsetX: -0.35, offsetY: 0.45, isCore: false, color: '#FFB6C1' },
    { text: 'Financial Services', offsetX: 0, offsetY: 0.48, isCore: false, color: '#DDA0DD' },
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 tracking-tight">
            Universal <span className="gradient-text">Use Cases</span>
          </h2>
          {/* Fixed height container to prevent flickering */}
          <div className="h-[28px] md:h-[32px] flex items-center justify-center">
            <p className="text-lg md:text-xl text-white/60">
              {hoveredWord || 'AI-powered deepfake detection across industries'}
            </p>
          </div>
        </motion.div>

        {/* 3D Sphere - Responsive Container */}
        <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[800px] flex items-center justify-center">
          <div
            className="relative w-full h-full max-w-[900px] mx-auto"
            style={{
              perspective: '1400px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Rotating sphere */}
            <motion.div
              animate={{
                rotateY: 360,
              }}
              transition={{
                rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(15deg) rotateZ(0deg)', // Slight tilt for depth
                willChange: 'transform',
              }}
            >
              {/* SVG mesh */}
              <svg
                viewBox="-400 -400 800 800"
                className="absolute w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.25)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.15))',
                }}
              >
                <defs>
                  <linearGradient id="sphereGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.25" />
                  </linearGradient>
                  <radialGradient id="nodeGradSphere">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="1" />
                    <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.7" />
                  </radialGradient>
                  <radialGradient id="poleGrad">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="1" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.7" />
                  </radialGradient>
                </defs>

                {/* Connections - transparent mesh */}
                {connections.map((conn, i) => {
                  const from = nodes[conn.from];
                  const to = nodes[conn.to];
                  const opacity = 0.1 + (1 - conn.distance / 70) * 0.2;

                  return (
                    <line
                      key={`conn-${i}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="url(#sphereGrad)"
                      strokeWidth="0.8"
                      strokeOpacity={opacity}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                  const isHighlight = i % 5 === 0 || node.isPole;
                  const size = node.isPole ? 6 : isHighlight ? 3.5 : 2;

                  return (
                    <circle
                      key={`node-${i}`}
                      cx={node.x}
                      cy={node.y}
                      r={size}
                      fill={node.isPole ? "url(#poleGrad)" : isHighlight ? "url(#nodeGradSphere)" : "#ffffff"}
                      opacity={node.isPole ? 1 : isHighlight ? 0.8 : 0.55}
                      style={{
                        filter: node.isPole
                          ? 'drop-shadow(0 0 15px #00FF88) drop-shadow(0 0 25px #00D4FF)'
                          : isHighlight
                          ? 'drop-shadow(0 0 8px rgba(0, 255, 136, 0.7))'
                          : 'none',
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Use case labels - Responsive positioning */}
            {useCases.map((item, i) => {
              const isHovered = hoveredWord === item.text;

              return (
                <motion.div
                  key={`label-${i}`}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? {
                    opacity: hoveredWord && !isHovered ? 0.25 : 1,
                    scale: 1, // No scale change on hover to prevent flickering
                  } : { opacity: 0, scale: 0.6 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.8 + i * 0.06,
                  }}
                  className="absolute cursor-pointer whitespace-nowrap select-none z-10"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${item.offsetX * 100}%), calc(-50% + ${item.offsetY * 100}%))`,
                  }}
                  onMouseEnter={() => setHoveredWord(item.text)}
                  onMouseLeave={() => setHoveredWord(null)}
                >
                  <div
                    className="relative px-2 sm:px-3 py-1 sm:py-1.5 rounded-md backdrop-blur-md transition-all duration-200"
                    style={{
                      fontSize: item.isCore
                        ? 'clamp(16px, 2.5vw, 20px)'
                        : 'clamp(11px, 1.5vw, 14px)',
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
            {[...Array(60)].map((_, i) => {
              const angle = (i / 60) * Math.PI * 2;
              const radiusPercent = 0.25 + Math.random() * 0.25;
              const heightPercent = (Math.random() - 0.5) * 0.5;

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
                    left: '50%',
                    top: '50%',
                    transform: `translate(calc(-50% + ${Math.cos(angle) * radiusPercent * 100}%), calc(-50% + ${heightPercent * 100}%))`,
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

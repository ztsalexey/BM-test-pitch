'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useMemo } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Generate 3D sphere-like spinning top from SIDE VIEW
  // The shape is like two cones joined at their base (double cone / diabolo shape)
  const { nodes, connections } = useMemo(() => {
    const nodesArray = [];
    const layers = 30; // Many vertical layers

    for (let layer = 0; layer < layers; layer++) {
      const t = layer / (layers - 1); // 0 at top, 1 at bottom

      // Create double-cone profile (spinning top from side)
      // At t=0.5 (middle), radius is maximum
      // At t=0 (top) and t=1 (bottom), radius is 0 (points)
      const distanceFromCenter = Math.abs(t - 0.5); // 0 to 0.5
      const radiusFactor = 1 - (distanceFromCenter / 0.5); // 1 at center, 0 at edges

      // Apply smooth curve for nice spinning top shape
      const radius = 250 * Math.sin(radiusFactor * Math.PI);

      const y = (t - 0.5) * 500; // Vertical position (-250 to +250)

      // Number of points around circumference - more in the middle
      const numPoints = Math.max(3, Math.floor(20 * radiusFactor + 4));

      if (radius < 5) {
        // Apex point
        nodesArray.push({
          x: 0,
          y: y,
          z: 0,
          layer,
          isApex: true,
        });
      } else {
        // Create multiple concentric rings for dense mesh
        const numRings = radius > 150 ? 3 : radius > 80 ? 2 : 1;

        for (let ring = 0; ring < numRings; ring++) {
          const ringRadius = radius * (1 - ring * 0.35);
          const ringPoints = Math.max(3, Math.floor(numPoints * (1 - ring * 0.3)));

          for (let i = 0; i < ringPoints; i++) {
            const angle = (i / ringPoints) * Math.PI * 2 + ring * 0.3;
            nodesArray.push({
              x: Math.cos(angle) * ringRadius,
              y: y,
              z: Math.sin(angle) * ringRadius,
              layer,
              ring,
              isApex: false,
            });
          }
        }
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

  // Use case words - positioned in 3D space AROUND the spinner
  const useCases = [
    { text: 'Deepfake Detection', x: 0, y: -350, color: '#00FF88' },
    { text: 'KYC Verification', x: 350, y: -200, color: '#FFD700' },
    { text: 'Content Moderation', x: 350, y: 0, color: '#FF6B9D' },
    { text: 'Fraud Prevention', x: 350, y: 200, color: '#00D4FF' },
    { text: 'Identity Verification', x: 0, y: 350, color: '#A78BFA' },
    { text: 'Media Authentication', x: -350, y: 200, color: '#00FFFF' },
    { text: 'Trust & Safety', x: -350, y: 0, color: '#FF88FF' },
    { text: 'Brand Protection', x: -350, y: -200, color: '#88FF00' },
  ];

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20 bg-black">
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

        {/* 3D Spinning Top Container */}
        <div className="relative h-[750px] flex items-center justify-center overflow-visible">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
            style={{
              perspective: '1200px',
              perspectiveOrigin: '50% 50%',
            }}
          >
            {/* Rotating 3D spinning top structure */}
            <motion.div
              animate={{
                rotateY: 360,
              }}
              transition={{
                rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: 'preserve-3d',
                transform: 'rotateX(75deg)', // Side view angle
                willChange: 'transform',
              }}
            >
              {/* SVG for the mesh */}
              <svg
                viewBox="-400 -400 800 800"
                className="absolute"
                style={{
                  width: '100%',
                  height: '100%',
                  filter: 'drop-shadow(0 0 25px rgba(0, 255, 136, 0.2)) drop-shadow(0 0 50px rgba(0, 212, 255, 0.15))',
                }}
              >
                <defs>
                  <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FF88" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.15" />
                  </linearGradient>
                  <radialGradient id="nodeGrad">
                    <stop offset="0%" stopColor="#00FF88" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </radialGradient>
                </defs>

                {/* Connections */}
                {connections.map((conn, i) => {
                  const from = nodes[conn.from];
                  const to = nodes[conn.to];
                  const opacity = 0.1 + (1 - conn.distance / 70) * 0.15;

                  return (
                    <line
                      key={`conn-${i}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="url(#meshGrad)"
                      strokeWidth="0.6"
                      strokeOpacity={opacity}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Nodes */}
                {nodes.map((node, i) => {
                  const isHighlight = i % 6 === 0 || node.isApex;
                  const size = node.isApex ? 4 : isHighlight ? 2.5 : 1.5;

                  return (
                    <circle
                      key={`node-${i}`}
                      cx={node.x}
                      cy={node.y}
                      r={size}
                      fill={node.isApex ? "#00FF88" : isHighlight ? "url(#nodeGrad)" : "#ffffff"}
                      opacity={node.isApex ? 0.95 : isHighlight ? 0.7 : 0.5}
                      style={{
                        filter: node.isApex
                          ? 'drop-shadow(0 0 8px #00FF88)'
                          : isHighlight
                          ? 'drop-shadow(0 0 4px rgba(0, 255, 136, 0.6))'
                          : 'none',
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* Use case labels - positioned around the spinner in 2D screen space */}
            {useCases.map((item, i) => {
              const isHovered = hoveredWord === item.text;

              return (
                <motion.div
                  key={`label-${i}`}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={isInView ? {
                    opacity: hoveredWord && !isHovered ? 0.3 : 1,
                    scale: isHovered ? 1.12 : 1,
                  } : { opacity: 0, scale: 0.7 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + i * 0.08,
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
                    className="relative px-4 py-2 rounded-lg backdrop-blur-md transition-all duration-200"
                    style={{
                      fontSize: isHovered ? '20px' : '16px',
                      color: isHovered ? item.color : '#fff',
                      textShadow: isHovered
                        ? `0 0 30px ${item.color}, 0 0 50px ${item.color}80`
                        : '0 0 20px rgba(255,255,255,0.4)',
                      fontWeight: isHovered ? '700' : '600',
                      background: isHovered
                        ? `linear-gradient(135deg, ${item.color}25, ${item.color}08)`
                        : 'rgba(0,0,0,0.6)',
                      border: isHovered ? `1.5px solid ${item.color}70` : '1px solid rgba(255,255,255,0.25)',
                      boxShadow: isHovered
                        ? `0 0 30px ${item.color}40, 0 6px 25px rgba(0,0,0,0.8)`
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
                          boxShadow: `0 0 15px ${item.color}`,
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Floating particles */}
            {[...Array(50)].map((_, i) => {
              const angle = (Math.random() * Math.PI * 2);
              const radius = 200 + Math.random() * 180;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={`particle-${i}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.7, 0],
                    scale: [0, 1.3, 0],
                  }}
                  transition={{
                    duration: 2.5 + Math.random() * 2.5,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                    ease: "easeInOut"
                  }}
                  className="absolute w-1 h-1 rounded-full pointer-events-none"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    background: i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#00D4FF' : '#A78BFA',
                    boxShadow: `0 0 10px ${i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#00D4FF' : '#A78BFA'}`,
                  }}
                />
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function DiamondSpinner() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredWord, setHoveredWord] = useState<string | null>(null);

  // Generate double-diamond spinning top structure
  const generateSpinningTopNodes = () => {
    const nodes = [];
    const layers = 25; // Many layers for dense mesh
    const maxRadius = 280; // Wide middle disc

    for (let layer = 0; layer < layers; layer++) {
      const t = layer / (layers - 1); // 0 to 1

      // Double diamond profile: narrow at top and bottom, VERY wide in middle
      // Create spinning top shape
      let radiusFactor;
      if (t < 0.5) {
        // Top half: cone expanding outward
        radiusFactor = t * 2; // 0 -> 1
      } else {
        // Bottom half: cone narrowing to point
        radiusFactor = (1 - t) * 2; // 1 -> 0
      }

      const radius = maxRadius * Math.pow(radiusFactor, 0.8); // Smoother curve
      const y = (t - 0.5) * 600; // Vertical position

      // Number of points per layer - more in the middle
      const numPoints = Math.max(3, Math.floor(24 * radiusFactor));

      if (numPoints <= 3) {
        // Apex points
        nodes.push({ x: 0, y: y, z: 0, layer, isApex: true });
      } else {
        // Multiple rings per layer for denser mesh
        const rings = radius > 200 ? 3 : radius > 100 ? 2 : 1;

        for (let ring = 0; ring < rings; ring++) {
          const ringRadius = radius * (1 - ring * 0.3);
          const ringPoints = Math.floor(numPoints * (1 - ring * 0.25));

          for (let i = 0; i < ringPoints; i++) {
            const angle = (i / ringPoints) * Math.PI * 2 + ring * 0.2;
            nodes.push({
              x: Math.cos(angle) * ringRadius,
              y: y + (Math.random() - 0.5) * 15, // Add slight randomness
              z: Math.sin(angle) * ringRadius,
              layer,
              ring,
              isApex: false
            });
          }
        }
      }
    }

    return nodes;
  };

  const nodes = generateSpinningTopNodes();

  // Generate dense mesh connections
  const generateConnections = () => {
    const connections = [];
    const maxDistance = 80; // Shorter distance for denser mesh

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dz = nodes[i].z - nodes[j].z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < maxDistance) {
          connections.push({
            from: i,
            to: j,
            distance
          });
        }
      }
    }
    return connections;
  };

  const connections = generateConnections();

  const useCases = [
    { text: 'Deepfake Detection', angle: 0, radius: 420, color: '#00FF88' },
    { text: 'KYC Verification', angle: 90, radius: 420, color: '#FFD700' },
    { text: 'Content Moderation', angle: 180, radius: 420, color: '#FF6B9D' },
    { text: 'Fraud Prevention', angle: 270, radius: 420, color: '#00D4FF' },
    { text: 'Identity Verification', angle: 45, radius: 480, color: '#A78BFA' },
    { text: 'Media Authentication', angle: 135, radius: 480, color: '#00FFFF' },
    { text: 'Trust & Safety', angle: 225, radius: 480, color: '#FF88FF' },
    { text: 'Brand Protection', angle: 315, radius: 480, color: '#88FF00' },
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

        {/* Spinning Top Diamond Structure */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative h-[700px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          {/* Rotating double-diamond mesh */}
          <motion.div
            animate={{
              rotateY: 360,
            }}
            transition={{
              rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
            }}
            className="absolute w-full h-full"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(70deg) rotateZ(0deg)', // Side angle like spinning top
              willChange: 'transform'
            }}
          >
            <svg
              viewBox="-450 -450 900 900"
              className="w-full h-full"
              style={{
                filter: 'drop-shadow(0 0 30px rgba(0, 255, 136, 0.2)) drop-shadow(0 0 60px rgba(0, 212, 255, 0.1))',
              }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#00D4FF" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                </linearGradient>
                <radialGradient id="nodeGrad">
                  <stop offset="0%" stopColor="#00FF88" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.6" />
                </radialGradient>
              </defs>

              {/* Dense mesh connections */}
              {connections.map((conn, i) => {
                const from = nodes[conn.from];
                const to = nodes[conn.to];
                const opacity = 0.08 + (1 - conn.distance / 80) * 0.15;

                return (
                  <line
                    key={`line-${i}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    stroke="url(#lineGrad)"
                    strokeWidth="0.5"
                    strokeOpacity={opacity}
                    strokeLinecap="round"
                  />
                );
              })}

              {/* Nodes */}
              {nodes.map((node, i) => {
                const isHighlight = i % 8 === 0 || node.isApex;
                const size = node.isApex ? 4 : (isHighlight ? 2.5 : 1.5);

                return (
                  <motion.circle
                    key={`node-${i}`}
                    cx={node.x}
                    cy={node.y}
                    r={size}
                    fill={node.isApex ? "#00FF88" : isHighlight ? "url(#nodeGrad)" : "#ffffff"}
                    opacity={node.isApex ? 0.9 : isHighlight ? 0.6 : 0.4}
                    style={{
                      filter: node.isApex
                        ? 'drop-shadow(0 0 10px #00FF88)'
                        : isHighlight
                        ? 'drop-shadow(0 0 4px rgba(0, 255, 136, 0.5))'
                        : 'none'
                    }}
                  />
                );
              })}
            </svg>
          </motion.div>

          {/* Use case labels - properly distributed in circle around spinner */}
          {useCases.map((item, i) => {
            const isHovered = hoveredWord === item.text;

            // Calculate position in circle around spinner
            const angleRad = (item.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * item.radius;
            const y = Math.sin(angleRad) * item.radius;

            return (
              <motion.div
                key={`label-${i}`}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isInView ? {
                  opacity: hoveredWord && !isHovered ? 0.3 : 1,
                  scale: isHovered ? 1.1 : 1,
                } : { opacity: 0, scale: 0.7 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.08,
                  scale: { duration: 0.2, ease: "easeOut" }
                }}
                className="absolute cursor-pointer whitespace-nowrap select-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                onMouseEnter={() => setHoveredWord(item.text)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                <div
                  className="relative px-4 py-2 rounded-lg backdrop-blur-md transition-all duration-200"
                  style={{
                    fontSize: isHovered ? '20px' : '17px',
                    color: isHovered ? item.color : '#fff',
                    textShadow: isHovered
                      ? `0 0 30px ${item.color}, 0 0 50px ${item.color}80`
                      : '0 0 20px rgba(255,255,255,0.4)',
                    fontWeight: isHovered ? '700' : '600',
                    background: isHovered
                      ? `linear-gradient(135deg, ${item.color}20, ${item.color}05)`
                      : 'rgba(0,0,0,0.5)',
                    border: isHovered ? `1.5px solid ${item.color}60` : '1px solid rgba(255,255,255,0.2)',
                    boxShadow: isHovered
                      ? `0 0 25px ${item.color}30, 0 5px 20px rgba(0,0,0,0.7)`
                      : '0 3px 15px rgba(0,0,0,0.6)',
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

          {/* Scattered particles */}
          {[...Array(60)].map((_, i) => {
            const angle = (Math.random() * Math.PI * 2);
            const radius = 200 + Math.random() * 150;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={`particle-${i}`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scale: [0, 1.2, 0],
                }}
                transition={{
                  duration: 2 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 5,
                  ease: "easeInOut"
                }}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(${x}px, ${y}px)`,
                  background: i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#00D4FF' : '#A78BFA',
                  boxShadow: `0 0 8px ${i % 3 === 0 ? '#00FF88' : i % 3 === 1 ? '#00D4FF' : '#A78BFA'}`,
                }}
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden premium-grid">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,136,0.08)_0%,transparent_70%)]" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Main number - clean and HUGE */}
          <motion.h1
            className="text-8xl md:text-[12rem] font-bold mb-6 leading-none tracking-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <span className="gradient-text number-glow">$410M</span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl font-semibold text-white/90 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            stolen in 6 months
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-white/50 mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Deepfakes are everywhere.{' '}
            <span className="text-bitmind-accent font-medium">Stop them with BitMind.</span>
          </motion.p>

          {/* CTAs - premium style */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#game"
              className="group px-10 py-4 bg-bitmind-accent text-black font-semibold rounded-xl text-lg hover:glow transition-all duration-300 transform hover:scale-105 shimmer"
            >
              Spot the Fake
            </a>
            <a
              href="#demo"
              className="px-10 py-4 glass rounded-xl text-white font-semibold text-lg hover-glow transition-all duration-300"
            >
              Try API Demo
            </a>
          </motion.div>

          {/* Trust badges - premium glassmorphism */}
          <motion.div
            className="flex gap-4 justify-center items-center flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <div className="glass px-6 py-3 rounded-full backdrop-blur-xl">
              <span className="text-bitmind-accent font-semibold">88%</span>
              <span className="text-white/70 ml-2">Accuracy</span>
            </div>
            <div className="glass px-6 py-3 rounded-full backdrop-blur-xl">
              <span className="text-cyan-400 font-semibold">&lt;100ms</span>
              <span className="text-white/70 ml-2">Latency</span>
            </div>
            <div className="glass px-6 py-3 rounded-full backdrop-blur-xl">
              <span className="text-purple-400 font-semibold">Zero</span>
              <span className="text-white/70 ml-2">Data Retention</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
          <motion.div
            className="w-1.5 h-3 bg-bitmind-accent rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}

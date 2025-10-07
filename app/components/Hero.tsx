'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,136,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,136,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hook - REAL VERIFIED NUMBER */}
          <motion.h1
            className="text-7xl md:text-9xl font-bold mb-6 leading-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="gradient-text">$410M</span>
          </motion.h1>

          <motion.p
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            stolen in 6 months.
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Deepfakes are everywhere. <span className="text-bitmind-accent font-semibold">Stop them.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a
              href="#game"
              className="px-10 py-5 bg-bitmind-accent text-black font-bold rounded-lg text-xl hover:glow transition-all duration-300 transform hover:scale-105"
            >
              Spot the Fake
            </a>
            <a
              href="#demo"
              className="px-10 py-5 border-2 border-white/20 text-white font-semibold rounded-lg text-xl hover:border-bitmind-accent hover:text-bitmind-accent transition-all duration-300"
            >
              Try API
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 flex gap-6 justify-center items-center flex-wrap text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span className="px-4 py-2 border border-white/10 rounded-full">88% Accuracy</span>
            <span className="px-4 py-2 border border-white/10 rounded-full">Real-time</span>
            <span className="px-4 py-2 border border-white/10 rounded-full">Zero Retention</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-bitmind-accent rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}

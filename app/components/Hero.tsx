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
          transition={{ duration: 0.8 }}
        >
          {/* Hook - grab attention in 3 seconds */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="gradient-text">$200M stolen</span>
            <br />
            <span className="text-white">in 90 days.</span>
          </motion.h1>

          <motion.p
            className="text-2xl md:text-3xl text-gray-400 mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Deepfakes are everywhere.
            <br />
            <span className="text-white font-semibold">Detect them instantly.</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href="#demo"
              className="px-8 py-4 bg-bitmind-accent text-black font-bold rounded-lg text-lg hover:glow transition-all duration-300 transform hover:scale-105"
            >
              Try Live Demo
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg text-lg hover:border-bitmind-accent hover:text-bitmind-accent transition-all duration-300"
            >
              View Pricing
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            className="mt-16 text-gray-500 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="mb-4">TRUSTED BY LEADING PLATFORMS</p>
            <div className="flex gap-8 justify-center items-center flex-wrap opacity-50">
              <span className="text-lg">88% Accuracy</span>
              <span className="text-lg">•</span>
              <span className="text-lg">GDPR Compliant</span>
              <span className="text-lg">•</span>
              <span className="text-lg">Zero Data Retention</span>
            </div>
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

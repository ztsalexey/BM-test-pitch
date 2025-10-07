'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden cyber-grid">
      {/* Scanline effect overlay */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Pixel corruption overlay */}
      <div className="absolute inset-0 pixel-corrupt pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Glitchy header */}
          <motion.div
            className="mb-4 text-bitmind-accent font-bold tracking-widest text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {'>'} DEEPFAKE_CRISIS.EXE
          </motion.div>

          {/* Main number with RGB split glitch */}
          <motion.h1
            className="text-8xl md:text-9xl font-bold mb-6 leading-none relative glitch"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            data-text="$410M"
          >
            <span className="gradient-text holographic bg-clip-text">$410M</span>
          </motion.h1>

          <motion.p
            className="text-3xl md:text-4xl font-bold text-white mb-4 deepfake-distort"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            stolen in 6 months.
          </motion.p>

          <motion.p
            className="text-xl md:text-2xl text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {'[ '}<span className="text-red-400">DEEPFAKES_EVERYWHERE</span>{' ]'}<br />
            <span className="text-bitmind-accent font-bold">{'> STOP_THEM.NOW()'}</span>
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <a
              href="#game"
              className="group px-10 py-5 bg-bitmind-accent text-black font-bold rounded-lg text-xl hover:glow transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
            >
              <span className="relative z-10">{'> SPOT_THE_FAKE'}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </a>
            <a
              href="#demo"
              className="px-10 py-5 border-2 border-bitmind-accent/50 text-white font-bold rounded-lg text-xl hover:border-bitmind-accent hover:bg-bitmind-accent/10 transition-all duration-300"
            >
              {'> TRY_API'}
            </a>
          </motion.div>

          {/* Tech badges with pixel style */}
          <motion.div
            className="mt-16 flex gap-4 justify-center items-center flex-wrap text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="px-4 py-2 border border-bitmind-accent/30 rounded bg-bitmind-accent/5 font-mono">
              <span className="text-bitmind-accent">88%</span> ACCURACY
            </div>
            <div className="px-4 py-2 border border-cyan-500/30 rounded bg-cyan-500/5 font-mono">
              <span className="text-cyan-400">{'<100MS'}</span> LATENCY
            </div>
            <div className="px-4 py-2 border border-purple-500/30 rounded bg-purple-500/5 font-mono">
              <span className="text-purple-400">ZERO</span> RETENTION
            </div>
          </motion.div>

          {/* Binary decoration */}
          <motion.div
            className="mt-8 text-xs text-gray-700 font-mono opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            01100010 01101001 01110100 01101101 01101001 01101110 01100100
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with glitch */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 glitch"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-bitmind-accent/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-bitmind-accent rounded-full animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}

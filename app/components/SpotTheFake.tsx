'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function SpotTheFake() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  // Simulated images - in production, use real images
  const images = [
    { id: 1, label: 'IMAGE_A', isAI: false },
    { id: 2, label: 'IMAGE_B', isAI: true },
    { id: 3, label: 'IMAGE_C', isAI: false },
  ];

  const handleSelect = (id: number, isAI: boolean) => {
    setSelectedImage(id);
    setShowResult(true);
    setAttempts(attempts + 1);
    if (isAI) {
      setScore(score + 1);
    }
  };

  const resetGame = () => {
    setSelectedImage(null);
    setShowResult(false);
  };

  return (
    <section
      id="game"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden"
    >
      {/* Pixel corruption background */}
      <div className="absolute inset-0 pixel-corrupt opacity-50" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="text-sm font-mono text-bitmind-accent mb-4 tracking-wider">
            {'> DETECTION_TEST.RUN()'}
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-6 glitch" data-text="spot the fake?">
            Can you <span className="gradient-text holographic bg-clip-text">spot the fake?</span>
          </h2>
          <p className="text-xl text-gray-400 font-mono">
            {'[ '}<span className="text-red-400">MOST_HUMANS_FAIL</span>{' ]'}
          </p>
        </motion.div>

        {!showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-center text-gray-500 mb-8 font-mono">
              {'> SELECT DEEPFAKE:'} <span className="text-bitmind-accent animate-pulse">_</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  onClick={() => handleSelect(img.id, img.isAI)}
                  className="relative bg-bitmind-gray border-2 border-bitmind-accent/20 rounded-lg p-4 cursor-pointer hover:border-bitmind-accent transition-all duration-300 hover:scale-105 group scanline"
                >
                  {/* Pixelated placeholder */}
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 cyber-grid opacity-30" />
                    <span className="text-6xl font-bold text-white/20 font-mono relative z-10">
                      {img.label}
                    </span>
                    {/* Glitch overlay on hover */}
                    <div className="absolute inset-0 bg-bitmind-accent/0 group-hover:bg-bitmind-accent/10 transition-all duration-300" />
                  </div>
                  <div className="text-center">
                    <button className="w-full px-6 py-3 bg-black/50 border border-bitmind-accent/30 rounded font-mono font-bold group-hover:bg-bitmind-accent group-hover:text-black group-hover:border-bitmind-accent transition-all duration-300">
                      {'> SELECT_'}{img.label.split('_')[1]}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-bitmind-gray border-2 border-bitmind-accent rounded-2xl p-12 text-center relative overflow-hidden scanline"
          >
            {selectedImage === 2 ? (
              <>
                <div className="text-7xl mb-6 glitch">✓</div>
                <h3 className="text-4xl font-bold gradient-text holographic bg-clip-text mb-4 font-mono">
                  DETECTION_SUCCESS
                </h3>
                <p className="text-xl text-gray-400 mb-8 font-mono">
                  {'> '}<span className="text-bitmind-accent">IMAGE_B</span> was AI-generated
                  <br />
                  {'[ BUT_CAN_YOU_TELL_IN_REALTIME? ]'}
                </p>
              </>
            ) : (
              <>
                <div className="text-7xl mb-6 text-red-500 deepfake-distort">✗</div>
                <h3 className="text-4xl font-bold text-red-400 mb-4 font-mono">
                  DETECTION_FAILED
                </h3>
                <p className="text-xl text-gray-400 mb-8 font-mono">
                  {'> '}<span className="text-red-400">IMAGE_B</span> was the deepfake
                  <br />
                  {'[ EVEN_EXPERTS_STRUGGLE ]'}
                </p>
              </>
            )}

            <div className="bg-black/50 border border-bitmind-accent/30 rounded-xl p-6 mb-8">
              <p className="text-2xl font-bold mb-2 font-mono">
                ACCURACY: <span className="gradient-text">{score}/{attempts}</span>
              </p>
              <p className="text-gray-500 font-mono text-sm">
                {'> BitMind: '}<span className="text-bitmind-accent">88%</span> @ {'<100ms'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-black/50 border-2 border-bitmind-accent/30 rounded-lg font-mono font-bold hover:border-bitmind-accent hover:bg-bitmind-accent/10 transition-all duration-300"
              >
                {'> RETRY'}
              </button>
              <a
                href="#demo"
                className="px-8 py-4 bg-bitmind-accent text-black font-mono font-bold rounded-lg hover:glow transition-all duration-300"
              >
                {'> TRY_REAL_API'}
              </a>
            </div>
          </motion.div>
        )}

        {/* Stats with glitch effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { num: '1,300%', label: 'FRAUD_SURGE', color: 'text-red-400' },
            { num: '8M', label: 'DEEPFAKES_ONLINE', color: 'text-yellow-400' },
            { num: '$25M', label: 'SINGLE_LOSS', color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-black/30 border border-white/10 rounded-lg p-6 pixel-corrupt">
              <div className={`text-3xl font-bold ${stat.color} mb-2 font-mono glitch`}>
                {stat.num}
              </div>
              <p className="text-gray-500 font-mono text-sm">{'> '}{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

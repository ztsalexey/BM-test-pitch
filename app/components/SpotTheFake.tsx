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

  const images = [
    { id: 1, label: 'A', isAI: false },
    { id: 2, label: 'B', isAI: true }, // This one is fake - will have glitch
    { id: 3, label: 'C', isAI: false },
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
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Can you <span className="gradient-text">spot the fake?</span>
          </h2>
          <p className="text-xl text-white/60">
            Most people can't. <span className="text-white/90">That's the problem.</span>
          </p>
        </motion.div>

        {!showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-center text-white/50 mb-10 text-lg">
              One of these images is AI-generated. Which one?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                  onClick={() => handleSelect(img.id, img.isAI)}
                  className={`relative glass rounded-2xl p-6 cursor-pointer card-hover ${
                    img.isAI ? 'fake-glitch' : ''
                  }`}
                >
                  {/* Clean placeholder with scan effect */}
                  <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-xl mb-6 flex items-center justify-center relative overflow-hidden scan-effect">
                    <span className="text-7xl font-bold text-white/10">
                      {img.label}
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="w-full px-6 py-3 glass rounded-lg font-medium hover-glow transition-all duration-300">
                      Select Image {img.label}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {selectedImage === 2 ? (
              <>
                <div className="text-7xl mb-6">✓</div>
                <h3 className="text-4xl font-bold gradient-text mb-4">
                  Correct!
                </h3>
                <p className="text-xl text-white/70 mb-8 max-w-xl mx-auto">
                  Image B was AI-generated. But could you tell in real-time?
                </p>
              </>
            ) : (
              <>
                <div className="text-7xl mb-6 text-red-500">✗</div>
                <h3 className="text-4xl font-bold text-red-400 mb-4">
                  Wrong
                </h3>
                <p className="text-xl text-white/70 mb-8 max-w-xl mx-auto">
                  Image B was the deepfake. Even experts struggle.
                </p>
              </>
            )}

            <div className="glass rounded-2xl p-8 mb-8 max-w-md mx-auto">
              <p className="text-2xl font-bold mb-2">
                Your Score: <span className="gradient-text">{score}/{attempts}</span>
              </p>
              <p className="text-white/50 text-sm">
                BitMind detects these with <span className="text-bitmind-accent">88%</span> accuracy in <span className="text-cyan-400">&lt;100ms</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 glass rounded-xl font-medium hover-glow transition-all duration-300"
              >
                Try Again
              </button>
              <a
                href="#demo"
                className="px-8 py-4 bg-bitmind-accent text-black font-semibold rounded-xl hover:glow transition-all duration-300 shimmer"
              >
                Try Real API
              </a>
            </div>
          </motion.div>
        )}

        {/* Stats - premium cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          {[
            { num: '1,300%', label: 'surge in deepfake fraud', color: 'text-red-400' },
            { num: '8M', label: 'deepfakes online now', color: 'text-yellow-400' },
            { num: '$25M', label: 'single company loss', color: 'text-purple-400' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-8 card-hover">
              <div className={`text-4xl font-bold ${stat.color} mb-2`}>
                {stat.num}
              </div>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

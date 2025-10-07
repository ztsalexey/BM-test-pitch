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
    { id: 1, label: 'A', isAI: false },
    { id: 2, label: 'B', isAI: true },
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
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            Can you <span className="gradient-text">spot the fake?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Most people can't. That's the problem.
          </p>
        </motion.div>

        {!showResult ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-center text-gray-500 mb-8">
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
                  className="relative bg-bitmind-gray border-2 border-white/10 rounded-2xl p-4 cursor-pointer hover:border-bitmind-accent transition-all duration-300 hover:scale-105 group"
                >
                  {/* Placeholder for actual image */}
                  <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl mb-4 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/20">
                      {img.label}
                    </span>
                  </div>
                  <div className="text-center">
                    <button className="px-6 py-3 bg-white/5 border border-white/20 rounded-lg font-semibold group-hover:bg-bitmind-accent group-hover:text-black group-hover:border-bitmind-accent transition-all duration-300">
                      Select {img.label}
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
            className="bg-bitmind-gray border-2 border-bitmind-accent rounded-3xl p-12 text-center"
          >
            {selectedImage === 2 ? (
              <>
                <div className="text-7xl mb-6">✅</div>
                <h3 className="text-4xl font-bold gradient-text mb-4">
                  Correct!
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                  Image B was AI-generated. But could you tell in real-time?
                </p>
              </>
            ) : (
              <>
                <div className="text-7xl mb-6">❌</div>
                <h3 className="text-4xl font-bold text-red-400 mb-4">
                  Wrong!
                </h3>
                <p className="text-xl text-gray-400 mb-8">
                  Image B was the deepfake. Even experts struggle.
                </p>
              </>
            )}

            <div className="bg-bitmind-dark rounded-xl p-6 mb-8">
              <p className="text-2xl font-bold mb-2">
                Your Score: <span className="gradient-text">{score}/{attempts}</span>
              </p>
              <p className="text-gray-500">
                BitMind detects these with 88% accuracy in &lt;100ms
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-white/5 border border-white/20 rounded-lg font-semibold hover:border-bitmind-accent hover:text-bitmind-accent transition-all duration-300"
              >
                Try Again
              </button>
              <a
                href="#demo"
                className="px-8 py-4 bg-bitmind-accent text-black font-bold rounded-lg hover:glow transition-all duration-300"
              >
                Try Real API
              </a>
            </div>
          </motion.div>
        )}

        {/* Stats below game */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-bitmind-gray border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">1,300%</div>
            <p className="text-gray-500">surge in deepfake fraud</p>
          </div>
          <div className="bg-bitmind-gray border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">8M</div>
            <p className="text-gray-500">deepfakes online now</p>
          </div>
          <div className="bg-bitmind-gray border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold gradient-text mb-2">$25M</div>
            <p className="text-gray-500">single company loss</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

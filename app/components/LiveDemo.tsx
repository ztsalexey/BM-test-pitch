'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';

export default function LiveDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{ score: number; isAI: boolean } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsAnalyzing(true);
    setResult(null);

    // Simulate API call - replace with actual BitMind API call
    setTimeout(() => {
      // Mock result - replace with real API response
      const mockScore = Math.random();
      setResult({
        score: mockScore,
        isAI: mockScore > 0.5,
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type.startsWith('image/') || file.type.startsWith('video/'))) {
      const input = document.getElementById('file-input') as HTMLInputElement;
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;
      handleFileUpload({ target: input } as any);
    }
  };

  return (
    <section
      id="demo"
      ref={ref}
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-bitmind-gray"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Try It <span className="gradient-text">Live</span>
          </h2>
          <p className="text-xl text-gray-400">
            Upload an image or video and see our detection in action.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-bitmind-dark border border-white/10 rounded-3xl p-8 md:p-12"
        >
          {/* Upload Area */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-bitmind-accent/50 transition-all duration-300 cursor-pointer"
          >
            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-input" className="cursor-pointer">
              <div className="text-6xl mb-4">📤</div>
              <p className="text-xl font-semibold mb-2">Drop a file or click to upload</p>
              <p className="text-gray-500">Supports images and videos</p>
            </label>
          </div>

          {/* Analysis State */}
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 text-center"
            >
              <div className="inline-block w-16 h-16 border-4 border-bitmind-accent/30 border-t-bitmind-accent rounded-full animate-spin mb-4" />
              <p className="text-lg text-gray-400">Analyzing with AI models...</p>
            </motion.div>
          )}

          {/* Results */}
          {result && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <div className="bg-bitmind-gray rounded-2xl p-8 border-2 border-bitmind-accent/50">
                <div className="text-center mb-6">
                  <div className="text-7xl font-bold gradient-text mb-2">
                    {(result.score * 100).toFixed(1)}%
                  </div>
                  <p className="text-xl text-gray-400">Confidence Score</p>
                </div>
                <div className="flex items-center justify-center gap-4">
                  <div
                    className={`px-6 py-3 rounded-full font-bold text-lg ${
                      result.isAI
                        ? 'bg-red-500/20 text-red-400 border-2 border-red-500'
                        : 'bg-green-500/20 text-green-400 border-2 border-green-500'
                    }`}
                  >
                    {result.isAI ? '🚨 Likely AI-Generated' : '✅ Likely Authentic'}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setResult(null);
                  }}
                  className="mt-6 w-full py-3 border border-white/20 rounded-lg hover:border-bitmind-accent hover:text-bitmind-accent transition-all duration-300"
                >
                  Try Another File
                </button>
              </div>
            </motion.div>
          )}

          {/* API Code Example */}
          {!selectedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 bg-black/50 rounded-xl p-6 border border-white/5"
            >
              <p className="text-sm text-gray-500 mb-3">Or integrate via API:</p>
              <code className="text-sm text-bitmind-accent block overflow-x-auto">
                <span className="text-gray-500">curl</span> -X POST https://enterprise.bitmind.ai/image \<br />
                <span className="ml-4 text-gray-500">-H</span> "Authorization: Bearer YOUR_API_KEY" \<br />
                <span className="ml-4 text-gray-500">--data-binary</span> "@image.jpg"
              </code>
            </motion.div>
          )}
        </motion.div>

        {/* CTA below demo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="https://docs.bitmind.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bitmind-accent hover:underline font-semibold"
          >
            View Full API Documentation →
          </a>
        </motion.div>
      </div>
    </section>
  );
}

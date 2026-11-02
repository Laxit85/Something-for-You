import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onFinish: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9F0] overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Soft dreamy background glow */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#F5DCE5] via-[#E7DDF5] to-[#F9DCCB] blur-3xl opacity-60 animate-pulse-soft" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Animated Blooming Flower */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Blooming petals SVG */}
            <svg viewBox="0 0 100 100" className="w-28 h-28 filter drop-shadow-md">
              {/* Stem and gentle leaves */}
              <motion.path
                d="M50 85 Q50 65 50 50"
                stroke="#A8C3A0"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
              <motion.path
                d="M50 70 Q35 65 38 58 Q46 62 50 68"
                fill="#C2D8BC"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              <motion.path
                d="M50 64 Q65 60 62 52 Q54 58 50 62"
                fill="#C2D8BC"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              />

              {/* Flower Petals (8 soft blush petals blooming outward) */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.ellipse
                  key={i}
                  cx="50"
                  cy="35"
                  rx="9"
                  ry="16"
                  fill={i % 2 === 0 ? '#F5DCE5' : '#DFAFC2'}
                  transform={`rotate(${angle} 50 50)`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.92 }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                />
              ))}

              {/* Golden Center Bulb */}
              <motion.circle
                cx="50"
                cy="50"
                r="7"
                fill="#FFE8A3"
                stroke="#F9DCCB"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: 'backOut' }}
              />
            </svg>

            {/* Little twinkling surrounding stars */}
            {[
              { top: '10%', left: '15%', delay: 0.6 },
              { top: '15%', right: '15%', delay: 0.9 },
              { bottom: '20%', left: '10%', delay: 1.1 },
              { bottom: '25%', right: '12%', delay: 0.8 },
              { top: '4%', left: '50%', delay: 1.3 },
            ].map((star, idx) => (
              <motion.div
                key={idx}
                className="absolute text-yellow-300 text-sm select-none"
                style={{ top: star.top, left: star.left, right: star.right }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.8] }}
                transition={{
                  delay: star.delay,
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              >
                ✦
              </motion.div>
            ))}
          </div>

          {/* Text and subtle loading progress */}
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <p className="font-serif-title italic text-2xl text-[#49364F] tracking-wide mb-3">
              Preparing a little happiness for you...
            </p>

            {/* Cute mini progress bar */}
            <div className="w-48 h-1.5 bg-[#E7DDF5] rounded-full overflow-hidden mx-auto shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#DFAFC2] via-[#F9DCCB] to-[#F5DCE5] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
            <p className="text-xs text-[#49364F]/60 mt-2 font-medium tracking-widest uppercase">
              {progress}%
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

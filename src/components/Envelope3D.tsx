import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface Envelope3DProps {
  onOpened: () => void;
}

export const Envelope3D: React.FC<Envelope3DProps> = ({ onOpened }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);

    // Audio SFX
    audio.playRustle();
    audio.playChime(659.25);
    setTimeout(() => audio.playSparkle(), 300);

    // Trigger sweet confetti burst with pastel colors
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F5DCE5', '#E7DDF5', '#F9DCCB', '#DFAFC2', '#FFE8A3'],
      shapes: ['circle'],
      scalar: 1.2,
    });

    // Flap opens
    setTimeout(() => {
      setIsOpen(true);
      // Wait for letter to emerge and user to enjoy before scrolling
      setTimeout(() => {
        onOpened();
      }, 2600);
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center my-6">
      {/* 3D Envelope Container with Perspective */}
      <div
        className="relative w-72 sm:w-80 h-52 sm:h-56 cursor-pointer select-none transition-transform duration-500 hover:scale-[1.03]"
        style={{ perspective: '1200px' }}
        onClick={handleOpen}
      >
        {/* Soft Shadow below envelope */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#49364F]/15 rounded-full blur-xl transform transition-all duration-700" />

        {/* Envelope Back Shell */}
        <div className="absolute inset-0 bg-[#E8CBD7] rounded-2xl shadow-lg border border-white/70 overflow-hidden">
          {/* Inner lining with cute pastel floral pattern */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5DCE5] to-[#E7DDF5] opacity-90 p-4">
            <div className="w-full h-full border border-dashed border-[#DFAFC2]/50 rounded-xl flex items-center justify-center">
              <span className="text-3xl opacity-20">🌸</span>
            </div>
          </div>
        </div>

        {/* The Letter that slides out */}
        <motion.div
          className="absolute left-4 right-4 h-48 bg-[#FFF9F0] rounded-xl p-5 shadow-md border border-[#F5DCE5] flex flex-col justify-between z-10"
          initial={{ y: 0 }}
          animate={{
            y: isOpen ? -110 : 0,
            scale: isOpen ? 1.02 : 0.95,
          }}
          transition={{
            duration: 1.2,
            delay: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <div className="flex items-center justify-between border-b border-[#F5DCE5]/60 pb-2">
            <span className="font-serif-title italic text-sm text-[#49364F]/70">Special Delivery</span>
            <span className="text-sm">🌷</span>
          </div>

          <div className="text-center my-auto">
            <p className="font-handwriting text-2xl text-[#49364F] font-bold">
              Dearest Subhi,
            </p>
            <p className="font-serif-title text-sm italic text-[#49364F]/80 mt-1">
              "A little world made with love, just to make you smile..."
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-[#DFAFC2] font-semibold">
            <span>Scroll down to explore</span>
            <span>↓</span>
          </div>
        </motion.div>

        {/* Envelope Front Left & Right Fold Triangles */}
        <div
          className="absolute inset-0 z-20 pointer-events-none rounded-2xl overflow-hidden"
        >
          {/* Bottom Fold */}
          <div
            className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-[#F5DCE5] to-[#E7DDF5] border-t border-white/80"
            style={{
              clipPath: 'polygon(0 100%, 50% 35%, 100% 100%)',
            }}
          />
          {/* Left Fold */}
          <div
            className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#F2D3DF] to-[#E8CCD8] border-r border-white/60 opacity-95"
            style={{
              clipPath: 'polygon(0 0, 50% 50%, 0 100%)',
            }}
          />
          {/* Right Fold */}
          <div
            className="absolute inset-y-0 right-0 w-44 bg-gradient-to-l from-[#F2D3DF] to-[#E8CCD8] border-l border-white/60 opacity-95"
            style={{
              clipPath: 'polygon(100% 0, 50% 50%, 100% 100%)',
            }}
          />
        </div>

        {/* Top Flap (folds open upwards in 3D) */}
        <motion.div
          className="absolute inset-x-0 top-0 h-32 z-30 origin-top"
          style={{
            transformStyle: 'preserve-3d',
          }}
          initial={{ rotateX: 0 }}
          animate={{
            rotateX: isOpen || isOpening ? 180 : 0,
            zIndex: isOpen ? 5 : 30,
          }}
          transition={{
            duration: 0.9,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <div
            className="w-full h-full bg-gradient-to-b from-[#FADEE8] to-[#E7D0DC] border-b border-white/90 shadow-sm"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            }}
          />
        </motion.div>

        {/* Heart-shaped Wax Seal */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40"
              initial={{ scale: 1 }}
              animate={{
                scale: isOpening ? [1, 1.25, 0] : 1,
                opacity: isOpening ? [1, 1, 0] : 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#DFAFC2] via-[#E88EAF] to-[#F5DCE5] flex items-center justify-center shadow-lg border-2 border-white/90">
                <span className="text-lg filter drop-shadow">💖</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <motion.button
          onClick={handleOpen}
          disabled={isOpen || isOpening}
          className={`relative px-8 py-3.5 rounded-full font-serif-title text-lg tracking-wide text-[#49364F] font-semibold transition-all duration-300 shadow-md ${
            isOpen
              ? 'opacity-60 cursor-default bg-white/60'
              : 'glass-button hover:shadow-xl active:scale-95 cursor-pointer'
          }`}
          whileHover={{ scale: isOpen ? 1 : 1.05 }}
          whileTap={{ scale: isOpen ? 1 : 0.96 }}
        >
          <span className="relative z-10 flex items-center gap-2">
            {isOpen ? 'Surprise Unlocked! 🌸' : 'Open Your Little Surprise ✨'}
          </span>
        </motion.button>
      </div>
    </div>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Envelope3D } from '../components/Envelope3D';

interface HeroSectionProps {
  onOpenNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenNext }) => {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-20 overflow-hidden"
    >
      {/* Centered Content Container */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        {/* Soft tag above headline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[#49364F] mb-6 shadow-sm border border-white/70"
        >
          <span className="text-base">🌷</span>
          <span className="font-sans-body font-semibold text-sm tracking-wider uppercase text-[#49364F]/90">
            Hey, Subhi!
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-serif-title text-4xl sm:text-5xl md:text-6xl text-[#49364F] font-normal leading-tight tracking-tight mb-5"
        >
          Something Special,{' '}
          <span className="italic font-serif-title bg-gradient-to-r from-[#DFAFC2] via-[#B87D94] to-[#49364F] bg-clip-text text-transparent">
            Just for You.
          </span>
        </motion.h1>

        {/* Dedicated Message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="font-sans-body text-base sm:text-lg text-[#49364F]/85 font-normal max-w-xl mx-auto leading-relaxed mb-8"
        >
          Maybe I can't fix your mood, but I can always try to make you smile, even if it's just a little.
        </motion.p>

        {/* 3D Envelope and Interaction */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
          className="w-full flex justify-center"
        >
          <Envelope3D onOpened={onOpenNext} />
        </motion.div>
      </div>

      {/* Subtle indicator arrow at the bottom */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center text-xs text-[#49364F]/50 font-medium tracking-widest uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span>scroll gently</span>
        <span className="text-base mt-0.5">↓</span>
      </motion.div>
    </section>
  );
};

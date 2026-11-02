import React from 'react';
import { motion } from 'framer-motion';
import { HappinessGarden } from '../components/HappinessGarden';
import { Sparkles } from 'lucide-react';

export const GardenSection: React.FC = () => {
  return (
    <section
      id="garden-section"
      className="relative min-h-screen py-24 px-4 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Soft Ambient Background Blooms */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#F5DCE5]/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#E8F5E5]/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/60 border border-[#DFAFC2]/40 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#C97B99]" />
            <span className="font-sans-body text-xs font-bold uppercase tracking-wider text-[#B87D94]">
              Interactive Meadow
            </span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#49364F] font-normal italic leading-tight">
            Let's Grow a Little Happiness 🌷
          </h2>
          <p className="font-sans-body text-base sm:text-lg text-[#49364F]/80 mt-3">
            Every flower holds a gentle reminder meant just for you. Tap each one to gather your bouquet.
          </p>
        </motion.div>

        {/* The Interactive Garden */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
        >
          <HappinessGarden />
        </motion.div>
      </div>
    </section>
  );
};

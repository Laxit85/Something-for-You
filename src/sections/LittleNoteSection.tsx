import React from 'react';
import { motion } from 'framer-motion';

export const LittleNoteSection: React.FC = () => {
  const paragraphs = [
    "Hey Ma'am,",
    "I don't know exactly how your day has been, or what's going on in your mind right now.",
    "But I thought maybe a little surprise could make things a tiny bit better.",
    "You don't have to be happy every second.\nYou don't have to pretend that everything is okay.",
    "Sometimes, it's perfectly fine to take a break, do nothing, and just breathe.",
    "So, for the next few moments, forget everything else.",
    "This little world is just for you."
  ];

  return (
    <section
      id="note-section"
      className="relative min-h-screen py-24 px-4 flex items-center justify-center overflow-hidden"
    >
      {/* Background Soft Pastel Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[5%] w-80 h-32 bg-white/50 rounded-full blur-2xl animate-gentle-float" />
        <div className="absolute bottom-16 right-[8%] w-96 h-40 bg-[#E7DDF5]/40 rounded-full blur-2xl animate-pulse-soft" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans-body text-xs font-semibold uppercase tracking-widest text-[#DFAFC2] block mb-2">
            A Gentle Reminder
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#49364F] font-normal italic">
            Before Anything Else...
          </h2>
        </motion.div>

        {/* Main Note Card */}
        <motion.div
          className="glass-card rounded-3xl p-8 sm:p-12 md:p-14 relative shadow-xl border border-white/80 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative Corner Ribbon / Flower Accent */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-gradient-to-br from-[#F5DCE5] to-[#E7DDF5] rounded-full blur-xl opacity-60" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Note Text with Word/Paragraph Reveal */}
            <div className="md:col-span-8 space-y-5">
              {paragraphs.map((text, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 * idx,
                    ease: 'easeOut',
                  }}
                  className={`font-sans-body text-[#49364F] leading-relaxed ${
                    idx === 0
                      ? 'font-handwriting text-3xl sm:text-4xl text-[#49364F] font-bold pb-1'
                      : idx === paragraphs.length - 1
                      ? 'font-serif-title italic text-xl sm:text-2xl text-[#B87D94] pt-2 font-medium'
                      : 'text-base sm:text-lg text-[#49364F]/85 font-medium'
                  }`}
                >
                  {text.split('\n').map((line, lIdx) => (
                    <p key={lIdx} className={lIdx > 0 ? 'mt-1' : ''}>
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Animated Flower Beside Text */}
            <div className="md:col-span-4 flex flex-col items-center justify-center pt-4 md:pt-0">
              <motion.div
                className="relative p-6 rounded-2xl bg-white/40 border border-white/60 shadow-sm flex flex-col items-center group cursor-pointer"
                whileHover={{ scale: 1.05 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="w-28 h-28 relative flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                    {/* Stem & Leaves */}
                    <path
                      d="M50 90 Q48 70 50 48"
                      stroke="#8FA686"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <motion.ellipse
                      cx="40"
                      cy="70"
                      rx="8"
                      ry="4"
                      fill="#A7BE9E"
                      transform="rotate(-25 40 70)"
                      animate={{ rotate: [-25, -20, -25] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.ellipse
                      cx="60"
                      cy="62"
                      rx="8"
                      ry="4"
                      fill="#A7BE9E"
                      transform="rotate(25 60 62)"
                      animate={{ rotate: [25, 20, 25] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Rose/Tulip Petals */}
                    <motion.path
                      d="M50 48 C30 48 28 25 50 16 C72 25 70 48 50 48 Z"
                      fill="#F5DCE5"
                      stroke="#DFAFC2"
                      strokeWidth="1.5"
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    <path
                      d="M50 48 C38 42 36 28 50 20 C64 28 62 42 50 48 Z"
                      fill="#DFAFC2"
                      opacity="0.85"
                    />
                    <path
                      d="M50 48 C44 45 42 34 50 26 C58 34 56 45 50 48 Z"
                      fill="#E88EAF"
                      opacity="0.9"
                    />
                  </svg>
                </div>
                <span className="font-handwriting text-lg text-[#49364F]/80 mt-2 font-semibold">
                  A flower for Subhi 🌸
                </span>
                <span className="text-[11px] text-[#49364F]/50 uppercase tracking-widest mt-0.5">
                  stay gentle with yourself
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

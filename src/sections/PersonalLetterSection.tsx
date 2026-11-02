import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export const PersonalLetterSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (isOpen) return;
    setIsOpen(true);
    audio.playRustle();
    audio.playChime(659);
    setTimeout(() => audio.playSparkle(), 300);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#F5DCE5', '#E7DDF5', '#DFAFC2'],
      scalar: 1,
    });
  };

  return (
    <section
      id="letter-section"
      className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-3xl w-full mx-auto">
        {/* Section Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans-body text-xs font-semibold uppercase tracking-widest text-[#DFAFC2] block mb-2">
            Written Specially For You
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#49364F] font-normal italic">
            One Last Thing, Subhi...
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#49364F]/70 mt-2">
            {isOpen ? 'Read at your own pace.' : 'A personal letter waiting for you.'}
          </p>
        </motion.div>

        {/* Letter Container */}
        <div className="relative flex justify-center w-full">
          {!isOpen ? (
            /* Folded Letter / Sealed Envelope State */
            <motion.div
              onClick={handleOpenLetter}
              className="relative w-full max-w-md bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#F5DCE5] cursor-pointer group select-none text-center transform transition-all duration-300 hover:-translate-y-2"
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Ribbon Graphic */}
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 bg-[#F5DCE5]/70 border-x border-[#DFAFC2]/40 pointer-events-none" />

              {/* Decorative Corner Flowers */}
              <div className="absolute top-4 left-4 text-xl">🌸</div>
              <div className="absolute top-4 right-4 text-xl">🌿</div>
              <div className="absolute bottom-4 left-4 text-xl">🍃</div>
              <div className="absolute bottom-4 right-4 text-xl">🌷</div>

              {/* Center Wax Seal */}
              <div className="relative z-10 flex flex-col items-center py-6">
                <motion.div
                  className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#DFAFC2] to-[#E88EAF] flex items-center justify-center text-white shadow-lg border-4 border-white group-hover:scale-110 transition-transform mb-4"
                  animate={{
                    boxShadow: [
                      '0 4px 15px rgba(223, 175, 194, 0.4)',
                      '0 8px 25px rgba(223, 175, 194, 0.8)',
                      '0 4px 15px rgba(223, 175, 194, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  <Mail className="w-7 h-7 text-white fill-white/20" />
                </motion.div>

                <p className="font-handwriting text-2xl text-[#49364F] font-bold">
                  For Subhi, with warmth 💌
                </p>
                <p className="font-sans-body text-xs text-[#49364F]/60 mt-1 uppercase tracking-wider font-semibold">
                  Click to open the letter
                </p>

                <div className="mt-5 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F5DCE5]/60 text-xs text-[#49364F] font-bold border border-white">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFAFC2]" />
                  <span>Tap to break seal</span>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Unfolded Realistic Handwritten Paper Letter */
            <motion.div
              className="relative w-full max-w-2xl bg-[#FFFDF8] rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border border-[#F2DEE7] overflow-hidden"
              initial={{ opacity: 0, scaleY: 0.6, y: -20 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Paper Background Texture & Subtle Crease Line */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#49364F]/5 pointer-events-none" />

              {/* Dried Floral Accent in Top Right Corner */}
              <div className="absolute top-6 right-6 opacity-70 pointer-events-none flex items-center gap-1 text-2xl">
                <span>🌸</span>
                <span>🌾</span>
              </div>

              {/* Letter Header */}
              <div className="border-b border-[#F5DCE5] pb-4 mb-6 flex items-center justify-between">
                <span className="font-serif-title italic text-sm text-[#49364F]/60">
                  A personal note • Just for you
                </span>
                <span className="font-sans-body text-xs font-semibold text-[#DFAFC2] uppercase tracking-widest">
                  Private & Tender
                </span>
              </div>

              {/* Main Letter Body in Beautiful Caveat Handwriting Font */}
              <div className="font-handwriting text-xl sm:text-2xl text-[#49364F] leading-relaxed space-y-4 sm:space-y-5">
                <p className="text-3xl sm:text-4xl font-bold text-[#49364F] mb-3">
                  Hey Subhi,
                </p>

                <p>
                  I know a little website cannot magically fix everything, and honestly, it doesn't have to.
                </p>

                <p>
                  I just wanted to do something different.
                </p>

                <p className="font-bold text-[#35253b]">
                  Something that might make you smile, even for a moment.
                </p>

                <p>
                  You deserve happiness, peaceful mornings, random reasons to laugh, beautiful memories, and people who make you feel appreciated.
                </p>

                <p>
                  And whenever things feel a little too much, remember that you don't need to have everything figured out.
                </p>

                <p className="italic text-[#8C5E72]">
                  Take your time. Be kind to yourself.
                </p>

                <p className="font-bold text-[#2A1830]">
                  And please, don't forget that your smile is worth a little effort.
                </p>

                <p>
                  I hope tomorrow feels a little lighter and brings you something beautiful.
                </p>

                <p>
                  Take care of yourself, okay?
                </p>

                {/* Sign-off */}
                <div className="pt-6 sm:pt-8 text-right">
                  <p className="italic text-lg sm:text-xl text-[#49364F]/80">
                    With lots of good wishes,
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-[#B87D94] mt-1">
                    A little surprise from someone who wanted to make you smile. 🌷
                  </p>
                </div>
              </div>

              {/* Soft Wax Seal Badge at Bottom */}
              <div className="mt-8 pt-4 border-t border-[#F5DCE5]/80 flex justify-center">
                <div className="inline-flex items-center gap-2 text-xs font-serif-title italic text-[#49364F]/60">
                  <span>Handcrafted for Shubhangi</span>
                  <span>•</span>
                  <span>Always here to cheer you up</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface FloatingItem {
  id: number;
  type: 'star' | 'flower' | 'heart' | 'smile';
  icon: string;
  label: string;
  hint: string;
}

export const SmileChallengeSection: React.FC = () => {
  const [hasWon, setHasWon] = useState(false);
  const [clickedHint, setClickedHint] = useState<string | null>(null);
  const [items, setItems] = useState<FloatingItem[]>([]);

  const generateItems = () => {
    const newSmileIdx = Math.floor(Math.random() * 8);

    const baseItems: FloatingItem[] = [
      { id: 0, type: 'star', icon: '⭐', label: 'Star', hint: 'Almost! A little star of warmth ✨' },
      { id: 1, type: 'flower', icon: '🌸', label: 'Cherry Blossom', hint: 'A pretty petal, keep searching! 🌷' },
      { id: 2, type: 'heart', icon: '💖', label: 'Heart', hint: 'Warm love sent to you, but find the smile!' },
      { id: 3, type: 'flower', icon: '🌼', label: 'Daisy', hint: 'A soft daisy, almost there!' },
      { id: 4, type: 'star', icon: '✨', label: 'Sparkle', hint: 'Pure magic! Keep looking!' },
      { id: 5, type: 'heart', icon: '🎀', label: 'Ribbon', hint: 'A cute ribbon for Subhi!' },
      { id: 6, type: 'flower', icon: '🌷', label: 'Tulip', hint: 'Not quite, but smells sweet!' },
      { id: 7, type: 'heart', icon: '🧁', label: 'Cupcake', hint: 'Sweet treat! The smile is nearby!' },
    ];

    // Put the winning smile in the chosen slot
    baseItems[newSmileIdx] = {
      id: newSmileIdx,
      type: 'smile',
      icon: '😊',
      label: 'Subhi’s Smile',
      hint: 'FOUND IT!',
    };

    setItems(baseItems);
    setHasWon(false);
    setClickedHint(null);
  };

  useEffect(() => {
    generateItems();
  }, []);

  const handleItemClick = (item: FloatingItem) => {
    if (hasWon) return;

    if (item.type === 'smile') {
      setHasWon(true);
      setClickedHint(null);
      audio.playCelebration();

      // Confetti storm
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#F5DCE5', '#FFE8A3', '#DFAFC2', '#F9DCCB', '#E7DDF5'],
        scalar: 1.3,
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 300);
    } else {
      audio.playPop();
      setClickedHint(item.hint);
    }
  };

  const handleReplay = () => {
    audio.playPop();
    generateItems();
  };

  return (
    <section
      id="challenge-section"
      className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="relative z-10 max-w-4xl w-full mx-auto text-center">
        {/* Section Heading */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans-body text-xs font-semibold uppercase tracking-widest text-[#DFAFC2] block mb-2">
            Playful Moment
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#49364F] font-normal italic leading-snug">
            Okay Subhi, One Tiny Challenge!
          </h2>
          <p className="font-sans-body text-base sm:text-lg text-[#49364F]/75 mt-2">
            I have a very important mission for you.
          </p>
        </motion.div>

        {/* 3D Animated Character holding the Board */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            className="relative flex flex-col items-center"
            animate={{
              y: hasWon ? [0, -25, 0, -15, 0] : [0, -6, 0],
              rotate: hasWon ? [0, -6, 6, -3, 0] : 0,
            }}
            transition={{
              duration: hasWon ? 1.2 : 3.5,
              repeat: hasWon ? 0 : Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Cute Illustrated Teddy Bear Character */}
            <div className="w-36 h-36 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-md">
                {/* Bear Ears */}
                <circle cx="28" cy="28" r="14" fill="#D4A373" stroke="#C28D5E" strokeWidth="2" />
                <circle cx="28" cy="28" r="8" fill="#F8C291" />
                <circle cx="72" cy="28" r="14" fill="#D4A373" stroke="#C28D5E" strokeWidth="2" />
                <circle cx="72" cy="28" r="8" fill="#F8C291" />

                {/* Head */}
                <circle cx="50" cy="50" r="32" fill="#D4A373" stroke="#C28D5E" strokeWidth="2" />

                {/* Blush on cheeks */}
                <ellipse cx="32" cy="56" rx="6" ry="4" fill="#F5A9C2" opacity="0.8" />
                <ellipse cx="68" cy="56" rx="6" ry="4" fill="#F5A9C2" opacity="0.8" />

                {/* Eyes */}
                {hasWon ? (
                  // Happy squinting smiling eyes
                  <g stroke="#3D291D" strokeWidth="2.5" strokeLinecap="round" fill="none">
                    <path d="M30 46 Q35 40 40 46" />
                    <path d="M60 46 Q65 40 70 46" />
                  </g>
                ) : (
                  // Curious bright eyes
                  <g fill="#3D291D">
                    <circle cx="36" cy="46" r="3.5" />
                    <circle cx="64" cy="46" r="3.5" />
                    <circle cx="37" cy="44.5" r="1.2" fill="#FFF" />
                    <circle cx="65" cy="44.5" r="1.2" fill="#FFF" />
                  </g>
                )}

                {/* Snout & Nose */}
                <ellipse cx="50" cy="57" rx="12" ry="8" fill="#FFF9F0" />
                <ellipse cx="50" cy="54" rx="3.5" ry="2.5" fill="#3D291D" />
                <path d="M50 56.5 L50 61" stroke="#3D291D" strokeWidth="1.5" />
                <path d="M46 61 Q50 64 54 61" stroke="#3D291D" strokeWidth="1.5" fill="none" strokeLinecap="round" />

                {/* Little Little Flower on Bear Ear */}
                <circle cx="30" cy="18" r="4" fill="#F5DCE5" />
                <circle cx="30" cy="18" r="2" fill="#FFE8A3" />
              </svg>
            </div>

            {/* Board Held by Character */}
            <motion.div
              className="glass-card px-6 py-3 rounded-2xl shadow-lg border border-white/90 max-w-sm -mt-4 relative z-10"
              whileHover={{ scale: 1.03 }}
            >
              <p className="font-handwriting text-xl sm:text-2xl text-[#49364F] font-bold">
                {hasWon ? '🎉 MISSION ACCOMPLISHED! 🎉' : 'Find the little smile hiding somewhere here!'}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Hint banner when clicking wrong item */}
        <AnimatePresence>
          {clickedHint && !hasWon && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="inline-block px-5 py-2 rounded-full bg-[#F5DCE5]/80 text-[#49364F] text-sm font-semibold mb-6 shadow-sm border border-white/70"
            >
              {clickedHint}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Victory Celebration State */}
        {hasWon ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="glass-card rounded-3xl p-8 sm:p-10 max-w-lg mx-auto border border-white shadow-2xl relative overflow-hidden"
          >
            {/* Floating Smileys rising animation */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{ left: `${15 + i * 15}%`, bottom: '0%' }}
                  animate={{ y: [-20, -180], opacity: [1, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3 }}
                >
                  😊
                </motion.div>
              ))}
            </div>

            <span className="text-4xl block mb-3">✨ 😊 ✨</span>
            <h3 className="font-serif-title text-2xl sm:text-3xl text-[#49364F] font-bold mb-3 leading-snug">
              THERE IT IS! I KNEW YOU STILL HAD ONE! hehe 💗
            </h3>
            <p className="font-sans-body text-base text-[#49364F]/80 mb-6">
              See? Even on tough days, your smile is never really lost. It was just taking a little rest.
            </p>

            <button
              onClick={handleReplay}
              className="glass-button px-6 py-3 rounded-full text-sm font-bold text-[#49364F] inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </button>
          </motion.div>
        ) : (
          /* Mini-game Floating Bubbles Grid */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
            {items.map((item, idx) => (
              <motion.button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className="glass-card h-28 sm:h-32 rounded-2xl flex flex-col items-center justify-center p-3 relative group cursor-pointer border border-white/80 shadow-md hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  y: [0, (idx % 2 === 0 ? -6 : 6), 0],
                }}
                transition={{
                  duration: 3 + (idx % 3),
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/70 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-xs font-semibold text-[#49364F]/70 mt-2 font-sans-body">
                  Tap to look
                </span>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

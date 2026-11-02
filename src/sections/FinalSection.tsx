import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Sparkles, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

interface FinalSectionProps {
  onRestart?: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const FinalSection: React.FC<FinalSectionProps> = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isBlushing, setIsBlushing] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<FloatingHeart[]>([]);

  const handleTeddyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setClickCount((prev) => prev + 1);
    setIsBlushing(true);

    // Audio SFX
    audio.playSparkle();
    audio.playChime(784 + (clickCount % 4) * 60);

    // Confetti Heart Burst
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 28,
      spread: 70,
      origin: { x, y },
      colors: ['#FF6B8B', '#F5A9C2', '#FFE8A3', '#E7DDF5', '#FF70A6'],
      scalar: 0.9,
    });

    // Add rising floating hearts
    const heartEmojis = ['💖', '🧸', '🌸', '✨', '💕', '🌷'];
    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x: (Math.random() - 0.5) * 80,
      y: (Math.random() - 0.5) * 40,
      emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
    };

    setFloatingHearts((prev) => [...prev.slice(-6), newHeart]);

    setTimeout(() => {
      setIsBlushing(false);
    }, 1800);
  };

  return (
    <section
      id="final-section"
      className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-t from-[#F5DCE5]/70 via-[#FFF9F0]/80 to-[#E7DDF5]/50 select-none"
    >
      {/* ================= MAGICAL AMBIENT SUNBEAMS & GLOW ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Golden Sun Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] rounded-full bg-gradient-to-tr from-[#FFE8A3]/30 via-[#F5DCE5]/40 to-[#E7DDF5]/35 blur-3xl animate-pulse-soft" />
        <div className="absolute top-12 left-1/4 w-80 h-80 rounded-full bg-[#FFF5D6]/40 blur-2xl animate-gentle-float" />
        <div className="absolute bottom-12 right-1/4 w-96 h-96 rounded-full bg-[#F5DCE5]/35 blur-3xl animate-pulse-soft" />

        {/* Ambient Drifting Sparkles & Stars */}
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-300"
            style={{
              left: `${(i * 13 + 5) % 92}%`,
              top: `${(i * 19 + 8) % 86}%`,
              fontSize: `${10 + (i % 3) * 6}px`,
            }}
            animate={{
              y: [0, -18 - (i % 3) * 6, 0],
              opacity: [0.2, 0.85, 0.2],
              scale: [0.8, 1.25, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + (i % 3) * 1.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '🌸' : '⭐'}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center flex flex-col items-center">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel text-[#49364F] mb-6 shadow-sm border border-white"
        >
          <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
          <span className="font-sans-body font-semibold text-xs uppercase tracking-wider text-[#49364F]">
            Warm Sunshine
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          className="font-serif-title text-4xl sm:text-5xl md:text-6xl text-[#49364F] font-normal leading-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Sending You a Little Sunshine,{' '}
          <span className="italic bg-gradient-to-r from-[#DFAFC2] via-[#E88EAF] to-[#B87D94] bg-clip-text text-transparent">
            Subhi! ☀️
          </span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="font-sans-body text-base sm:text-lg md:text-xl text-[#49364F]/80 max-w-xl mx-auto leading-relaxed mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          May your days be a little brighter, your worries a little lighter, and your smile a little bigger.
        </motion.p>

        {/* ================= ADORABLE ANIMATED TEDDY SCENE ================= */}
        <div className="relative my-2 flex flex-col items-center">
          {/* Pulsing Warm Halo Behind Teddy */}
          <motion.div
            className="absolute inset-0 -m-8 rounded-full bg-gradient-to-tr from-[#FFE8A3]/40 via-[#F5DCE5]/50 to-[#E7DDF5]/40 blur-2xl pointer-events-none"
            animate={{
              scale: [0.95, 1.15, 0.95],
              opacity: [0.5, 0.85, 0.5],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating Heart / Sparkle Particles Rising from Bear's Bouquet */}
          <div className="absolute inset-0 pointer-events-none overflow-visible">
            {/* Continuous ambient bouquet floating hearts */}
            {[0, 1, 2, 3].map((idx) => (
              <motion.div
                key={idx}
                className="absolute text-sm"
                style={{
                  left: `${45 + (idx % 2 === 0 ? idx * 8 : -idx * 8)}%`,
                  top: '55%',
                }}
                animate={{
                  y: [-10, -75, -120],
                  x: [0, (idx % 2 === 0 ? 15 : -15), (idx % 2 === 0 ? -10 : 10)],
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1.2, 0.4],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: idx * 0.9,
                }}
              >
                {idx % 2 === 0 ? '💖' : '✨'}
              </motion.div>
            ))}

            {/* Tap-Spawned Rising Floating Hearts */}
            <AnimatePresence>
              {floatingHearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="absolute text-2xl z-30 pointer-events-none filter drop-shadow-md"
                  style={{
                    left: `calc(50% + ${heart.x}px)`,
                    top: `calc(40% + ${heart.y}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0.4, y: 0 }}
                  animate={{ opacity: 1, scale: [0.6, 1.3, 1], y: -90 }}
                  exit={{ opacity: 0, scale: 1.5, y: -130 }}
                  transition={{ duration: 1.8, ease: 'easeOut' }}
                >
                  {heart.emoji}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Floating Teddy Character with Interactive Tap / Wiggle */}
          <motion.div
            onClick={handleTeddyClick}
            className="w-52 h-52 sm:w-60 sm:h-60 relative cursor-pointer group"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            title="Tap me for a warm bear hug! 🧸"
          >
            {/* Cute Speech Tooltip on Hover */}
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="glass-panel px-3.5 py-1.5 rounded-full text-xs font-bold text-[#49364F] whitespace-nowrap shadow-md border border-white flex items-center gap-1.5">
                <span>Tap for a bear hug!</span>
                <span className="text-pink-400">🧸💕</span>
              </div>
            </motion.div>

            <svg viewBox="0 0 120 120" className="w-full h-full filter drop-shadow-xl overflow-visible">
              <defs>
                <linearGradient id="bearFurGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#DFB082" />
                  <stop offset="100%" stopColor="#C48E59" />
                </linearGradient>
                <linearGradient id="earInnerGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFD2B8" />
                  <stop offset="100%" stopColor="#F9B38F" />
                </linearGradient>
              </defs>

              {/* Left Ear with Wiggle Animation */}
              <motion.g
                animate={{ rotate: [-3, 4, -3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '32px 30px' }}
              >
                <circle cx="32" cy="30" r="15" fill="url(#bearFurGrad)" stroke="#B37E4C" strokeWidth="2" />
                <circle cx="32" cy="30" r="8" fill="url(#earInnerGrad)" />
              </motion.g>

              {/* Right Ear with Wiggle Animation */}
              <motion.g
                animate={{ rotate: [3, -4, 3] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                style={{ transformOrigin: '88px 30px' }}
              >
                <circle cx="88" cy="30" r="15" fill="url(#bearFurGrad)" stroke="#B37E4C" strokeWidth="2" />
                <circle cx="88" cy="30" r="8" fill="url(#earInnerGrad)" />
              </motion.g>

              {/* Bear Body */}
              <ellipse cx="60" cy="85" rx="30" ry="24" fill="url(#bearFurGrad)" stroke="#B37E4C" strokeWidth="2" />
              <ellipse cx="60" cy="85" rx="18" ry="14" fill="#FFF9F0" />

              {/* Bear Head */}
              <circle cx="60" cy="50" r="32" fill="url(#bearFurGrad)" stroke="#B37E4C" strokeWidth="2" />

              {/* Cheeks with Blushing Glow */}
              <motion.ellipse
                cx="39"
                cy="56"
                rx="6.5"
                ry="4.5"
                fill="#FF85A1"
                animate={isBlushing ? { opacity: [0.75, 1, 0.75], rx: [6.5, 8, 6.5] } : { opacity: 0.75 }}
                transition={{ duration: 0.8, repeat: isBlushing ? Infinity : 0 }}
              />
              <motion.ellipse
                cx="81"
                cy="56"
                rx="6.5"
                ry="4.5"
                fill="#FF85A1"
                animate={isBlushing ? { opacity: [0.75, 1, 0.75], rx: [6.5, 8, 6.5] } : { opacity: 0.75 }}
                transition={{ duration: 0.8, repeat: isBlushing ? Infinity : 0 }}
              />

              {/* Eyes with Blinking Animation */}
              <motion.g
                animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  times: [0, 0.94, 0.96, 0.98, 1],
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: '60px 46px' }}
              >
                {/* Left Eye */}
                <circle cx="45" cy="46" r="3.8" fill="#3D291D" />
                <circle cx="46.2" cy="44.5" r="1.4" fill="#FFF" />
                <circle cx="44" cy="47" r="0.6" fill="#FFF" />

                {/* Right Eye */}
                <circle cx="75" cy="46" r="3.8" fill="#3D291D" />
                <circle cx="76.2" cy="44.5" r="1.4" fill="#FFF" />
                <circle cx="74" cy="47" r="0.6" fill="#FFF" />
              </motion.g>

              {/* Snout & Smiling Mouth */}
              <ellipse cx="60" cy="58" rx="12.5" ry="8.5" fill="#FFF9F0" />
              <ellipse cx="60" cy="54" rx="3.8" ry="2.6" fill="#3D291D" />
              <path d="M60 56.6 L60 61.2" stroke="#3D291D" strokeWidth="1.5" />
              <path
                d="M54 61 Q60 67 66 61"
                stroke="#3D291D"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />

              {/* Left Paw holding Bouquet */}
              <ellipse cx="38" cy="80" rx="9" ry="14" fill="#C48E59" transform="rotate(30 38 80)" />

              {/* Right Paw holding Bouquet & Swaying */}
              <motion.g
                animate={{ rotate: [-2, 4, -2] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '82px 76px' }}
              >
                <ellipse cx="82" cy="76" rx="9" ry="14" fill="#C48E59" transform="rotate(-30 82 76)" />
              </motion.g>

              {/* Beautiful Bouquet of Colorful Flowers in Paws */}
              <motion.g
                transform="translate(42, 66)"
                animate={{ rotate: [-1.5, 1.5, -1.5], y: [0, -1, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{ transformOrigin: '18px 25px' }}
              >
                {/* Bouquet wrapping paper */}
                <path d="M4 25 L34 25 L23 44 L15 44 Z" fill="#FCE4EC" stroke="#F48FB1" strokeWidth="1" />
                {/* Ribbon Bow */}
                <path d="M14 31 L24 31" stroke="#FF4081" strokeWidth="2" strokeLinecap="round" />
                <circle cx="19" cy="31" r="2.5" fill="#FF4081" />

                {/* Flowers in Bouquet */}
                {/* Pink Rose */}
                <circle cx="9" cy="17" r="8" fill="#F5A9C2" stroke="#E88EAF" strokeWidth="1" />
                <circle cx="9" cy="17" r="4" fill="#FF6B8B" />

                {/* Yellow Daisy */}
                <circle cx="19" cy="11" r="9" fill="#FFF176" stroke="#FBC02D" strokeWidth="1" />
                <circle cx="19" cy="11" r="4.2" fill="#F57C00" />

                {/* Lavender Blossom */}
                <circle cx="29" cy="19" r="7.5" fill="#D1C4E9" stroke="#9575CD" strokeWidth="1" />
                <circle cx="29" cy="19" r="3.5" fill="#7E57C2" />

                {/* Little Green Leaves */}
                <ellipse cx="3" cy="13" rx="4" ry="2" fill="#81C784" transform="rotate(-25 3 13)" />
                <ellipse cx="34" cy="13" rx="4" ry="2" fill="#81C784" transform="rotate(25 34 13)" />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        {/* ================= HEARTWARMING ANIMATED CARD ================= */}
        {/* Replaced the 2 removed buttons with this charming animated blessing card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 mb-2 max-w-md w-full px-4"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-card px-8 py-5 rounded-3xl border border-white/90 shadow-lg text-center backdrop-blur-md relative overflow-hidden"
          >
            {/* Subtle Shimmer background */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_3s_infinite]" />

            <div className="flex items-center justify-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#DFAFC2]" />
              <span className="font-sans-body text-xs uppercase tracking-widest font-bold text-[#B87D94]">
                A Forever Wish For You
              </span>
              <Sparkles className="w-4 h-4 text-[#DFAFC2]" />
            </div>

            <p className="font-handwriting text-2xl sm:text-3xl text-[#49364F] font-bold leading-snug">
              "You are wonderful, Subhi. Never forget that! 🧸💖"
            </p>

            <p className="font-sans-body text-xs text-[#49364F]/65 mt-2 flex items-center justify-center gap-1.5">
              <Heart className="w-3 h-3 text-[#FF70A6] fill-[#FF70A6]" />
              <span>Tap the teddy bear for a warm bear hug</span>
            </p>
          </motion.div>
        </motion.div>

        {/* ================= FOOTER NOTE ================= */}
        <div className="mt-14 text-center">
          <p className="font-serif-title italic text-sm text-[#49364F]/60">
            Created with lots of warmth, care, and smiles for Shubhangi (Subhi) 🌷
          </p>
        </div>
      </div>
    </section>
  );
};

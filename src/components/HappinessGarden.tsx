import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Wind, RotateCcw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audio } from '../utils/audio';

export interface FlowerItem {
  id: number;
  name: string;
  botanical: string;
  symbolism: string;
  color: string;
  accent: string;
  message: string;
  stemCurve: string;
  stemHeight: number;
  swayDuration: number;
  swayDelay: number;
  xOffset: number;
}

export const HappinessGarden: React.FC = () => {
  const [pickedFlowers, setPickedFlowers] = useState<number[]>([]);
  const [activeMessage, setActiveMessage] = useState<FlowerItem | null>(null);
  const [isBreezeActive, setIsBreezeActive] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const flowers: FlowerItem[] = [
    {
      id: 1,
      name: 'Dewdrop Tulip',
      botanical: 'Tulipa Serena',
      symbolism: 'Quiet Resilience & Fresh Beginnings',
      color: '#FF6B8B',
      accent: '#FFA3B8',
      message: "One tough moment doesn't define your story. Take a deep breath; you're doing so much better than you give yourself credit for.",
      stemCurve: 'M 40 180 Q 32 100 42 20',
      stemHeight: 165,
      swayDuration: 4.2,
      swayDelay: 0.1,
      xOffset: -4,
    },
    {
      id: 2,
      name: 'Sunny Daisy',
      botanical: 'Bellis Aurea',
      symbolism: 'Joy & Gentle Optimism',
      color: '#FFE26A',
      accent: '#FFAA00',
      message: "Even the smallest step forward is still genuine progress. Be kind to yourself today.",
      stemCurve: 'M 40 180 Q 46 95 38 20',
      stemHeight: 145,
      swayDuration: 3.8,
      swayDelay: 0.4,
      xOffset: 3,
    },
    {
      id: 3,
      name: 'Mystic Lavender',
      botanical: 'Lavandula Stella',
      symbolism: 'Inner Peace & Serenity',
      color: '#B594E8',
      accent: '#8352D4',
      message: "It's perfectly okay to pause, rest, and do nothing without an ounce of guilt. Peace begins when you slow down.",
      stemCurve: 'M 40 180 Q 36 90 40 20',
      stemHeight: 185,
      swayDuration: 4.8,
      swayDelay: 0.8,
      xOffset: -2,
    },
    {
      id: 4,
      name: 'Blushing Peony',
      botanical: 'Paeonia Dulcis',
      symbolism: 'Warmth & Self-Compassion',
      color: '#F48FB1',
      accent: '#EC407A',
      message: "Some of the most breathtaking things take time to unfold. You are worthy of all the patience you give to others.",
      stemCurve: 'M 40 180 Q 48 105 42 20',
      stemHeight: 150,
      swayDuration: 4.0,
      swayDelay: 0.2,
      xOffset: 4,
    },
    {
      id: 5,
      name: 'Golden Sunflower',
      botanical: 'Helianthus Vitalis',
      symbolism: 'Strength & Inner Radiance',
      color: '#FFB703',
      accent: '#FB8500',
      message: "Always remember how wonderfully resilient and uniquely inspiring you are, Ma'am.",
      stemCurve: 'M 40 180 Q 34 85 40 20',
      stemHeight: 175,
      swayDuration: 4.4,
      swayDelay: 0.6,
      xOffset: -3,
    },
    {
      id: 6,
      name: 'Velvet Rose',
      botanical: 'Rosa Amoris',
      symbolism: 'Endless Warmth & Smile',
      color: '#E05780',
      accent: '#FF7597',
      message: "And here is your special reminder to wear that beautiful smile today. It makes the whole world brighter! 💖",
      stemCurve: 'M 40 180 Q 45 100 39 20',
      stemHeight: 160,
      swayDuration: 3.9,
      swayDelay: 0.5,
      xOffset: 2,
    },
  ];

  const handlePickFlower = (flower: FlowerItem) => {
    const isNew = !pickedFlowers.includes(flower.id);
    if (isNew) {
      const updated = [...pickedFlowers, flower.id];
      setPickedFlowers(updated);

      if (updated.length === flowers.length) {
        setTimeout(() => {
          setShowCelebration(true);
          audio.playCelebration();
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#FF6B8B', '#FFE26A', '#B594E8', '#F48FB1', '#FFB703'],
          });
        }, 800);
      }
    }

    setActiveMessage(flower);

    // Audio SFX
    audio.playChime(600 + flower.id * 65);
    audio.playPop();

    // Trigger flower petal confetti
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { x: (flower.id * 15) / 100, y: 0.65 },
      colors: [flower.color, flower.accent, '#FFFFFF', '#FFF0F5'],
      scalar: 0.85,
    });
  };

  const handleBreeze = () => {
    setIsBreezeActive(true);
    audio.playRustle();
    audio.playSparkle();

    confetti({
      particleCount: 45,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.7 },
      colors: ['#FFCAD4', '#B5E2FA', '#FDFD96', '#E2ECE9'],
    });

    setTimeout(() => {
      setIsBreezeActive(false);
    }, 2800);
  };

  const handleResetGarden = () => {
    audio.playSparkle();
    setPickedFlowers([]);
    setShowCelebration(false);
    setActiveMessage(null);
  };

  const closeMessage = () => {
    audio.playPop();
    setActiveMessage(null);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-white/80 bg-gradient-to-b from-[#FFF5F8] via-[#FFF9F2] to-[#E9F5E4] min-h-[580px] flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* ================= BACKGROUND ATMOSPHERE ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Dreamy Sunbeams */}
        <div className="absolute -top-10 left-1/4 w-[500px] h-[350px] bg-gradient-to-br from-[#FFF5D6]/40 via-transparent to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse-soft" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-[#F5DCE5]/30 rounded-full blur-2xl animate-gentle-float" />

        {/* Floating Dandelion Fluff & Fireflies */}
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${3 + (i % 3) * 2}px`,
              height: `${3 + (i % 3) * 2}px`,
              backgroundColor: i % 2 === 0 ? '#FFEAA7' : '#FFFFFF',
              boxShadow: i % 2 === 0 ? '0 0 8px 2px rgba(255, 234, 167, 0.75)' : '0 0 6px 1px rgba(255, 255, 255, 0.8)',
              left: `${(i * 13 + 7) % 94}%`,
              top: `${(i * 17 + 10) % 70}%`,
            }}
            animate={{
              y: [0, -20 - (i % 4) * 5, 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * 15, 0],
              opacity: [0.25, 0.9, 0.25],
              scale: [0.8, 1.25, 0.8],
            }}
            transition={{
              duration: 3.5 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
        ))}

        {/* Animated Flying Butterflies */}
        <motion.div
          className="absolute z-10 w-8 h-8 pointer-events-none"
          initial={{ x: '10%', y: '40%' }}
          animate={{
            x: ['15%', '35%', '60%', '85%', '40%', '15%'],
            y: ['45%', '25%', '35%', '20%', '50%', '45%'],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            animate={{ scaleX: [1, -0.2, 1], rotate: [-10, 10, -10] }}
            transition={{ duration: 0.45, repeat: Infinity, ease: 'easeInOut' }}
            className="text-lg filter drop-shadow-sm"
          >
            🦋
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute z-10 w-8 h-8 pointer-events-none"
          initial={{ x: '80%', y: '30%' }}
          animate={{
            x: ['75%', '50%', '25%', '45%', '70%', '75%'],
            y: ['30%', '50%', '35%', '15%', '40%', '30%'],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        >
          <motion.div
            animate={{ scaleX: [1, -0.2, 1], rotate: [12, -8, 12] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="text-sm filter drop-shadow-sm opacity-90"
          >
            🌸
          </motion.div>
        </motion.div>

        {/* Rolling Hills Layer 1 (Far Background) */}
        <div className="absolute bottom-0 inset-x-0 h-48 pointer-events-none opacity-45">
          <svg viewBox="0 0 1200 240" preserveAspectRatio="none" className="w-full h-full fill-[#BEDEBA]">
            <path d="M0 160 C300 70 500 190 800 100 C1000 30 1100 120 1200 90 L1200 240 L0 240 Z" />
          </svg>
        </div>

        {/* Rolling Hills Layer 2 (Mid-ground) */}
        <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none opacity-70">
          <svg viewBox="0 0 1200 200" preserveAspectRatio="none" className="w-full h-full fill-[#A5D29E]">
            <path d="M0 130 C220 80 440 150 720 90 C960 40 1080 110 1200 80 L1200 200 L0 200 Z" />
          </svg>
        </div>

        {/* Soft morning fog / grass base glow */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#8FB986]/40 to-transparent pointer-events-none" />
      </div>

      {/* ================= GARDEN HEADER / TOOLBAR ================= */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 px-2">
        {/* Flower Counter Badge & Trackers */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/80 shadow-sm backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-[#C97B99]" />
            <span className="font-sans-body text-xs sm:text-sm font-bold text-[#49364F]">
              Flowers Picked:
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#F5DCE5] text-xs font-extrabold text-[#753755]">
              {pickedFlowers.length} / {flowers.length}
            </span>
          </div>

          {/* Mini Bouquet Blooms Icons */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/40 border border-white/60">
            {flowers.map((fl) => {
              const isPicked = pickedFlowers.includes(fl.id);
              return (
                <motion.div
                  key={fl.id}
                  animate={isPicked ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  title={`${fl.name} (${isPicked ? 'Collected' : 'Waiting'})`}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all duration-300 ${
                    isPicked
                      ? 'bg-white shadow-sm ring-2 ring-[#C97B99]/60'
                      : 'opacity-35 grayscale'
                  }`}
                >
                  {fl.id === 1 && '🌷'}
                  {fl.id === 2 && '🌼'}
                  {fl.id === 3 && '🪻'}
                  {fl.id === 4 && '🌸'}
                  {fl.id === 5 && '🌻'}
                  {fl.id === 6 && '🌹'}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Action Controls: Gentle Breeze & Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleBreeze}
            disabled={isBreezeActive}
            className="px-3.5 py-1.5 rounded-full glass-panel border border-white/80 hover:bg-white/70 text-[#49364F] text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            title="Blow a gentle breeze through the meadow"
          >
            <Wind className={`w-3.5 h-3.5 text-[#6B8E63] ${isBreezeActive ? 'animate-spin' : ''}`} />
            <span>Gentle Breeze</span>
          </button>

          {pickedFlowers.length > 0 && (
            <button
              onClick={handleResetGarden}
              className="p-1.5 rounded-full glass-panel border border-white/80 hover:bg-white/70 text-[#49364F]/70 hover:text-[#49364F] transition-all cursor-pointer"
              title="Re-grow the garden"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Completion Celebration Ribbon */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative z-20 mx-auto my-2 max-w-lg w-full text-center p-3 rounded-2xl bg-gradient-to-r from-[#FCE4EC] via-[#FFF3E0] to-[#EDE7F6] border border-white shadow-lg flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 text-left">
              <span className="text-2xl">💐</span>
              <div>
                <p className="font-bold text-xs sm:text-sm text-[#49364F] leading-tight">
                  You gathered the complete Bouquet of Happiness! ✨
                </p>
                <p className="text-[11px] text-[#49364F]/70 leading-tight">
                  Every blessing in this garden is forever yours.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowCelebration(false)}
              className="p-1 text-[#49364F]/50 hover:text-[#49364F] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= THE LIVING MEADOW & BLOOMS ================= */}
      <div className="relative z-20 w-full h-[320px] sm:h-[350px] flex items-end justify-around px-1 sm:px-6 mt-auto">
        {flowers.map((fl) => {
          const isPicked = pickedFlowers.includes(fl.id);
          const breezeDegree = isBreezeActive ? (fl.id % 2 === 0 ? 9 : -9) : 0;

          return (
            <div
              key={fl.id}
              onClick={() => handlePickFlower(fl)}
              className="relative flex flex-col items-center group cursor-pointer select-none"
              style={{ width: `${100 / flowers.length}%` }}
            >
              {/* Tooltip on Hover */}
              <motion.div
                className="absolute -top-14 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="glass-panel text-[#49364F] px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap shadow-md border border-white/90 flex items-center gap-1.5">
                  <span>{fl.name}</span>
                  <span className="text-[10px] text-[#C97B99]">
                    {isPicked ? '• Read Note' : '• Pick 🌷'}
                  </span>
                </div>
              </motion.div>

              {/* Plant Assembly (Flower Head + Stem + Leaves) Sways in Breeze */}
              <motion.div
                className="relative flex flex-col items-center origin-bottom"
                animate={{
                  rotate: isBreezeActive
                    ? [0, breezeDegree, 0]
                    : [fl.xOffset - 2, fl.xOffset + 2, fl.xOffset - 2],
                }}
                transition={{
                  duration: isBreezeActive ? 1.4 : fl.swayDuration,
                  repeat: isBreezeActive ? 2 : Infinity,
                  ease: 'easeInOut',
                  delay: fl.swayDelay,
                }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Flower Head */}
                <motion.div
                  className="relative z-20 filter drop-shadow-md"
                  animate={{
                    scale: isPicked ? [1, 1.05, 1] : 1,
                    y: isPicked ? -2 : 0,
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <svg
                    width="78"
                    height="78"
                    viewBox="0 0 100 100"
                    className="overflow-visible transition-transform duration-300 group-hover:scale-115"
                  >
                    <defs>
                      <linearGradient id={`grad-tulip-${fl.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFAEC2" />
                        <stop offset="50%" stopColor="#FF6B8B" />
                        <stop offset="100%" stopColor="#D9385F" />
                      </linearGradient>
                      <linearGradient id={`grad-daisy-${fl.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="100%" stopColor="#FFF2D6" />
                      </linearGradient>
                      <linearGradient id={`grad-lavender-${fl.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#D8BBFF" />
                        <stop offset="100%" stopColor="#8352D4" />
                      </linearGradient>
                      <linearGradient id={`grad-peony-${fl.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FFB3C6" />
                        <stop offset="50%" stopColor="#F48FB1" />
                        <stop offset="100%" stopColor="#D81B60" />
                      </linearGradient>
                      <linearGradient id={`grad-sun-${fl.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FFD000" />
                        <stop offset="100%" stopColor="#FF9100" />
                      </linearGradient>
                      <linearGradient id={`grad-rose-${fl.id}`} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#FF85A1" />
                        <stop offset="50%" stopColor="#E05780" />
                        <stop offset="100%" stopColor="#A4133C" />
                      </linearGradient>
                    </defs>

                    {/* 1. Dewdrop Tulip */}
                    {fl.id === 1 && (
                      <g>
                        {/* Outer Back Petals */}
                        <path
                          d="M50 82 C22 80 18 42 36 22 C46 32 50 48 50 48 C50 48 54 32 64 22 C82 42 78 80 50 82 Z"
                          fill={`url(#grad-tulip-${fl.id})`}
                        />
                        {/* Center Overlap Petal */}
                        <path
                          d="M50 82 C38 66 40 38 50 20 C60 38 62 66 50 82 Z"
                          fill="#FF85A1"
                          stroke="#FFAEC2"
                          strokeWidth="1.2"
                        />
                        {/* Soft Dewdrop */}
                        <circle cx="56" cy="42" r="3.2" fill="#FFFFFF" opacity="0.85" />
                        <circle cx="57" cy="41" r="1.2" fill="#FFFFFF" />
                      </g>
                    )}

                    {/* 2. Sunny Daisy */}
                    {fl.id === 2 && (
                      <g>
                        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((deg) => (
                          <ellipse
                            key={deg}
                            cx="50"
                            cy="26"
                            rx="5"
                            ry="19"
                            fill={`url(#grad-daisy-${fl.id})`}
                            stroke="#E8D5B5"
                            strokeWidth="0.8"
                            transform={`rotate(${deg} 50 50)`}
                          />
                        ))}
                        {/* Golden Center Disc */}
                        <circle cx="50" cy="50" r="15" fill="#FFAA00" stroke="#E67E00" strokeWidth="1.5" />
                        <circle cx="50" cy="50" r="11" fill="#FFD000" />
                        {/* Pollen Dots */}
                        {[0, 60, 120, 180, 240, 300].map((d) => (
                          <circle
                            key={d}
                            cx={50 + Math.cos((d * Math.PI) / 180) * 6}
                            cy={50 + Math.sin((d * Math.PI) / 180) * 6}
                            r="1.5"
                            fill="#B35900"
                          />
                        ))}
                      </g>
                    )}

                    {/* 3. Mystic Lavender Cluster */}
                    {fl.id === 3 && (
                      <g>
                        {/* Tiered Blossom florets */}
                        {[
                          { cx: 50, cy: 20, r: 8 },
                          { cx: 43, cy: 32, r: 9 },
                          { cx: 57, cy: 32, r: 9 },
                          { cx: 40, cy: 46, r: 10 },
                          { cx: 60, cy: 46, r: 10 },
                          { cx: 50, cy: 42, r: 9 },
                          { cx: 42, cy: 60, r: 10.5 },
                          { cx: 58, cy: 60, r: 10.5 },
                          { cx: 50, cy: 56, r: 9.5 },
                          { cx: 50, cy: 72, r: 10 },
                        ].map((pos, idx) => (
                          <ellipse
                            key={idx}
                            cx={pos.cx}
                            cy={pos.cy}
                            rx={pos.r}
                            ry={pos.r * 0.85}
                            fill={`url(#grad-lavender-${fl.id})`}
                            stroke="#FFFFFF"
                            strokeWidth="0.7"
                            opacity={0.92}
                          />
                        ))}
                        <circle cx="50" cy="20" r="3" fill="#FFF" />
                      </g>
                    )}

                    {/* 4. Blushing Peony */}
                    {fl.id === 4 && (
                      <g>
                        {/* Layered Ruffled Petals */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
                          <ellipse
                            key={deg}
                            cx={50 + Math.cos((deg * Math.PI) / 180) * 16}
                            cy={50 + Math.sin((deg * Math.PI) / 180) * 16}
                            rx={14 - (i % 2) * 2}
                            ry={12}
                            fill={`url(#grad-peony-${fl.id})`}
                            stroke="#FFCAD4"
                            strokeWidth="1"
                            opacity="0.9"
                          />
                        ))}
                        <circle cx="50" cy="50" r="14" fill="#FF80AB" stroke="#C2185B" strokeWidth="1" />
                        <circle cx="50" cy="50" r="8" fill="#FFF59D" />
                      </g>
                    )}

                    {/* 5. Golden Sunflower */}
                    {fl.id === 5 && (
                      <g>
                        {/* Outer Petals */}
                        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                          <polygon
                            key={deg}
                            points="50,15 56,38 44,38"
                            fill={`url(#grad-sun-${fl.id})`}
                            stroke="#F77F00"
                            strokeWidth="1"
                            transform={`rotate(${deg} 50 50)`}
                          />
                        ))}
                        {/* Inner Offset Petals */}
                        {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg) => (
                          <polygon
                            key={deg}
                            points="50,22 55,42 45,42"
                            fill="#FFB703"
                            transform={`rotate(${deg} 50 50)`}
                          />
                        ))}
                        {/* Center Chocolate Seed Core */}
                        <circle cx="50" cy="50" r="15" fill="#582F0E" stroke="#7F4F24" strokeWidth="1.5" />
                        <circle cx="50" cy="50" r="10" fill="#3D200A" />
                        <circle cx="50" cy="50" r="5" fill="#A68A56" opacity="0.6" />
                      </g>
                    )}

                    {/* 6. Velvet Rose */}
                    {fl.id === 6 && (
                      <g>
                        <circle cx="50" cy="50" r="30" fill={`url(#grad-rose-${fl.id})`} />
                        <path
                          d="M50 25 C65 25 75 38 75 52 C75 66 64 75 50 75 C36 75 25 66 25 52 C25 38 35 25 50 25 Z"
                          fill="#D81B60"
                          opacity="0.75"
                        />
                        <path
                          d="M42 40 C48 34 58 36 62 42 C66 48 64 56 56 60 C48 64 38 58 40 48"
                          fill="none"
                          stroke="#FFF"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <circle cx="50" cy="50" r="8" fill="#FF80AB" />
                      </g>
                    )}
                  </svg>

                  {/* Picked Sparkle Halo Badge */}
                  {isPicked && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/90 shadow-md flex items-center justify-center text-xs"
                      initial={{ scale: 0 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨
                    </motion.div>
                  )}
                </motion.div>

                {/* Naturally Curved Stem & Organic Leaves */}
                <div className="relative flex flex-col items-center -mt-1">
                  <svg
                    width="80"
                    height={fl.stemHeight}
                    viewBox={`0 0 80 ${fl.stemHeight}`}
                    className="overflow-visible"
                  >
                    {/* Main Stem Path */}
                    <path
                      d={`M 40 ${fl.stemHeight} Q ${40 + fl.xOffset * 3} ${fl.stemHeight / 2} 40 4`}
                      stroke="#6B8E63"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Left Organic Leaf */}
                    <g transform={`translate(38, ${fl.stemHeight * 0.42}) rotate(-32)`}>
                      <path
                        d="M0 0 C-15 -6 -25 -2 -22 10 C-18 18 -6 12 0 0 Z"
                        fill="#88B07E"
                        stroke="#5A7D53"
                        strokeWidth="1"
                      />
                      <path d="M0 0 C-10 2 -18 6 -20 10" stroke="#A7CFA0" strokeWidth="1" fill="none" />
                    </g>

                    {/* Right Organic Leaf */}
                    <g transform={`translate(42, ${fl.stemHeight * 0.68}) rotate(30)`}>
                      <path
                        d="M0 0 C15 -6 25 -2 22 10 C18 18 6 12 0 0 Z"
                        fill="#88B07E"
                        stroke="#5A7D53"
                        strokeWidth="1"
                      />
                      <path d="M0 0 C10 2 18 6 20 10" stroke="#A7CFA0" strokeWidth="1" fill="none" />
                    </g>
                  </svg>
                </div>
              </motion.div>

              {/* Plant Base Moss & Soil Mound */}
              <div className="w-14 h-4 bg-gradient-to-r from-[#5E8355] via-[#7B9F72] to-[#5E8355] rounded-full filter blur-[0.8px] -mt-1 opacity-90 shadow-sm" />
            </div>
          );
        })}
      </div>

      {/* ================= RICH FOREGROUND MEADOW & GRASS BLADES ================= */}
      <div className="relative z-30 w-full overflow-hidden pointer-events-none -mt-4">
        {/* Layered Grass Silhouette */}
        <svg viewBox="0 0 1200 45" preserveAspectRatio="none" className="w-full h-11 fill-[#587D50]">
          <path d="M0 45 L0 18 Q20 5 40 32 Q60 2 80 35 Q100 12 120 30 Q140 4 160 38 Q180 8 200 32 Q220 2 240 36 Q260 10 280 30 Q300 3 320 38 Q340 12 360 32 Q380 4 400 36 Q420 10 440 30 Q460 2 480 38 Q500 8 520 32 Q540 4 560 36 Q580 12 600 30 Q620 2 640 38 Q660 8 680 32 Q700 4 720 36 Q740 10 760 30 Q780 2 800 38 Q820 8 840 32 Q860 4 880 36 Q900 10 920 30 Q940 2 960 38 Q980 8 1000 32 Q1020 4 1040 36 Q1060 10 1080 30 Q1100 2 1120 38 Q1140 8 1160 32 Q1180 5 1200 30 L1200 45 Z" />
        </svg>

        {/* Scattered Baby Daisies & Clover in Foreground */}
        <div className="absolute bottom-1 inset-x-0 flex justify-between px-6 opacity-85">
          <span className="text-xs">🌼</span>
          <span className="text-[10px]">☘️</span>
          <span className="text-xs">🌸</span>
          <span className="text-[10px]">🌱</span>
          <span className="text-xs">🌼</span>
          <span className="text-[10px]">☘️</span>
          <span className="text-xs">🌷</span>
          <span className="text-[10px]">🌱</span>
          <span className="text-xs">🌼</span>
        </div>
      </div>

      {/* ================= GORGEOUS FLOWER NOTE POPUP MODAL ================= */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMessage}
          >
            <motion.div
              className="relative max-w-lg w-full glass-card rounded-3xl p-7 sm:p-10 shadow-2xl border border-white text-center overflow-hidden"
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.85, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative Corner Glow */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-2xl opacity-60 pointer-events-none"
                style={{ backgroundColor: activeMessage.color }}
              />
              <div
                className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-2xl opacity-50 pointer-events-none"
                style={{ backgroundColor: activeMessage.accent }}
              />

              {/* Close Button */}
              <button
                onClick={closeMessage}
                aria-label="Close message"
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 text-[#49364F]/60 hover:text-[#49364F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Big Blooming Icon Badge */}
              <div
                className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-md border border-white/90 relative"
                style={{
                  background: `linear-gradient(135deg, ${activeMessage.color}55, ${activeMessage.accent}44)`,
                }}
              >
                <span className="text-4xl animate-pulse-soft">
                  {activeMessage.id === 1 && '🌷'}
                  {activeMessage.id === 2 && '🌼'}
                  {activeMessage.id === 3 && '🪻'}
                  {activeMessage.id === 4 && '🌸'}
                  {activeMessage.id === 5 && '🌻'}
                  {activeMessage.id === 6 && '🌹'}
                </span>
              </div>

              {/* Botanical Title & Meaning */}
              <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#49364F] mb-1">
                {activeMessage.name}
              </h3>
              <p className="font-sans-body text-xs uppercase tracking-widest text-[#B87D94] font-semibold mb-1">
                {activeMessage.botanical}
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-white/80 text-[11px] font-semibold text-[#6B8E63] mb-5">
                <Heart className="w-3 h-3 fill-[#6B8E63]" />
                <span>{activeMessage.symbolism}</span>
              </div>

              {/* Heartfelt Quote */}
              <blockquote className="font-serif-title italic text-xl sm:text-2xl text-[#39263F] mb-6 leading-relaxed px-2">
                "{activeMessage.message}"
              </blockquote>

              <p className="font-handwriting text-lg text-[#49364F]/80 font-bold mb-6">
                ~ Placed tenderly in your heart 🌿
              </p>

              {/* Action Button */}
              <button
                onClick={closeMessage}
                className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#F5DCE5] to-[#F9DCCB] hover:from-[#f0ced9] hover:to-[#f3d0bd] text-sm font-bold text-[#49364F] shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <CheckCircle2 className="w-4 h-4 text-[#C97B99]" />
                <span>Keep in My Bouquet 💗</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const PauseSection: React.FC = () => {
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Rest'>('Inhale');

  useEffect(() => {
    const cycle = () => {
      setBreathPhase('Inhale');
      const t1 = setTimeout(() => {
        setBreathPhase('Hold');
        const t2 = setTimeout(() => {
          setBreathPhase('Exhale');
          const t3 = setTimeout(() => {
            setBreathPhase('Rest');
          }, 4000);
          return () => clearTimeout(t3);
        }, 2000);
        return () => clearTimeout(t2);
      }, 4000);
      return () => clearTimeout(t1);
    };

    cycle();
    const interval = setInterval(cycle, 12000);
    return () => clearInterval(interval);
  }, []);

  const pauseLines = [
    'Take a deep breath.',
    'Relax your shoulders.',
    'Let go of the things you cannot control right now.',
    "You don't have to figure everything out today.",
    'One step at a time, Subhi.',
    "You're allowed to have slow days too.",
  ];

  return (
    <section
      id="pause-section"
      className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#FFF9F0]/60 via-[#E7DDF5]/40 to-[#F5DCE5]/50"
    >
      {/* Serene Night/Twilight Ambient: Glowing Crescent Moon & Stars */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Glowing Crescent Moon */}
        <div className="absolute top-12 right-[12%] sm:right-[18%] w-24 h-24">
          <motion.div
            animate={{
              y: [0, -8, 0],
              opacity: [0.85, 1, 0.85],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="relative"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#FFE8A3] to-[#FFF9F0] shadow-[0_0_40px_10px_rgba(255,232,163,0.45)] relative overflow-hidden">
              {/* Moon shadow cut for crescent */}
              <div className="absolute -top-1 -right-2 w-16 h-16 rounded-full bg-[#EFE4F5]/90" />
            </div>
            <span className="absolute -bottom-2 -left-3 text-yellow-300 text-sm">✦</span>
            <span className="absolute -top-3 -right-2 text-yellow-300 text-xs">✦</span>
          </motion.div>
        </div>

        {/* Floating Stars */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-200/80 font-serif select-none"
            style={{
              left: `${(i * 7 + 5) % 95}%`,
              top: `${(i * 9 + 10) % 90}%`,
              fontSize: `${10 + (i % 3) * 6}px`,
            }}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + (i % 3) * 1.5,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            ★
          </motion.div>
        ))}

        {/* Soft Clouds Floating */}
        <motion.div
          className="absolute bottom-20 -left-10 w-96 h-36 bg-white/40 rounded-full blur-xl"
          animate={{ x: [0, 40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto text-center">
        {/* Section Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans-body text-xs font-semibold uppercase tracking-widest text-[#B87D94] block mb-2">
            Peaceful Sanctuary
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#49364F] font-normal italic">
            Take a Little Pause...
          </h2>
        </motion.div>

        {/* Interactive Breathing Companion Circle */}
        <div className="my-8 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Soft Halo Glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#F5DCE5] via-[#E7DDF5] to-[#FFE8A3] blur-2xl opacity-60"
              animate={{
                scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.25 : 0.9,
                opacity: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 0.75 : 0.4,
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            />

            {/* Middle Ripple Circle */}
            <motion.div
              className="absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border-2 border-dashed border-[#DFAFC2]/50"
              animate={{
                scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.15 : 0.92,
                rotate: 360,
              }}
              transition={{
                scale: { duration: 4, ease: 'easeInOut' },
                rotate: { duration: 40, repeat: Infinity, ease: 'linear' },
              }}
            />

            {/* Core Interactive Breath Sphere */}
            <motion.div
              className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[#FFF9F0] via-[#F5DCE5] to-[#E7DDF5] shadow-xl border border-white flex flex-col items-center justify-center p-4 text-center cursor-default select-none"
              animate={{
                scale: breathPhase === 'Inhale' || breathPhase === 'Hold' ? 1.22 : 0.9,
              }}
              transition={{ duration: 4, ease: 'easeInOut' }}
            >
              <span className="text-2xl mb-1">
                {breathPhase === 'Inhale' ? '🌸' : breathPhase === 'Hold' ? '☁️' : '🍃'}
              </span>
              <p className="font-serif-title italic text-lg sm:text-xl text-[#49364F] font-semibold">
                {breathPhase === 'Inhale' && 'Breathe in...'}
                {breathPhase === 'Hold' && 'Hold gently...'}
                {breathPhase === 'Exhale' && 'Breathe out...'}
                {breathPhase === 'Rest' && 'Rest peacefully...'}
              </p>
              <span className="font-sans-body text-[10px] text-[#49364F]/60 uppercase tracking-widest mt-1">
                Deep Calm
              </span>
            </motion.div>
          </div>
        </div>

        {/* Calm Heartfelt Reflection Text */}
        <div className="glass-card rounded-3xl p-8 sm:p-10 max-w-xl mx-auto border border-white/80 shadow-lg mt-6">
          <div className="space-y-3 font-sans-body text-base sm:text-lg text-[#49364F]/85 leading-relaxed font-medium">
            {pauseLines.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={
                  idx === pauseLines.length - 2
                    ? 'font-serif-title italic text-xl text-[#B87D94] pt-2 font-semibold'
                    : ''
                }
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

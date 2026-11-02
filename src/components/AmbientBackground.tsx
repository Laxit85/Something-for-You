import React from 'react';
import { motion } from 'framer-motion';

export const AmbientBackground: React.FC = () => {
  // Generate random petal paths
  const petals = React.useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 14,
      duration: 12 + Math.random() * 12,
      delay: Math.random() * 10,
      rotateStart: Math.random() * 360,
      color: i % 3 === 0 ? '#F5DCE5' : i % 3 === 1 ? '#DFAFC2' : '#FFF0F5',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dreamy Gradient Mesh Orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F5DCE5] mix-blend-multiply filter blur-3xl opacity-40 animate-gentle-float" />
      <div className="absolute top-1/3 -right-32 w-[32rem] h-[32rem] rounded-full bg-[#E7DDF5] mix-blend-multiply filter blur-3xl opacity-40 animate-pulse-soft" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-[#F9DCCB] mix-blend-multiply filter blur-3xl opacity-35 animate-gentle-float" />

      {/* Floating Soft Cloud Silhouettes */}
      <motion.div
        className="absolute top-24 left-[-15%] w-[400px] h-[140px] opacity-25 filter blur-sm"
        animate={{ x: ['0vw', '120vw'] }}
        transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 70" fill="#FFFFFF">
          <path d="M20 50 Q30 20 60 30 Q80 10 110 25 Q140 10 160 35 Q190 35 180 55 Q130 65 20 50 Z" />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-[60%] right-[-20%] w-[500px] h-[160px] opacity-20 filter blur-sm"
        animate={{ x: ['0vw', '-130vw'] }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 200 70" fill="#FFFFFF">
          <path d="M20 50 Q30 20 60 30 Q80 10 110 25 Q140 10 160 35 Q190 35 180 55 Q130 65 20 50 Z" />
        </svg>
      </motion.div>

      {/* Drifting Flower Petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute"
          style={{
            left: `${petal.x}%`,
            top: '-5%',
            width: petal.size,
            height: petal.size * 1.3,
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(petal.id) * 60, Math.cos(petal.id) * -40, 20],
            rotate: [petal.rotateStart, petal.rotateStart + 360],
            rotateX: [0, 180, 360],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <svg viewBox="0 0 30 40" fill={petal.color} className="opacity-70 drop-shadow-sm">
            <path d="M15 0 C25 10 30 25 20 35 C10 40 5 35 3 25 C1 12 8 2 15 0 Z" />
          </svg>
        </motion.div>
      ))}

      {/* Gentle Sparkles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute text-yellow-300 font-serif"
          style={{
            left: `${(i * 8.5 + 4) % 96}%`,
            top: `${(i * 15 + 8) % 92}%`,
            fontSize: `${10 + (i % 3) * 6}px`,
          }}
          animate={{
            scale: [0.6, 1.3, 0.6],
            opacity: [0.2, 0.8, 0.2],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: 3 + (i % 4),
            delay: i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ✦
        </motion.div>
      ))}
    </div>
  );
};

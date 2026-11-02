import React from 'react';
import { motion } from 'framer-motion';

interface ButterflyProps {
  startX: number;
  startY: number;
  color: string;
  delay?: number;
  duration?: number;
  scale?: number;
}

const ButterflyItem: React.FC<ButterflyProps> = ({
  startX,
  startY,
  color,
  delay = 0,
  duration = 18,
  scale = 0.8,
}) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-10"
      style={{ left: `${startX}%`, top: `${startY}%` }}
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, 80, 160, 240, 140, 40, -40, 0],
        y: [0, -60, -20, -100, -180, -120, -40, 0],
        rotate: [0, 15, -10, 20, -15, 10, -5, 0],
        opacity: [0, 0.85, 0.9, 0.85, 0.7, 0.9, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="relative"
        style={{ transform: `scale(${scale})` }}
      >
        <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
          {/* Left Wing */}
          <motion.path
            d="M20 17 C16 4 4 2 2 12 C0 22 10 26 20 18 Z"
            fill={color}
            opacity="0.85"
            style={{ transformOrigin: '20px 17px' }}
            animate={{ rotateY: [0, 75, 0] }}
            transition={{
              duration: 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M20 17 C14 12 6 10 5 18 C4 26 14 26 20 20 Z"
            fill="#FFF9F0"
            opacity="0.4"
            style={{ transformOrigin: '20px 17px' }}
            animate={{ rotateY: [0, 75, 0] }}
            transition={{
              duration: 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Right Wing */}
          <motion.path
            d="M22 17 C26 4 38 2 40 12 C42 22 32 26 22 18 Z"
            fill={color}
            opacity="0.85"
            style={{ transformOrigin: '22px 17px' }}
            animate={{ rotateY: [0, -75, 0] }}
            transition={{
              duration: 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.path
            d="M22 17 C28 12 36 10 37 18 C38 26 28 26 22 20 Z"
            fill="#FFF9F0"
            opacity="0.4"
            style={{ transformOrigin: '22px 17px' }}
            animate={{ rotateY: [0, -75, 0] }}
            transition={{
              duration: 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Body & Antennae */}
          <ellipse cx="21" cy="18" rx="1.5" ry="7" fill="#49364F" />
          <path d="M20.5 11 Q17 6 14 7" stroke="#49364F" strokeWidth="0.8" fill="none" />
          <path d="M21.5 11 Q25 6 28 7" stroke="#49364F" strokeWidth="0.8" fill="none" />
        </svg>
      </div>
    </motion.div>
  );
};

export const Butterflies: React.FC = () => {
  return (
    <>
      <ButterflyItem startX={10} startY={25} color="#DFAFC2" delay={0} duration={22} scale={0.8} />
      <ButterflyItem startX={75} startY={45} color="#E7DDF5" delay={5} duration={26} scale={0.7} />
      <ButterflyItem startX={30} startY={70} color="#F9DCCB" delay={11} duration={24} scale={0.85} />
      <ButterflyItem startX={85} startY={15} color="#DFAFC2" delay={16} duration={20} scale={0.65} />
    </>
  );
};

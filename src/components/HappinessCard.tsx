import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { audio } from '../utils/audio';

export interface CardItem {
  icon: string;
  title: string;
  message: string;
  accentColor: string;
  bgGradient: string;
  sparkleColor: string;
  secretWish: string;
}

interface HappinessCardProps {
  card: CardItem;
  index: number;
}

export const HappinessCard: React.FC<HappinessCardProps> = ({ card, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Mouse tilt physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['14deg', '-14deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-14deg', '14deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audio.playChime(523 + index * 65);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
    audio.playPop();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className="relative h-[340px] w-full cursor-pointer select-none"
      style={{
        perspective: '1000px',
      }}
      initial={{ opacity: 0, y: 40 + index * 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="w-full h-full relative rounded-3xl p-7 transition-shadow duration-500 flex flex-col justify-between"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          background: card.bgGradient,
          boxShadow: isHovered
            ? `0 20px 40px -10px ${card.accentColor}55, 0 8px 16px -4px rgba(73, 54, 79, 0.08)`
            : '0 12px 30px -8px rgba(73, 54, 79, 0.06)',
          border: '1px solid rgba(255, 255, 255, 0.85)',
        }}
        animate={{
          y: isHovered ? -8 : [0, -6, 0],
        }}
        transition={{
          y: isHovered
            ? { duration: 0.2 }
            : { duration: 5 + index, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        {/* Glow ambient circle inside */}
        <div
          className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ background: card.accentColor }}
        />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10" style={{ transform: 'translateZ(30px)' }}>
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-white/80"
            style={{ background: 'rgba(255, 255, 255, 0.85)' }}
          >
            {card.icon}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#49364F]/50 px-3 py-1 rounded-full bg-white/50 border border-white/60">
            Card 0{index + 1}
          </span>
        </div>

        {/* Middle Content */}
        <div className="my-auto z-10" style={{ transform: 'translateZ(25px)' }}>
          <h3 className="font-serif-title text-2xl text-[#49364F] font-bold mb-3 flex items-center gap-2">
            {card.title}
          </h3>
          <p className="font-sans-body text-[#49364F]/85 text-sm sm:text-base leading-relaxed">
            "{card.message}"
          </p>
        </div>

        {/* Bottom Interactive Hint */}
        <div
          className="pt-3 border-t border-white/60 flex items-center justify-between text-xs text-[#49364F]/60 z-10 font-semibold"
          style={{ transform: 'translateZ(20px)' }}
        >
          <span className="flex items-center gap-1.5">
            <span className="text-[#DFAFC2]">✦</span>
            <span>{isFlipped ? card.secretWish : 'A little gift for you'}</span>
          </span>
          <span className="text-xs text-[#DFAFC2] font-serif italic">
            {isFlipped ? 'Tap to close' : 'Tap to reveal ✨'}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

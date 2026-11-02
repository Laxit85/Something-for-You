import React from 'react';
import { motion } from 'framer-motion';
import { HappinessCard, type CardItem } from '../components/HappinessCard';

export const GoodThingsSection: React.FC = () => {
  const cards: CardItem[] = [
    {
      icon: '🌻',
      title: 'A Little Happiness',
      message: 'May you always find little reasons to smile, even on the most ordinary days.',
      accentColor: '#FFE082',
      bgGradient: 'linear-gradient(135deg, rgba(255, 249, 230, 0.9), rgba(255, 243, 224, 0.75))',
      sparkleColor: '#FFA000',
      secretWish: 'You deserve golden warmth today.',
    },
    {
      icon: '☁️',
      title: 'Peaceful Moments',
      message: 'May your mind find the peace it sometimes forgets to give itself.',
      accentColor: '#B3C5FF',
      bgGradient: 'linear-gradient(135deg, rgba(240, 244, 255, 0.9), rgba(231, 221, 245, 0.75))',
      sparkleColor: '#7C83FD',
      secretWish: 'Exhale deeply, Subhi.',
    },
    {
      icon: '🦋',
      title: 'Beautiful Surprises',
      message: 'May life surprise you with beautiful moments when you least expect them.',
      accentColor: '#F9DCCB',
      bgGradient: 'linear-gradient(135deg, rgba(253, 238, 230, 0.9), rgba(245, 220, 229, 0.75))',
      sparkleColor: '#DFAFC2',
      secretWish: 'Magic is around you right now.',
    },
    {
      icon: '✨',
      title: 'Endless Possibilities',
      message: 'May every new day bring something wonderful into your life.',
      accentColor: '#E7DDF5',
      bgGradient: 'linear-gradient(135deg, rgba(248, 243, 255, 0.9), rgba(255, 249, 240, 0.75))',
      sparkleColor: '#BA68C8',
      secretWish: 'Tomorrow is brand new.',
    },
  ];

  return (
    <section
      id="good-things-section"
      className="relative min-h-screen py-24 px-4 flex flex-col justify-center items-center"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans-body text-xs font-semibold uppercase tracking-widest text-[#DFAFC2] block mb-2">
            Wishes From The Heart
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl text-[#49364F] font-normal italic leading-snug">
            Things I Hope Your Days Are Filled With
          </h2>
          <p className="font-sans-body text-sm sm:text-base text-[#49364F]/70 mt-3">
            Hover or tap each card to send a little extra warmth your way.
          </p>
        </motion.div>

        {/* 4 Responsive 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {cards.map((card, idx) => (
            <HappinessCard key={idx} card={card} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

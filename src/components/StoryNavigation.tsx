import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { audio } from '../utils/audio';

export const StoryNavigation: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState('Welcome');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(100, Math.max(0, (current / totalScroll) * 100)) : 0;
      setScrollProgress(progress);

      // Determine active section by scroll position
      const sections = [
        { id: 'hero-section', name: 'Welcome' },
        { id: 'note-section', name: 'A Little Note' },
        { id: 'good-things-section', name: 'Good Things' },
        { id: 'garden-section', name: 'The Garden' },
        { id: 'challenge-section', name: 'Smile Mission' },
        { id: 'pause-section', name: 'A Little Pause' },
        { id: 'letter-section', name: 'Your Letter' },
        { id: 'final-section', name: 'A Little Gift' },
      ];

      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            setCurrentSection(sec.name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    audio.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-4">
      <motion.div
        className="glass-panel px-4 py-2 rounded-full shadow-lg border border-white/80 flex items-center gap-3.5 pointer-events-auto"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Current Section Indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#DFAFC2] animate-pulse" />
          <span className="font-sans-body text-xs font-bold text-[#49364F] tracking-wide">
            {currentSection}
          </span>
        </div>

        {/* Mini Progress Track */}
        <div className="w-16 h-1 bg-[#E7DDF5] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#DFAFC2] to-[#B87D94] transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Back to top if scrolled past hero */}
        {scrollProgress > 15 && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="p-1 rounded-full hover:bg-white/70 text-[#49364F]/70 hover:text-[#49364F] transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        )}
      </motion.div>
    </div>
  );
};

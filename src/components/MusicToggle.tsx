import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Music,
  ChevronDown,
  Upload,
  Check,
  Disc3,
  SlidersHorizontal,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { audio } from '../utils/audio';

export const MusicToggle: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(!audio.getIsMuted());
  const [currentTrack, setCurrentTrack] = useState(audio.getCurrentTrack());
  const [tracks, setTracks] = useState(audio.getTracks());
  const [volume, setVolume] = useState(audio.getVolume());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = audio.subscribe(() => {
      setIsPlaying(!audio.getIsMuted());
      setCurrentTrack(audio.getCurrentTrack());
      setTracks(audio.getTracks());
      setVolume(audio.getVolume());
    });
    return unsubscribe;
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

  const handleToggle = () => {
    const active = audio.toggleMusic();
    setIsPlaying(active);
    if (active) {
      audio.playChime(784);
    }
  };

  const handleSelectTrack = (trackId: string) => {
    audio.setTrack(trackId);
    if (!isPlaying) {
      audio.toggleMusic();
    }
    setIsMenuOpen(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      audio.setCustomTrack(file);
      if (!isPlaying) {
        audio.toggleMusic();
      }
      setIsMenuOpen(false);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    audio.setVolume(newVol);
    setVolume(newVol);
  };

  return (
    <div ref={menuRef} className="fixed top-5 right-5 z-40 flex flex-col items-end">
      {/* Main Bar */}
      <div className="flex items-center gap-1.5 p-1 glass-panel rounded-full shadow-lg border border-white/80 backdrop-blur-md">
        {/* Play / Mute Toggle Button */}
        <button
          onClick={handleToggle}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className="px-3.5 py-2 rounded-full flex items-center gap-2 text-[#49364F] hover:text-[#2d1f33] hover:bg-white/50 transition-all duration-300 group cursor-pointer"
        >
          <div className="relative w-5 h-5 flex items-center justify-center">
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-[#C97B99] group-hover:scale-110 transition-transform" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#49364F]/50 group-hover:scale-110 transition-transform" />
            )}
          </div>

          <span className="text-xs font-semibold tracking-wide uppercase font-sans-body">
            {isPlaying ? 'Music On' : 'Music Off'}
          </span>

          {/* Equalizer Wave Bars */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3 ml-0.5">
              <span className="w-0.5 h-full bg-[#C97B99] rounded-full animate-pulse" />
              <span className="w-0.5 h-2 bg-[#F9DCCB] rounded-full animate-bounce" />
              <span className="w-0.5 h-3 bg-[#C97B99] rounded-full animate-pulse" />
            </div>
          ) : (
            <Music className="w-3.5 h-3.5 text-[#49364F]/40" />
          )}
        </button>

        {/* Track Selector / Menu Opener */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Change song track"
          className="px-2.5 py-2 rounded-full flex items-center gap-1.5 text-xs font-medium text-[#49364F]/80 hover:text-[#49364F] hover:bg-white/60 transition-colors border-l border-white/60 cursor-pointer"
        >
          <span className="text-sm">{currentTrack.icon}</span>
          <span className="hidden sm:inline-block max-w-[110px] truncate">
            {currentTrack.title}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#49364F]/60 transition-transform duration-300 ${
              isMenuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Track Selection & Volume Popover */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mt-2 w-72 sm:w-80 glass-panel rounded-2xl p-4 shadow-xl border border-white/90 backdrop-blur-xl text-[#49364F]"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#49364F]/10 mb-3">
              <div className="flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-[#C97B99] animate-spin-slow" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#49364F]/70">
                  Select Background Track
                </span>
              </div>
            </div>

            {/* Track List */}
            <div className="space-y-1.5">
              {tracks.map((track) => {
                const isSelected = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#F5DCE5]/80 to-[#E7DDF5]/80 border border-[#DFAFC2]/60 shadow-sm'
                        : 'hover:bg-white/60 text-[#49364F]/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-lg">{track.icon}</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate leading-tight">
                          {track.title}
                        </p>
                        <p className="text-[11px] text-[#49364F]/60 truncate leading-tight mt-0.5">
                          {track.tag}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-[#C97B99] shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Upload Custom Audio File */}
            <div className="mt-3 pt-3 border-t border-[#49364F]/10">
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full px-3 py-2 rounded-xl border border-dashed border-[#DFAFC2] hover:border-[#C97B99] hover:bg-[#F5DCE5]/30 text-xs font-semibold text-[#49364F]/80 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#C97B99]" />
                <span>Upload Your Own Song (MP3 / Audio)</span>
              </button>
            </div>

            {/* Volume Control */}
            <div className="mt-3 pt-3 border-t border-[#49364F]/10 flex items-center gap-2.5 px-1">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#49364F]/50 shrink-0" />
              <span className="text-[11px] font-semibold text-[#49364F]/60 uppercase tracking-wider">
                Volume
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                className="w-full h-1.5 bg-[#49364F]/15 rounded-lg appearance-none cursor-pointer accent-[#C97B99]"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
              <span className="text-[11px] font-medium text-[#49364F]/60 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

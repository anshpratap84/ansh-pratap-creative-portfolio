import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundActive, setSoundActive] = useState(soundManager.isEnabled());

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newState = soundManager.toggleSound();
    setSoundActive(newState);
  };

  // Circular progress math
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-7 right-8 z-40 flex items-center gap-2.5"
        >
          {/* Sound FX Tactile Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={soundActive ? 'Mute sound effects' : 'Enable tactile audio feedback'}
            title={soundActive ? 'Tactile Sound: ON (Click to mute)' : 'Tactile Sound: OFF (Click to enable)'}
            className={`p-3 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg cursor-pointer ${
              soundActive
                ? 'bg-emerald-500/15 dark:bg-[#C6F36B]/20 border-emerald-500/50 dark:border-[#C6F36B]/60 text-emerald-700 dark:text-[#C6F36B] shadow-[0_0_12px_rgba(198,243,107,0.3)]'
                : 'bg-white/90 dark:bg-[#1B1E26]/90 border-stone-200 dark:border-[#262A34] text-stone-500 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-[#F3F1EA]'
            }`}
          >
            {soundActive ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Radial Scroll Progress + Back-To-Top Button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            title={`Scroll to top (${Math.round(scrollProgress)}%)`}
            className="group relative w-12 h-12 rounded-full bg-white/95 dark:bg-[#1B1E26]/95 backdrop-blur-md border border-stone-200 dark:border-[#262A34] shadow-xl hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-all flex items-center justify-center cursor-pointer active:scale-95"
          >
            {/* SVG Circular Progress Track */}
            <svg className="w-full h-full -rotate-90 pointer-events-none p-1">
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-stone-200 dark:stroke-stone-800"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r={radius}
                className="stroke-emerald-500 dark:stroke-[#C6F36B] transition-all duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Inner Arrow Icon */}
            <div className="absolute inset-0 flex items-center justify-center text-stone-700 dark:text-[#F3F1EA] group-hover:text-emerald-600 dark:group-hover:text-[#C6F36B] group-hover:-translate-y-0.5 transition-all">
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

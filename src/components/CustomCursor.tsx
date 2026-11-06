import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Play, ArrowUpRight, MoveHorizontal } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

type CursorMode = 'default' | 'hover' | 'play' | 'view' | 'drag';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const rawMouseX = useMotionValue(-100);
  const rawMouseY = useMotionValue(-100);

  // Smooth springs for high-end cinematic trailing physics
  const springX = useSpring(rawMouseX, { stiffness: 450, damping: 32, mass: 0.5 });
  const springY = useSpring(rawMouseY, { stiffness: 450, damping: 32, mass: 0.5 });

  useEffect(() => {
    // Detect touch / mobile
    const checkTouch = () => {
      if (typeof window !== 'undefined') {
        const isCoarse = window.matchMedia('(pointer: coarse)').matches;
        const isSmallScreen = window.innerWidth < 768;
        setIsTouchDevice(isCoarse || isSmallScreen);
      }
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      rawMouseX.set(e.clientX);
      rawMouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Inspect hovered target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const customMode = cursorTarget.getAttribute('data-cursor') as CursorMode;
        if (customMode && customMode !== cursorMode) {
          setCursorMode(customMode);
          soundManager.playHover();
        }
        return;
      }

      const isVideoTrigger = target.closest('button[aria-label*="Play" i], [role="button"][aria-label*="Play" i], .group\\/video');
      if (isVideoTrigger) {
        if (cursorMode !== 'play') {
          setCursorMode('play');
          soundManager.playHover();
        }
        return;
      }

      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"], [role="tab"]');
      if (isInteractive) {
        if (cursorMode !== 'hover') {
          setCursorMode('hover');
          soundManager.playHover();
        }
      } else {
        if (cursorMode !== 'default') {
          setCursorMode('default');
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      soundManager.playClick();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isVisible, cursorMode, rawMouseX, rawMouseY]);

  // Do not render on touch devices to ensure native touch feel & high frame rates
  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Spring Ring / Context Badge */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center will-change-transform"
      >
        {cursorMode === 'default' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-8 h-8 rounded-full border border-stone-400/50 dark:border-[#C6F36B]/40 transition-colors duration-200"
          />
        )}

        {cursorMode === 'hover' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.25, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="w-10 h-10 rounded-full border-2 border-emerald-500/80 dark:border-[#C6F36B] bg-emerald-500/10 dark:bg-[#C6F36B]/15 backdrop-blur-[1px] shadow-[0_0_15px_rgba(198,243,107,0.3)] transition-all"
          />
        )}

        {cursorMode === 'play' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="px-3.5 py-1.5 rounded-full bg-emerald-400 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318] font-mono text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-[0_0_20px_rgba(198,243,107,0.6)]"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>PLAY</span>
          </motion.div>
        )}

        {cursorMode === 'view' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="px-3 py-1 rounded-full bg-stone-900/90 dark:bg-[#1B1E26]/95 border border-stone-200 dark:border-[#C6F36B]/60 text-stone-100 dark:text-[#C6F36B] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-lg"
          >
            <span>VIEW</span>
            <ArrowUpRight className="w-3 h-3" />
          </motion.div>
        )}

        {cursorMode === 'drag' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className="px-3 py-1 rounded-full bg-stone-900/90 dark:bg-[#1B1E26]/95 border border-stone-200 dark:border-[#C6F36B]/60 text-stone-100 dark:text-[#C6F36B] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
          >
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span>SLIDE</span>
          </motion.div>
        )}
      </motion.div>

      {/* Center Precise Dot (Immediate follow) */}
      <motion.div
        style={{
          x: rawMouseX,
          y: rawMouseY,
        }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full transition-all duration-150 will-change-transform ${
          cursorMode === 'play' || cursorMode === 'view' || cursorMode === 'drag'
            ? 'opacity-0 scale-0'
            : 'w-1.5 h-1.5 bg-emerald-600 dark:bg-[#C6F36B] shadow-[0_0_6px_#C6F36B]'
        }`}
      />
    </div>
  );
};

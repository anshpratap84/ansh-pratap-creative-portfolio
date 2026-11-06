import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

interface Chapter {
  id: string;
  number: string;
  name: string;
}

const CHAPTERS: Chapter[] = [
  { id: 'hero', number: '01', name: 'Intro' },
  { id: 'about', number: '02', name: 'About' },
  { id: 'projects', number: '03', name: 'Work' },
  { id: 'services', number: '04', name: 'Services' },
  { id: 'toolkit', number: '05', name: 'Skills' },
  { id: 'experience', number: '06', name: 'Journey' },
  { id: 'credentials', number: '07', name: 'Awards' },
  { id: 'contact', number: '08', name: 'Contact' },
];

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 35,
    restDelta: 0.001,
  });

  const [activeChapter, setActiveChapter] = useState<Chapter>(CHAPTERS[0]);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;

      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const chapter = CHAPTERS[i];
        if (chapter.id === 'hero') {
          if (window.scrollY < 300) {
            setActiveChapter(chapter);
            break;
          }
        } else {
          const el = document.getElementById(chapter.id);
          if (el && el.offsetTop <= scrollPos) {
            setActiveChapter(chapter);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Top 2.5px Spring Scrollbar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-stone-200/40 dark:bg-black/30 pointer-events-none">
        <motion.div
          style={{ scaleX, transformOrigin: '0%' }}
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-[#C6F36B] shadow-[0_0_10px_#C6F36B]"
        />
      </div>

      {/* Subtle Floating Chapter Tracker (Desktop) */}
      <div className="fixed bottom-7 left-8 z-40 hidden xl:flex items-center gap-3">
        <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-[#1B1E26]/90 backdrop-blur-md border border-stone-200 dark:border-[#262A34] shadow-lg text-[11px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B] animate-pulse" />
          <span className="text-emerald-700 dark:text-[#C6F36B] font-bold">
            {activeChapter.number}
          </span>
          <span className="text-stone-400 dark:text-[#9296A2]/40">/</span>
          <span className="text-stone-900 dark:text-[#F3F1EA] font-semibold uppercase tracking-wider">
            {activeChapter.name}
          </span>
          <span className="text-stone-400 dark:text-[#9296A2]/40">·</span>
          <span className="text-stone-500 dark:text-[#9296A2] tabular-nums">
            {scrollPercent}%
          </span>
        </div>

        {/* Milestone Quick Jump Dots */}
        <div className="flex items-center gap-1.5 px-2.5 py-2 rounded-full bg-white/70 dark:bg-[#1B1E26]/70 backdrop-blur-md border border-stone-200/80 dark:border-[#262A34]/80 shadow-md">
          {CHAPTERS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => scrollToSection(ch.id)}
              aria-label={`Jump to ${ch.name}`}
              title={`${ch.number} - ${ch.name}`}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                activeChapter.id === ch.id
                  ? 'w-5 h-2 bg-emerald-500 dark:bg-[#C6F36B] shadow-[0_0_8px_#C6F36B]'
                  : 'w-2 h-2 bg-stone-300 dark:bg-stone-700 hover:bg-stone-500 dark:hover:bg-stone-400'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

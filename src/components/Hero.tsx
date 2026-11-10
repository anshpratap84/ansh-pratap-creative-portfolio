import React, { useRef } from 'react';
import { motion, Variants } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useHeroParallax } from '../hooks/useHeroParallax';
import { CreativeShowcaseViewport } from './CreativeShowcaseViewport';
import { soundManager } from '../utils/soundEffects';

interface HeroProps {
  onOpenInquiry: (serviceName?: string) => void;
  onPlayShowreel?: () => void;
}

// Framer Motion container variants for staggered word orchestration
const headlineContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.18,
    },
  },
};

// Word-reveal variant with editorial mask, subtle 3D tilt, and de-blur
const wordRevealVariants: Variants = {
  hidden: {
    y: '115%',
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: {
    y: '0%',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.78,
      ease: [0.16, 1, 0.3, 1], // Editorial smooth decelerate
    },
  },
};

// Floating particle definitions
const PARTICLES = [
  { id: 1, x: '12%', y: '24%', size: 4, duration: 8, delay: 0 },
  { id: 2, x: '82%', y: '18%', size: 6, duration: 11, delay: 1 },
  { id: 3, x: '45%', y: '78%', size: 3, duration: 9, delay: 2 },
  { id: 4, x: '68%', y: '65%', size: 5, duration: 12, delay: 0.5 },
  { id: 5, x: '28%', y: '82%', size: 4, duration: 10, delay: 1.5 },
  { id: 6, x: '92%', y: '48%', size: 3, duration: 13, delay: 2.5 },
];

export const Hero: React.FC<HeroProps> = ({ onOpenInquiry, onPlayShowreel }) => {
  const heroRef = useRef<HTMLElement>(null);

  // Parallax hook providing spring-smoothed differential offsets
  const { visualY, textY } = useHeroParallax(heroRef, {
    visualRange: [0, -65],
    textRange: [0, -20],
  });

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300"
    >
      {/* Subtle Atmospheric Lighting & Cinematic Bokeh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 right-1/4 w-[580px] h-[580px] bg-emerald-500/8 dark:bg-[#C6F36B]/6 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 left-1/6 w-[420px] h-[420px] bg-teal-500/5 dark:bg-[#C6F36B]/4 rounded-full blur-[120px]" />

        {/* Floating Ambient Light Dust / Bokeh Particles */}
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.2, y: 0 }}
            animate={{
              opacity: [0.2, 0.65, 0.2],
              y: [-15, 15, -15],
              x: [-10, 10, -10],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
            }}
            className="absolute rounded-full bg-emerald-500/30 dark:bg-[#C6F36B]/40 blur-[1px] shadow-[0_0_8px_#C6F36B]"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* LEFT COLUMN: Editorial Typography & Narrative (Attached to textY parallax) */}
        <motion.div
          style={{ y: textY }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Identity Tag & Professional Disciplines */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-2 text-xs font-mono tracking-widest text-stone-600 dark:text-[#9296A2] uppercase mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#C6F36B] shadow-[0_0_8px_rgba(22,163,74,0.4)] dark:shadow-[0_0_8px_#C6F36B] animate-pulse" />
            <span className="text-stone-900 dark:text-[#F3F1EA] font-semibold">{PERSONAL_INFO.cleanName}</span>
            <span className="text-stone-400 dark:text-[#9296A2]/60">/</span>
            <span>VIDEO EDITING × GRAPHIC DESIGN × GENERATIVE AI</span>
          </motion.div>

          {/* Staggered Editorial Headline with Sharper Letter Contrast & Word Reveal */}
          <motion.h1
            variants={headlineContainerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-6xl lg:text-[4.5rem] font-black tracking-[-0.035em] font-display leading-[1.02] mb-8"
          >
            {/* LINE 1: CREATING VISUALS */}
            <div className="overflow-hidden pb-1">
              <motion.span
                variants={wordRevealVariants}
                className="inline-block mr-3 text-stone-950 dark:text-[#FFFFFF] drop-shadow-[0_2px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_2px_24px_rgba(255,255,255,0.18)]"
              >
                CREATING
              </motion.span>
              <motion.span
                variants={wordRevealVariants}
                className="inline-block text-stone-950 dark:text-[#FFFFFF] drop-shadow-[0_2px_24px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_2px_24px_rgba(255,255,255,0.18)]"
              >
                VISUALS
                <span className="text-emerald-500 dark:text-[#C6F36B] drop-shadow-[0_0_12px_rgba(22,163,74,0.4)] dark:drop-shadow-[0_0_12px_rgba(198,243,107,0.6)]">.</span>
              </motion.span>
            </div>

            {/* LINE 2: BUILDING EXPERIENCES */}
            <div className="overflow-hidden pb-1 mt-1">
              <motion.span
                variants={wordRevealVariants}
                className="inline-block mr-3 text-stone-800 dark:text-[#ECEEF2]"
              >
                BUILDING
              </motion.span>
              <motion.span
                variants={wordRevealVariants}
                className="inline-block text-stone-800 dark:text-[#ECEEF2]"
              >
                EXPERIENCES
                <span className="text-stone-400 dark:text-[#ECEEF2]/40">.</span>
              </motion.span>
            </div>

            {/* LINE 3: EXPLORING AI (Signature Accent) */}
            <div className="overflow-hidden pb-1 mt-1 text-emerald-600 dark:text-[#C6F36B]">
              <motion.span
                variants={wordRevealVariants}
                className="inline-block mr-3 drop-shadow-[0_0_24px_rgba(22,163,74,0.25)] dark:drop-shadow-[0_0_24px_rgba(198,243,107,0.35)]"
              >
                EXPLORING
              </motion.span>
              <motion.span
                variants={wordRevealVariants}
                className="inline-block drop-shadow-[0_0_24px_rgba(22,163,74,0.25)] dark:drop-shadow-[0_0_24px_rgba(198,243,107,0.35)]"
              >
                AI
                <span className="text-stone-950 dark:text-[#FFFFFF]">.</span>
              </motion.span>
            </div>
          </motion.h1>

          {/* Supporting Statement */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            className="text-base sm:text-lg text-stone-600 dark:text-[#F3F1EA]/85 font-normal leading-relaxed mb-10 max-w-xl"
          >
            I'm Ansh Pratap — a creative technologist exploring the intersection of video editing, graphic design, and Generative AI.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-wrap items-center gap-4"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => soundManager.playClick()}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-lg active:scale-95 uppercase tracking-wider hover:shadow-[0_0_25px_rgba(198,243,107,0.4)]"
            >
              <span>Explore My Work</span>
              <ArrowDown className="w-4 h-4 text-stone-950 dark:text-[#111318]" />
            </motion.a>

            <motion.button
              onClick={() => {
                soundManager.playClick();
                onOpenInquiry('General Creative Collaboration');
              }}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-xs sm:text-sm font-semibold text-stone-900 dark:text-[#FFFFFF] bg-white dark:bg-[#1B1E26] hover:bg-stone-100 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 rounded-xl transition-all cursor-pointer shadow-sm hover:shadow-md"
            >
              <span>Let's Collaborate</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B]" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN: Attractive & Unique Interactive Creative Showcase Viewport */}
        <motion.div
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative flex items-center justify-center w-full"
        >
          <CreativeShowcaseViewport onPlayShowreel={onPlayShowreel} />
        </motion.div>
      </div>
    </section>
  );
};

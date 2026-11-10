import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Download, Film, Sparkles, Sliders, Palette, GraduationCap, MapPin, Clock } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { calculateReadingTime, ReadingTimeResult } from '../utils/readingTime';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [readingTime, setReadingTime] = useState<ReadingTimeResult>(() =>
    calculateReadingTime(PERSONAL_INFO.aboutText + ' ' + PERSONAL_INFO.introduction)
  );

  useEffect(() => {
    if (sectionRef.current) {
      // Dynamically count words and calculate reading time from the rendered section DOM
      const result = calculateReadingTime(sectionRef.current);
      setReadingTime(result);
    }
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative border-t border-stone-200 dark:border-[#262A34] bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B]" />
              <span>02 / ABOUT ME</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-900 dark:text-[#F3F1EA] font-display">
              Turning Ideas Into Visual Stories.
            </h2>
          </div>

          {/* Reading Time Badge in Section Header */}
          <div
            title={`Estimated reading time based on ${readingTime.words} words in this section`}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/25 dark:border-[#C6F36B]/25 text-emerald-700 dark:text-[#C6F36B] font-mono text-xs font-semibold self-start sm:self-end shadow-sm backdrop-blur-sm transition-all"
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B] shrink-0" />
            <span>{readingTime.text}</span>
            <span className="text-stone-300 dark:text-[#9296A2]/40">·</span>
            <span className="text-stone-600 dark:text-[#9296A2] font-normal text-[11px]">
              {readingTime.words} words
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* User's Actual Photo with Glass Frame & Hover Zoom */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] shadow-xl group transition-all duration-500 hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 hover:shadow-[0_0_30px_rgba(198,243,107,0.1)]">
              <img
                src={PERSONAL_INFO.photoUrl}
                alt="Ansh Pratap — Creative Content Creator and Visual Storyteller"
                className="w-full h-[470px] object-cover object-center transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 dark:from-[#111318] via-transparent to-transparent opacity-85" />

              {/* Photo caption tag */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 dark:bg-[#1B1E26]/95 backdrop-blur-md border border-stone-200 dark:border-[#262A34] shadow-md">
                <div className="text-sm font-bold text-stone-900 dark:text-[#F3F1EA] font-display">
                  Ansh Pratap
                </div>
                <div className="text-xs text-stone-600 dark:text-[#9296A2] mt-0.5 flex items-center gap-1.5 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B] shrink-0" />
                  <span>Chittorgarh, Rajasthan, India</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Editorial Narrative & Creative Focus */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Bio Narrative */}
            <div className="space-y-4 text-base text-stone-700 dark:text-[#F3F1EA]/85 leading-relaxed font-normal mb-8">
              <p>
                Hi, I'm <strong className="text-stone-950 dark:text-[#F3F1EA] font-semibold">Ansh Pratap</strong>. I combine creative art direction with technical thinking to produce compelling digital content.
              </p>
              <p>
                My background spans short-form video editing, visual storytelling, digital graphic design, and practical Generative AI workflows. Rather than treating visuals as static decoration, I focus on rhythm, pacing, and visual clarity — crafting content that holds attention in fast-scrolling environments.
              </p>
              <p className="text-emerald-700 dark:text-[#C6F36B] font-medium">
                Great content isn't just about looking attractive; it communicates an idea, evokes a genuine reaction, and creates memorable visual identity.
              </p>
            </div>

            {/* Creative Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all hover:-translate-y-0.5 shadow-sm">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-[#C6F36B] font-semibold text-sm mb-1.5 font-mono">
                  <Film className="w-4 h-4" />
                  <span>Short-Form Video & Pacing</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
                  Sequencing raw footage, rhythm-aligned cuts, audio synchronization, and high-retention storytelling for Reels and YouTube Shorts.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all hover:-translate-y-0.5 shadow-sm">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-[#C6F36B] font-semibold text-sm mb-1.5 font-mono">
                  <Sparkles className="w-4 h-4" />
                  <span>Generative AI Creative Lab</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
                  Prompt engineering, stylized text-to-image concept art, and experimental AI video generation pipelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all hover:-translate-y-0.5 shadow-sm">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-[#C6F36B] font-semibold text-sm mb-1.5 font-mono">
                  <Sliders className="w-4 h-4" />
                  <span>Photo Retouching & Color</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
                  Tone curve balancing, mood color correction in Adobe Lightroom, and evocative atmosphere grading for still photography.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all hover:-translate-y-0.5 shadow-sm">
                <div className="flex items-center gap-2.5 text-emerald-600 dark:text-[#C6F36B] font-semibold text-sm mb-1.5 font-mono">
                  <Palette className="w-4 h-4" />
                  <span>Graphic Design & Brand Assets</span>
                </div>
                <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
                  Distinctive header banners, social media carousels, YouTube thumbnails, and modern visual branding.
                </p>
              </div>
            </div>

            {/* Academic Link & Resume Action */}
            <div className="p-4 sm:p-5 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/20 dark:border-[#C6F36B]/20 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B] shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900 dark:text-[#F3F1EA]">
                    {PERSONAL_INFO.education.degree}
                  </div>
                  <div className="text-xs text-stone-600 dark:text-[#9296A2] font-mono">
                    {PERSONAL_INFO.education.institution} · {PERSONAL_INFO.education.period}
                  </div>
                </div>
              </div>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={PERSONAL_INFO.resumeUrl}
                download="Ansh_Pratap_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-lg transition-all shrink-0 active:scale-95 uppercase tracking-wider cursor-pointer shadow-sm"
              >
                <Download className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
                <span>Download Resume</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

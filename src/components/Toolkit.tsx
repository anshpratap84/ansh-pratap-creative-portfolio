import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Palette, Sparkles, Code2, ChevronRight, Activity } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const Toolkit: React.FC = () => {
  const [activePillar, setActivePillar] = useState<'video' | 'design' | 'ai'>('video');
  const [showEngineering, setShowEngineering] = useState(false);

  // Creative Category 1: Video Editing & Visual Storytelling
  const videoSkills = [
    'Short-form video editing',
    'Reels and YouTube Shorts',
    'Video pacing and transitions',
    'Audio synchronization',
    'Visual storytelling',
    'Motion graphics and content presentation',
    'Timeline sequencing',
    'Pacing & cut rhythm',
  ];

  // Creative Category 2: Graphic Design & Visual Communication
  const designSkills = [
    'Digital graphic design',
    'Social media creatives',
    'YouTube thumbnails',
    'Banners and promotional creatives',
    'Photo retouching and color correction',
    'Visual identity and brand assets',
    'Typography & layout hierarchy',
    'Lightroom color grading',
  ];

  // Creative Category 3: Generative AI & Creative Technology
  const aiSkills = [
    'Generative AI workflows',
    'Prompt engineering',
    'AI image generation and editing',
    'Text-to-image experimentation',
    'AI-assisted creative workflows',
    'AI-powered content ideation',
    'Multimodal creative pipelines',
    'Google Gemini & AI tools',
  ];

  // Supporting Engineering Foundations
  const technicalSkills = [
    'Python',
    'OpenCV & Computer Vision',
    'Machine Learning & Deep Learning',
    'Scikit-learn, TensorFlow & Keras',
    'NLP & Facial Recognition',
    'C, C++, Java',
    'HTML5, CSS3, JavaScript, React',
    'Git & GitHub',
  ];

  const handlePillarChange = (pillar: 'video' | 'design' | 'ai') => {
    soundManager.playClick();
    setActivePillar(pillar);
  };

  return (
    <section id="toolkit" className="py-24 relative border-t border-stone-200 dark:border-[#262A34] bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B]" />
              <span>05 / TECHNICAL & CREATIVE SKILLS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950 dark:text-[#F3F1EA] font-display">
              Three Creative Pillars in Motion.
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-[#9296A2] max-w-md font-normal leading-relaxed">
            Specialized visual execution across short-form video editing, digital graphic design, and practical Generative AI workflows.
          </p>
        </motion.div>

        {/* 3 Pillar Interactive Selector with Spring Animations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Pillar 1: Video Editing */}
          <button
            onClick={() => handlePillarChange('video')}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden shadow-sm ${
              activePillar === 'video'
                ? 'bg-white dark:bg-[#1B1E26] border-emerald-500 dark:border-[#C6F36B] shadow-md'
                : 'bg-white/80 dark:bg-[#1B1E26]/60 border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activePillar === 'video'
                  ? 'bg-emerald-500 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318]'
                  : 'bg-stone-100 dark:bg-[#111318] text-emerald-600 dark:text-[#C6F36B]'
              }`}>
                <Film className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-500 dark:text-[#9296A2]">PILLAR 01</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-1">
              Video Editing & Visual Storytelling
            </h3>
            <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
              Adobe Premiere Pro, CapCut, 9:16 mobile retention, rhythm cuts & audio sync.
            </p>
            {activePillar === 'video' && (
              <motion.div
                layoutId="pillar-underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 dark:bg-[#C6F36B]"
              />
            )}
          </button>

          {/* Pillar 2: Graphic Design */}
          <button
            onClick={() => handlePillarChange('design')}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden shadow-sm ${
              activePillar === 'design'
                ? 'bg-white dark:bg-[#1B1E26] border-emerald-500 dark:border-[#C6F36B] shadow-md'
                : 'bg-white/80 dark:bg-[#1B1E26]/60 border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activePillar === 'design'
                  ? 'bg-emerald-500 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318]'
                  : 'bg-stone-100 dark:bg-[#111318] text-emerald-600 dark:text-[#C6F36B]'
              }`}>
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-500 dark:text-[#9296A2]">PILLAR 02</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-1">
              Graphic Design & Visual Communication
            </h3>
            <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
              Canva, Figma, Adobe Express, YouTube thumbnails, banner design & Lightroom.
            </p>
            {activePillar === 'design' && (
              <motion.div
                layoutId="pillar-underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 dark:bg-[#C6F36B]"
              />
            )}
          </button>

          {/* Pillar 3: Generative AI */}
          <button
            onClick={() => handlePillarChange('ai')}
            className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden shadow-sm ${
              activePillar === 'ai'
                ? 'bg-white dark:bg-[#1B1E26] border-emerald-500 dark:border-[#C6F36B] shadow-md'
                : 'bg-white/80 dark:bg-[#1B1E26]/60 border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                activePillar === 'ai'
                  ? 'bg-emerald-500 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318]'
                  : 'bg-stone-100 dark:bg-[#111318] text-emerald-600 dark:text-[#C6F36B]'
              }`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono text-stone-500 dark:text-[#9296A2]">PILLAR 03</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-1">
              Generative AI & Creative Technology
            </h3>
            <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed">
              Google Gemini, prompt engineering, text-to-image generation & multimodal art.
            </p>
            {activePillar === 'ai' && (
              <motion.div
                layoutId="pillar-underline"
                className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-500 dark:bg-[#C6F36B]"
              />
            )}
          </button>
        </div>

        {/* Dynamic Interactive Visual Panel for Active Pillar with Motion */}
        <div className="rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] p-6 sm:p-10 mb-10 shadow-xl overflow-hidden">
          <AnimatePresence mode="wait">
            {activePillar === 'video' && (
              <motion.div
                key="video"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold">
                    <Film className="w-4 h-4" />
                    <span>DISCIPLINE 01 · VIDEO EDITING & VISUAL STORYTELLING</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-4">
                    High-Retention Short-Form & Motion Architecture
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/85 leading-relaxed mb-6 font-normal">
                    Video today is experienced in fast-scrolling feeds. I build cuts that capture viewer attention within the first 3 seconds, synchronize rhythm to soundtrack transients, and maintain storytelling tension from intro to CTA.
                  </p>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {videoSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-[#111318] text-stone-800 dark:text-[#F3F1EA] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 hover:bg-stone-200/60 dark:hover:bg-[#111318]/90 transition-all cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-stone-600 dark:text-[#9296A2] flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-[#C6F36B] font-semibold">PRIMARY SUITES:</span>
                    <span>Adobe Premiere Pro · CapCut · Adobe Lightroom</span>
                  </div>
                </div>

                {/* Interactive Visual Timeline Simulation with Live Scanning Playhead */}
                <div className="lg:col-span-5 bg-stone-50 dark:bg-[#111318] p-5 rounded-xl border border-stone-200 dark:border-[#262A34] relative overflow-hidden">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-[#9296A2] pb-3 mb-3 border-b border-stone-200 dark:border-[#262A34]">
                    <div className="flex items-center gap-2">
                      <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-[#C6F36B] animate-pulse" />
                      <span className="text-stone-950 dark:text-[#F3F1EA] font-bold">TIMELINE SEQUENCER</span>
                    </div>
                    <span className="text-emerald-600 dark:text-[#C6F36B] font-semibold">PLAYING · 60 FPS</span>
                  </div>

                  {/* Simulated multi-track timeline with scanning playhead */}
                  <div className="relative space-y-2 mb-4 font-mono text-[11px] overflow-hidden rounded-lg p-1 bg-stone-100/50 dark:bg-black/30">
                    {/* Live Moving Playhead */}
                    <motion.div
                      animate={{ left: ['0%', '98%'] }}
                      transition={{ duration: 4.8, repeat: Infinity, ease: 'linear' }}
                      className="absolute top-0 bottom-0 w-[2px] bg-emerald-500 dark:bg-[#C6F36B] shadow-[0_0_8px_#C6F36B] z-20 pointer-events-none"
                    >
                      <div className="w-2.5 h-2 -translate-x-[4px] bg-emerald-500 dark:bg-[#C6F36B] rounded-sm shadow" />
                    </motion.div>

                    <div className="flex items-center gap-2">
                      <span className="w-8 text-stone-500 dark:text-[#9296A2]">V1</span>
                      <div className="flex-1 h-7 rounded bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] flex items-center px-2 text-stone-900 dark:text-[#F3F1EA] overflow-hidden">
                        <span className="truncate">Hook / Narrative B-Roll (0–3s)</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 text-stone-500 dark:text-[#9296A2]">V2</span>
                      <div className="flex-1 h-7 rounded bg-emerald-100 dark:bg-[#C6F36B]/20 border border-emerald-300 dark:border-[#C6F36B]/40 flex items-center px-2 text-emerald-800 dark:text-[#C6F36B] overflow-hidden">
                        <span className="truncate">Kinetic Text Overlay & Keyframes</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 text-stone-500 dark:text-[#9296A2]">A1</span>
                      <div className="flex-1 h-7 rounded bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] flex items-center px-2 text-stone-600 dark:text-[#9296A2] overflow-hidden">
                        <span className="truncate">SFX Beats · Audio Sync Transients</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-600 dark:text-[#9296A2]">Target Duration:</span>
                    <span className="text-emerald-700 dark:text-[#C6F36B] font-bold">50–60 SECONDS (IDEAL)</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activePillar === 'design' && (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold">
                    <Palette className="w-4 h-4" />
                    <span>DISCIPLINE 02 · GRAPHIC DESIGN & VISUAL COMMUNICATION</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-4">
                    Visual Branding, Typography & Editorial Composition
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/85 leading-relaxed mb-6 font-normal">
                    Design gives digital content distinction. From high-converting YouTube thumbnails that stand out on mobile screens to cohesive social media creatives, promotional banners, and Lightroom color grading that establishes an unforgettable mood.
                  </p>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {designSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-[#111318] text-stone-800 dark:text-[#F3F1EA] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-colors cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-stone-600 dark:text-[#9296A2] flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-[#C6F36B] font-semibold">PRIMARY SUITES:</span>
                    <span>Canva · Figma · Adobe Express · Adobe Lightroom</span>
                  </div>
                </div>

                {/* Interactive Visual Canvas Showcase */}
                <div className="lg:col-span-5 bg-stone-50 dark:bg-[#111318] p-5 rounded-xl border border-stone-200 dark:border-[#262A34]">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-[#9296A2] pb-3 mb-3 border-b border-stone-200 dark:border-[#262A34]">
                    <span className="text-stone-950 dark:text-[#F3F1EA] font-bold">CANVAS ARCHITECTURE</span>
                    <span className="text-emerald-600 dark:text-[#C6F36B] font-semibold">THUMBNAIL & BRAND</span>
                  </div>

                  {/* Simulated Graphic Frame */}
                  <div className="aspect-video rounded-lg bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] p-4 flex flex-col justify-between mb-4 relative overflow-hidden shadow-sm">
                    <div className="flex justify-between items-start">
                      <div className="text-[10px] font-mono text-emerald-800 dark:text-[#C6F36B] bg-emerald-100 dark:bg-[#C6F36B]/10 px-2 py-0.5 rounded border border-emerald-300 dark:border-[#C6F36B]/30 font-bold">
                        16:9 HIGH-CTR RATIO
                      </div>
                      <div className="text-[10px] font-mono text-stone-500 dark:text-[#9296A2]">
                        1920 × 1080 PX
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-black text-stone-950 dark:text-[#F3F1EA] font-display uppercase tracking-tight">
                        FOCAL TITLE TYPOGRAPHY
                      </div>
                      <div className="text-[11px] text-stone-600 dark:text-[#9296A2]">
                        High Contrast · Clean Kerning · Visual Hierarchy
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] text-center">
                      <span className="text-stone-500 dark:text-[#9296A2] block text-[10px]">COLOR SPACE</span>
                      <span className="text-stone-900 dark:text-[#F3F1EA] font-bold">sRGB / HDR</span>
                    </div>
                    <div className="p-2.5 rounded bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] text-center">
                      <span className="text-stone-500 dark:text-[#9296A2] block text-[10px]">GRID DISCIPLINE</span>
                      <span className="text-emerald-700 dark:text-[#C6F36B] font-bold">RULE OF THIRDS</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activePillar === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>DISCIPLINE 03 · GENERATIVE AI & CREATIVE TECHNOLOGY</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-4">
                    AI Image Synthesis, Prompt Engineering & Multimodal Ideation
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/85 leading-relaxed mb-6 font-normal">
                    Harnessing modern GenAI tools not as a gimmick, but as an amplifier for creative exploration. Turning concepts into prompt formulas, generating bespoke imagery, and building rapid visual moodboards for creative campaigns.
                  </p>

                  {/* Skill Chips */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {aiSkills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-[#111318] text-stone-800 dark:text-[#F3F1EA] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-colors cursor-default"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="text-xs font-mono text-stone-600 dark:text-[#9296A2] flex items-center gap-2">
                    <span className="text-emerald-700 dark:text-[#C6F36B] font-semibold">PRIMARY SUITES:</span>
                    <span>Google Gemini · Generative AI Pipelines · Multimodal Vision</span>
                  </div>
                </div>

                {/* Interactive Prompt & Model Visualization */}
                <div className="lg:col-span-5 bg-stone-50 dark:bg-[#111318] p-5 rounded-xl border border-stone-200 dark:border-[#262A34]">
                  <div className="flex items-center justify-between text-xs font-mono text-stone-600 dark:text-[#9296A2] pb-3 mb-3 border-b border-stone-200 dark:border-[#262A34]">
                    <span className="text-stone-950 dark:text-[#F3F1EA] font-bold">PROMPT TUNING ENGINE</span>
                    <span className="text-emerald-600 dark:text-[#C6F36B] font-semibold">MULTIMODAL</span>
                  </div>

                  <div className="p-3.5 rounded-lg bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] font-mono text-xs mb-4 shadow-sm">
                    <div className="text-[10px] text-stone-500 dark:text-[#9296A2] mb-1">PROMPT FORMULA // STYLE INJECTION:</div>
                    <div className="text-emerald-700 dark:text-[#C6F36B] font-semibold leading-relaxed">
                      "Cinematic lighting, volumetric atmosphere, 35mm film grain, editorial color palette, high fidelity composition"
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center p-2 rounded bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34]">
                      <span className="text-stone-600 dark:text-[#9296A2]">Google AI Essentials</span>
                      <span className="text-emerald-700 dark:text-[#C6F36B] font-semibold">VERIFIED SPECIALIZATION</span>
                    </div>
                    <div className="flex justify-between items-center p-2 rounded bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34]">
                      <span className="text-stone-600 dark:text-[#9296A2]">Google Prompting Essentials</span>
                      <span className="text-emerald-700 dark:text-[#C6F36B] font-semibold">FOUR-COURSE CERTIFIED</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Supporting Technical & Engineering Drawer */}
        <div className="rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26]/60 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-stone-600 dark:text-[#9296A2] uppercase tracking-wider mb-1">
                <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B]" />
                <span>SUPPORTING TECHNICAL FOUNDATION</span>
              </div>
              <h4 className="text-base font-bold text-stone-950 dark:text-[#F3F1EA] font-display">
                Computer Science & Machine Learning Engineering
              </h4>
              <p className="text-xs text-stone-600 dark:text-[#9296A2] mt-0.5">
                Mewar University B.Tech CS & Central Tool Room (CTTC) Industrial Training in AI/ML & Python.
              </p>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                setShowEngineering(!showEngineering);
              }}
              className="px-4 py-2 text-xs font-mono font-semibold text-stone-800 dark:text-[#F3F1EA] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0"
            >
              <span>{showEngineering ? 'Hide Technical Skills' : 'View Technical Skills'}</span>
              <ChevronRight className={`w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B] transition-transform ${showEngineering ? 'rotate-90' : ''}`} />
            </button>
          </div>

          <AnimatePresence>
            {showEngineering && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 pt-6 border-t border-stone-200 dark:border-[#262A34] overflow-hidden"
              >
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-mono bg-stone-100 dark:bg-[#111318] text-stone-800 dark:text-[#F3F1EA] border border-stone-200 dark:border-[#262A34]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

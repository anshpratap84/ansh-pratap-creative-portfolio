import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  ExternalLink,
  CheckCircle2,
  ArrowUpRight,
  Film,
  Sparkles,
  Layout,
  Globe,
  Github,
  Music,
  BookOpen,
  Radio,
  Sliders,
  Volume2,
  Instagram,
  TrendingUp,
  BarChart3,
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { VideoModal } from './VideoModal';
import { ZindagiCaseStudyModal } from './ZindagiCaseStudyModal';
import { KuchhBhiCaseStudyModal } from './KuchhBhiCaseStudyModal';
import { soundManager } from '../utils/soundEffects';

interface ProjectsProps {
  onOpenInquiry: (serviceName?: string) => void;
  onPlayVideo?: (videoUrl?: string) => void;
}

type FilterCategory = 'all' | 'social' | 'music' | 'video' | 'portfolio' | 'ai';

export const Projects: React.FC<ProjectsProps> = ({ onOpenInquiry, onPlayVideo }) => {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const [kuchhBhiModalOpen, setKuchhBhiModalOpen] = useState(false);

  // Video scrubber simulation state for primary showcase
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubPosition, setScrubPosition] = useState(35); // percentage 0-100
  const videoThumbRef = useRef<HTMLDivElement>(null);

  // 3D tilt tracking for cards
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [tiltStyle, setTiltStyle] = useState<{ [key: string]: { rx: number; ry: number; gx: number; gy: number } }>({});

  const kuchhBhiProject = PROJECTS.find((p) => p.id === 'kuchh-bhi-post-kardo') || {
    id: 'kuchh-bhi-post-kardo',
    title: 'Kuchh Bhi Post Kardo — Instagram Content Creation & Social Media Management',
    shortTitle: 'Kuchh Bhi Post Kardo',
    subtitle: 'Cricket Trends, IPL Updates & Meme Community · @kuchhbhhipostkardo',
    category: 'Social Media & Content Creation',
    categoryGroup: 'social-media' as const,
    tags: ['Instagram Marketing', 'Content Creation', 'Reels Editing', 'Canva', 'CapCut'],
    description:
      'An Instagram entertainment page focused on cricket trends, IPL updates, viral moments, memes, and engaging short-form content.',
    verifiedDetails: [
      'Top Reels crossed 143K, 128K, and 99.5K views by pairing trending topics with strong hooks and captions',
      'Reached 448K+ views in 30 days per Instagram Professional Dashboard',
      'Curated catalog of 70+ published posts (Reels, memes, trending cricket/IPL topics)',
      'Leveraged Instagram Insights analytics to optimize posting formats and topics',
    ],
    stats: [
      { label: 'Top Reel Views', value: '143K', sub: 'Breakout viral video' },
      { label: 'Secondary Peak', value: '128K', sub: 'High-retention reel' },
      { label: '30-Day Period Reach', value: '448K+', sub: 'Instagram dashboard views' },
      { label: 'Curated Posts', value: '70+', sub: 'Cricket content published' },
    ],
    image: '/assets/aistudio/Screenshot_2026-11-02_at_4.53.19_PM_576db55c.png',
    instagramUrl: 'https://www.instagram.com/kuchhbhhipostkardo/',
    liveUrl: 'https://www.instagram.com/kuchhbhhipostkardo/',
    ctaText: 'Visit Instagram',
    isPrimary: true,
  };

  const zindagiProject = PROJECTS.find((p) => p.id === 'zindagi-ki-dhun') || {
    id: 'zindagi-ki-dhun',
    title: 'Zindagi Ki Dhun',
    hindiTitle: 'ज़िंदगी की धुन',
    tagline: 'Har Zindagi Ki Apni Dhun.',
    subtitle: 'Indian Lifestyle Music Discovery & Streaming Experience',
    category: 'Music Discovery & Streaming Platform',
    categoryGroup: 'music-platform' as const,
    tags: [
      'React 18',
      'TypeScript',
      'Web Audio API',
      'Tailwind CSS',
      'Audio Waveform',
      '11 Lifestyle Soundscapes',
    ],
    description:
      'A cinematic Indian lifestyle-inspired music discovery and streaming platform celebrating everyday Indian life through music. From highway trucks and neighbourhood salons to tea stalls and wedding processions, it transforms familiar Indian environments into 11 immersive musical worlds.',
    verifiedDetails: [
      '11 Curated Lifestyle Worlds (Deluxe Salon, Truck Wala, Bus Wala, Raju Mistri, Chai, Baraat, etc.)',
      'Centralized Audio Engine with persistent playback across page transitions and queue management',
      'Real-Time Web Audio API Waveform Visualizer synchronized to live audio transients',
      'Mood-based discovery and custom playlist builder (Apni Dhun Banao) with local storage persistence',
    ],
    image: '/assets/aistudio/Screenshot_2026-11-04_at_12.53.48_PM_b5a859a7.png',
    liveUrl: 'https://zindagi-ki-dhun.vercel.app',
    githubUrl: 'https://github.com/AnshPratap2314',
    ctaText: 'Explore Zindagi Ki Dhun',
    isPrimary: true,
  };

  const cyberbullyingProject = PROJECTS.find((p) => p.id === 'stop-cyberbullying')!;
  const portfolioProject = PROJECTS.find((p) => p.id === 'personal-portfolio') || {
    id: 'personal-portfolio',
    title: 'Ansh Pratap — AI/ML & Interactive Web Portfolio',
    subtitle: 'Building Intelligent Software · ansh-portfolio-rho-seven.vercel.app',
    category: 'Interactive Web & Portfolio',
    categoryGroup: 'portfolio' as const,
    tags: ['Web Design', 'Interactive Presentation', 'AI/ML Engineering', 'FastAPI & LLM'],
    description:
      'Engineered and launched an interactive digital portfolio — "Building Intelligent Software: Turning AI into real applications" — showcasing practical AI/ML projects, backend development, and an animated system-bus HUD architecture.',
    verifiedDetails: [
      'Interactive system bus HUD visualization featuring FastAPI, Gemini API, OpenCV, and MongoDB RAG',
      'Live production deployment accessible worldwide on Vercel (ansh-portfolio-rho-seven.vercel.app)',
      'Integrated project showcases with 238 passing regression test indicators and modern dark aesthetics',
      'Responsive full-stack presentation built with React, modern styling, and clean technical typography',
    ],
    image: '/assets/aistudio/Screenshot_2026-11-04_at_12.55.10_PM_6a98a29b.png',
    liveUrl: 'https://ansh-portfolio-rho-seven.vercel.app',
    githubUrl: 'https://github.com/AnshPratap2314/Ansh-portfolio',
    ctaText: 'Visit Live Portfolio',
  };
  const createSphereProject = PROJECTS.find((p) => p.id === 'createsphere-ai')!;

  const handleOpenVideo = (videoUrl?: string) => {
    soundManager.playWhoosh();
    if (onPlayVideo) {
      onPlayVideo(videoUrl);
    } else if (videoUrl) {
      setActiveVideoModal(videoUrl);
    }
  };

  const handleScrubMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoThumbRef.current) return;
    const rect = videoThumbRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const percent = (x / rect.width) * 100;
    setScrubPosition(percent);
  };

  const handleCardMouseMove = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    // Moderate tilt angles (+/- 4 degrees)
    const rx = (py - 0.5) * -7;
    const ry = (px - 0.5) * 7;
    setTiltStyle((prev) => ({
      ...prev,
      [id]: { rx, ry, gx: px * 100, gy: py * 100 },
    }));
  };

  const handleCardMouseLeave = (id: string) => {
    setHoveredCardId(null);
    setTiltStyle((prev) => ({
      ...prev,
      [id]: { rx: 0, ry: 0, gx: 50, gy: 50 },
    }));
  };

  // Category Filter Tabs
  const filterTabs = [
    { id: 'all', label: 'All Works', icon: Layout },
    { id: 'social', label: 'Social Media', icon: Instagram },
    { id: 'music', label: 'Music Platform', icon: Music },
    { id: 'video', label: 'Video Storytelling', icon: Film },
    { id: 'portfolio', label: 'Web Portfolio', icon: Globe },
    { id: 'ai', label: 'AI Art', icon: Sparkles },
  ];

  // Calculate simulated timecode based on scrub position
  const totalSeconds = 57;
  const currentScrubSeconds = Math.round((scrubPosition / 100) * totalSeconds);
  const formattedScrubTime = `00:${currentScrubSeconds < 10 ? '0' : ''}${currentScrubSeconds}`;

  return (
    <section id="projects" className="py-24 relative border-t border-stone-200 dark:border-[#262A34] bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300">
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
              <span>03 / SELECTED WORK</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950 dark:text-[#FFFFFF] font-display">
              Featured Creations & Showcases.
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-[#9296A2] max-w-md font-normal leading-relaxed">
            Curated portfolio work across cinematic music platforms, short-form video editing, interactive web systems, and Generative AI applications.
          </p>
        </motion.div>

        {/* Interactive Category Filter Control Tabs with Motion Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-12 p-1.5 rounded-2xl bg-stone-100/80 dark:bg-[#1B1E26]/80 border border-stone-200 dark:border-[#262A34] w-fit shadow-inner">
          {filterTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveFilter(tab.id as FilterCategory);
                }}
                className={`relative px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 cursor-pointer z-10 whitespace-nowrap ${
                  isActive
                    ? 'text-stone-950 dark:text-[#111318]'
                    : 'text-stone-600 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-[#F3F1EA]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-filter-indicator"
                    className="absolute inset-0 rounded-xl bg-emerald-400 dark:bg-[#C6F36B] shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-12"
          >
            {/* ==================== 0. ZINDAGI KI DHUN (FEATURED CULTURAL MUSIC PLATFORM) ==================== */}
            {(activeFilter === 'all' || activeFilter === 'music') && (
              <div
                onMouseMove={(e) => handleCardMouseMove('zindagi', e)}
                onMouseEnter={() => setHoveredCardId('zindagi')}
                onMouseLeave={() => handleCardMouseLeave('zindagi')}
                style={{
                  transform:
                    hoveredCardId === 'zindagi'
                      ? `perspective(1000px) rotateX(${tiltStyle.zindagi?.rx || 0}deg) rotateY(${tiltStyle.zindagi?.ry || 0}deg)`
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: hoveredCardId === 'zindagi' ? 'none' : 'transform 0.5s ease-out',
                }}
                className="relative rounded-3xl border border-amber-500/30 dark:border-[#D99A35]/35 bg-gradient-to-br from-white via-amber-50/30 to-stone-50 dark:from-[#171512] dark:via-[#131210] dark:to-[#0D0C0B] overflow-hidden shadow-2xl hover:border-amber-500/70 dark:hover:border-[#D99A35]/70 transition-all duration-300 group will-change-transform"
              >
                {/* Specular Warm Saffron Glare */}
                {hoveredCardId === 'zindagi' && (
                  <div
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 500px at ${tiltStyle.zindagi?.gx || 50}% ${tiltStyle.zindagi?.gy || 50}%, rgba(217,154,53,0.12), transparent 75%)`,
                    }}
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-10 relative z-10">
                  {/* Large Cinematic Visual Preview */}
                  <div className="lg:col-span-7 relative">
                    <div
                      role="button"
                      tabIndex={0}
                      data-cursor="view"
                      aria-label="View Zindagi Ki Dhun case study"
                      onClick={() => {
                        soundManager.playClick();
                        setCaseStudyOpen(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setCaseStudyOpen(true);
                        }
                      }}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border border-amber-500/30 dark:border-[#D99A35]/30 shadow-2xl cursor-pointer group/zpreview focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-[#D99A35]"
                    >
                      <img
                        src={zindagiProject.image}
                        alt="Zindagi Ki Dhun — Cinematic Indian Lifestyle Music Discovery Platform"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/zpreview:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                      {/* Top Live Status Indicator with Audio Equalizer Animation */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2 bg-stone-950/90 text-amber-300 font-mono text-[10px] font-bold px-3 py-1.5 rounded-xl border border-amber-500/40 backdrop-blur-md shadow-lg z-20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="tracking-wider">LIVE PLATFORM</span>
                        <span className="text-amber-500/50">·</span>
                        {/* Mini live audio waveform simulation */}
                        <div className="flex items-end gap-0.5 h-3">
                          <motion.span
                            animate={{ height: ['4px', '12px', '4px'] }}
                            transition={{ repeat: Infinity, duration: 0.8, ease: 'easeInOut' }}
                            className="w-0.5 bg-amber-400 rounded-full"
                          />
                          <motion.span
                            animate={{ height: ['8px', '14px', '6px', '8px'] }}
                            transition={{ repeat: Infinity, duration: 0.6, ease: 'easeInOut', delay: 0.1 }}
                            className="w-0.5 bg-amber-400 rounded-full"
                          />
                          <motion.span
                            animate={{ height: ['12px', '4px', '10px'] }}
                            transition={{ repeat: Infinity, duration: 0.7, ease: 'easeInOut', delay: 0.2 }}
                            className="w-0.5 bg-amber-400 rounded-full"
                          />
                          <motion.span
                            animate={{ height: ['6px', '13px', '5px'] }}
                            transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut', delay: 0.15 }}
                            className="w-0.5 bg-amber-400 rounded-full"
                          />
                        </div>
                        <span className="text-amber-200/90 font-semibold hidden sm:inline">11 WORLDS</span>
                      </div>

                      {/* Bottom Visual Bar */}
                      <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90 z-20 pointer-events-none">
                        <span className="bg-stone-950/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/10 flex items-center gap-1.5 text-amber-200">
                          <Music className="w-3.5 h-3.5 text-amber-400" />
                          <span>ज़िंदगी की धुन — Har Zindagi Ki Apni Dhun</span>
                        </span>
                        <span className="bg-amber-500 text-stone-950 font-bold px-2.5 py-1 rounded-lg shadow uppercase text-[10px] tracking-wider hidden sm:block">
                          Click to View Case Study
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Editorial Content Column */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="text-xs font-mono uppercase tracking-widest text-amber-600 dark:text-[#D99A35] mb-1 font-bold flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5" />
                      <span>FLAGSHIP PROJECT · MUSIC STREAMING</span>
                    </div>

                    {/* Hindi Name & English Title */}
                    <div className="mb-2">
                      <span className="font-serif text-lg sm:text-xl font-bold text-amber-600 dark:text-[#E69D28] tracking-wide block">
                        {zindagiProject.hindiTitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 dark:text-[#F2E7D2] font-display tracking-tight leading-tight">
                        {zindagiProject.title}
                      </h3>
                    </div>

                    {/* Tagline */}
                    <div className="text-sm font-serif italic text-amber-700 dark:text-[#D99A35] font-semibold mb-4 flex items-center gap-2">
                      <span>“{zindagiProject.tagline}”</span>
                    </div>

                    {/* Project Description */}
                    <p className="text-sm text-stone-600 dark:text-[#F2E7D2]/85 leading-relaxed mb-5 font-normal">
                      {zindagiProject.description}
                    </p>

                    {/* Verified Architectural Highlights */}
                    <div className="space-y-2 mb-6 text-xs text-stone-600 dark:text-[#9296A2]">
                      {zindagiProject.verifiedDetails.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-[#D99A35] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {['React 18', 'TypeScript', 'Web Audio API', 'Tailwind CSS', 'Audio Waveform', '11 Worlds'].map(
                        (tag, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-[#F2E7D2] border border-amber-500/20"
                          >
                            {tag}
                          </span>
                        )
                      )}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          soundManager.playClick();
                          setCaseStudyOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-stone-950 bg-amber-400 hover:bg-amber-300 dark:bg-[#D99A35] dark:hover:bg-[#e8a841] dark:text-[#111318] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>View Case Study</span>
                      </motion.button>

                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={zindagiProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-stone-800 dark:text-[#F2E7D2] hover:text-amber-600 dark:hover:text-[#D99A35] bg-stone-100 dark:bg-[#1A1815] hover:bg-stone-200 dark:hover:bg-[#262420] border border-stone-300 dark:border-amber-500/30 rounded-xl transition-all"
                      >
                        <span>Live Preview</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 1. KUCHH BHI POST KARDO (INSTAGRAM CONTENT & SMM) ==================== */}
            {(activeFilter === 'all' || activeFilter === 'social') && (
              <div
                onMouseMove={(e) => handleCardMouseMove('kuchhbhi', e)}
                onMouseEnter={() => setHoveredCardId('kuchhbhi')}
                onMouseLeave={() => handleCardMouseLeave('kuchhbhi')}
                style={{
                  transform:
                    hoveredCardId === 'kuchhbhi'
                      ? `perspective(1000px) rotateX(${tiltStyle.kuchhbhi?.rx || 0}deg) rotateY(${tiltStyle.kuchhbhi?.ry || 0}deg)`
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: hoveredCardId === 'kuchhbhi' ? 'none' : 'transform 0.5s ease-out',
                }}
                className="relative rounded-3xl border border-pink-500/30 dark:border-pink-500/35 bg-gradient-to-br from-white via-pink-50/20 to-stone-50 dark:from-[#171216] dark:via-[#131014] dark:to-[#0D0B0D] overflow-hidden shadow-2xl hover:border-pink-500/70 dark:hover:border-pink-500/70 transition-all duration-300 group will-change-transform"
              >
                {/* Specular Pink/Purple Instagram Glow */}
                {hoveredCardId === 'kuchhbhi' && (
                  <div
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 500px at ${tiltStyle.kuchhbhi?.gx || 50}% ${tiltStyle.kuchhbhi?.gy || 50}%, rgba(221,42,123,0.12), transparent 75%)`,
                    }}
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-10 relative z-10">
                  {/* Left Column: Interactive Instagram Profile & Reels Visual Showcase */}
                  <div className="lg:col-span-7 relative">
                    <div
                      role="button"
                      tabIndex={0}
                      data-cursor="view"
                      aria-label="View Kuchh Bhi Post Kardo project case study"
                      onClick={() => {
                        soundManager.playClick();
                        setKuchhBhiModalOpen(true);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setKuchhBhiModalOpen(true);
                        }
                      }}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-stone-950 border border-pink-500/30 dark:border-pink-500/40 shadow-2xl cursor-pointer group/kpreview focus:outline-none focus:ring-2 focus:ring-pink-500 p-5 flex flex-col justify-between"
                    >
                      {/* Ambient background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-950/40 via-stone-950 to-pink-950/40 pointer-events-none" />
                      <div className="absolute -top-12 -right-12 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

                      {/* Header bar of Instagram Card */}
                      <div className="relative z-10 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                            <div className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center text-white font-black text-xs font-display">
                              KB
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-white font-mono">
                                kuchhbhhipostkardo
                              </span>
                              <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white">✓</span>
                            </div>
                            <div className="text-[11px] text-stone-400 font-mono">
                              Cricket Trends &amp; Entertainment · 70 posts
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>INSTAGRAM MARKETING</span>
                        </div>
                      </div>

                      {/* Center Stats & Highlights Showcase */}
                      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2 my-auto">
                        <div className="p-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                          <div className="text-xl sm:text-2xl font-black text-orange-400 font-display">143K</div>
                          <div className="text-[10px] text-stone-300 font-semibold uppercase">Top Reel</div>
                          <div className="text-[9px] text-stone-500">Breakout reach</div>
                        </div>
                        <div className="p-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                          <div className="text-xl sm:text-2xl font-black text-pink-400 font-display">128K</div>
                          <div className="text-[10px] text-stone-300 font-semibold uppercase">Peak Reel</div>
                          <div className="text-[9px] text-stone-500">Viral engagement</div>
                        </div>
                        <div className="p-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                          <div className="text-xl sm:text-2xl font-black text-emerald-400 font-display">448K+</div>
                          <div className="text-[10px] text-stone-300 font-semibold uppercase">30-Day Reach</div>
                          <div className="text-[9px] text-stone-500">Dashboard views</div>
                        </div>
                        <div className="p-3 rounded-xl bg-black/50 border border-white/10 backdrop-blur-md">
                          <div className="text-xl sm:text-2xl font-black text-purple-400 font-display">70+</div>
                          <div className="text-[10px] text-stone-300 font-semibold uppercase">Posts</div>
                          <div className="text-[9px] text-stone-500">Curated archive</div>
                        </div>
                      </div>

                      {/* Bottom action trigger bar */}
                      <div className="relative z-10 flex items-center justify-between text-xs text-stone-300 pt-2 border-t border-white/10">
                        <div className="flex items-center gap-2 font-mono text-[11px] text-pink-300">
                          <Film className="w-3.5 h-3.5 text-pink-400" />
                          <span>Short-Form Video Storytelling &amp; Memes</span>
                        </div>
                        <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30 font-mono text-[10px] font-bold uppercase">
                          Inspect Case Study ↗
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Editorial Details */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="text-xs font-mono uppercase tracking-widest text-pink-600 dark:text-pink-400 mb-1 font-bold flex items-center gap-1.5">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>CATEGORY: SOCIAL MEDIA &amp; CONTENT CREATION</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-stone-950 dark:text-[#FFFFFF] font-display tracking-tight leading-tight mb-2">
                      Kuchh Bhi Post Kardo
                    </h3>

                    <div className="text-xs font-mono text-pink-600 dark:text-pink-400 mb-4 font-semibold">
                      {kuchhBhiProject.subtitle}
                    </div>

                    <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/85 leading-relaxed mb-5 font-normal">
                      {kuchhBhiProject.description}
                    </p>

                    {/* Verified Details */}
                    <div className="space-y-2 mb-6 text-xs text-stone-600 dark:text-[#9296A2]">
                      {kuchhBhiProject.verifiedDetails.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-7">
                      {kuchhBhiProject.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-pink-500/10 text-pink-700 dark:text-pink-300 border border-pink-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          soundManager.playClick();
                          setKuchhBhiModalOpen(true);
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-white bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
                      >
                        <BookOpen className="w-4 h-4" />
                        <span>View Project</span>
                      </motion.button>

                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={kuchhBhiProject.instagramUrl || 'https://www.instagram.com/kuchhbhhipostkardo/'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-stone-800 dark:text-[#FFFFFF] hover:text-pink-600 dark:hover:text-pink-400 bg-stone-100 dark:bg-[#1A1815] hover:bg-stone-200 dark:hover:bg-[#262420] border border-stone-300 dark:border-pink-500/30 rounded-xl transition-all"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>Visit Instagram</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 2. VIDEO SHOWCASE ==================== */}
            {(activeFilter === 'all' || activeFilter === 'video') && (
              <div
                onMouseMove={(e) => handleCardMouseMove('cyberbullying', e)}
                onMouseEnter={() => setHoveredCardId('cyberbullying')}
                onMouseLeave={() => handleCardMouseLeave('cyberbullying')}
                style={{
                  transform:
                    hoveredCardId === 'cyberbullying'
                      ? `perspective(1000px) rotateX(${tiltStyle.cyberbullying?.rx || 0}deg) rotateY(${tiltStyle.cyberbullying?.ry || 0}deg)`
                      : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: hoveredCardId === 'cyberbullying' ? 'none' : 'transform 0.5s ease-out',
                }}
                className="relative rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] overflow-hidden shadow-xl hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-all duration-300 group will-change-transform"
              >
                {/* Specular glare overlay */}
                {hoveredCardId === 'cyberbullying' && (
                  <div
                    className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle 400px at ${tiltStyle.cyberbullying?.gx || 50}% ${tiltStyle.cyberbullying?.gy || 50}%, rgba(198,243,107,0.06), transparent 80%)`,
                    }}
                  />
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-8 md:p-10 relative z-10">
                  {/* Project Image & Interactive Video Scrubber Trigger */}
                  <div className="lg:col-span-7 relative">
                    <div
                      ref={videoThumbRef}
                      role="button"
                      tabIndex={0}
                      data-cursor="play"
                      aria-label="Play Stop Cyberbullying video showreel"
                      onClick={() => handleOpenVideo(cyberbullyingProject.videoUrl)}
                      onMouseEnter={() => setIsScrubbing(true)}
                      onMouseLeave={() => setIsScrubbing(false)}
                      onMouseMove={handleScrubMove}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenVideo(cyberbullyingProject.videoUrl);
                        }
                      }}
                      className="relative aspect-video rounded-xl overflow-hidden bg-black border border-stone-200 dark:border-[#262A34] shadow-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-[#C6F36B] group/video"
                    >
                      <img
                        src={cyberbullyingProject.image}
                        alt="Stop Cyberbullying Video Storytelling Project Preview"
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/video:scale-105"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

                      {/* Interactive Scrubbing Playhead Indicator */}
                      <AnimatePresence>
                        {isScrubbing && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 pointer-events-none"
                          >
                            <div
                              style={{ left: `${scrubPosition}%` }}
                              className="absolute top-0 bottom-0 w-[2px] bg-emerald-400 dark:bg-[#C6F36B] shadow-[0_0_8px_#C6F36B] z-20"
                            >
                              <div className="w-2.5 h-2.5 -translate-x-[4px] bg-emerald-400 dark:bg-[#C6F36B] rounded-full shadow" />
                            </div>

                            <div
                              style={{ left: `${Math.min(85, Math.max(15, scrubPosition))}%` }}
                              className="absolute top-3 -translate-x-1/2 px-2.5 py-1 rounded bg-black/90 border border-emerald-500/50 dark:border-[#C6F36B]/60 text-emerald-400 dark:text-[#C6F36B] font-mono text-[10px] font-bold z-30 shadow-lg"
                            >
                              SCRUB: {formattedScrubTime} / 00:57
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Central Play Trigger Button with Pulsing Wave */}
                      <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-emerald-400 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318] flex items-center justify-center shadow-2xl group-hover/video:scale-110 active:scale-95 transition-all z-20">
                        <Play className="w-6 h-6 fill-current translate-x-0.5 text-stone-950 dark:text-[#111318]" />
                        <span className="absolute inset-0 rounded-full bg-emerald-400/40 dark:bg-[#C6F36B]/40 animate-ping -z-10" />
                      </div>

                      {/* Bottom Media Bar Overlay */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90 z-20 pointer-events-none">
                        <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                          {isScrubbing ? formattedScrubTime : '00:57 FULL SHOWREEL'}
                        </span>
                        <span className="bg-emerald-500/80 text-black px-2 py-0.5 rounded font-bold">
                          HOVER TO SCRUB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content & Verified Details */}
                  <div className="lg:col-span-5 flex flex-col justify-center">
                    <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      <span>CATEGORY: VIDEO · SHORT-FORM SHOWREEL</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-stone-950 dark:text-[#FFFFFF] font-display mb-2">
                      STOP CYBERBULLYING AWARENESS
                    </h3>
                    <div className="text-xs font-mono text-emerald-700 dark:text-[#C6F36B] mb-4">
                      Awarded iStudio Project · 57s Narrative Video
                    </div>
                    <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/80 leading-relaxed mb-6 font-normal">
                      {cyberbullyingProject.description}
                    </p>

                    {/* Verified Points */}
                    <div className="space-y-2.5 mb-8 text-xs text-stone-600 dark:text-[#9296A2]">
                      {cyberbullyingProject.verifiedDetails.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B] shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleOpenVideo(cyberbullyingProject.videoUrl)}
                        className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-colors shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-stone-950 dark:text-[#111318]" />
                        <span>WATCH SHOWREEL ↗</span>
                      </motion.button>

                      <a
                        href="#credentials"
                        className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-stone-800 dark:text-[#FFFFFF] hover:text-emerald-700 dark:hover:text-[#C6F36B] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] rounded-xl transition-all"
                      >
                        <span>View Verified Credential</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== 2. PERSONAL PORTFOLIO & AI ART GRID ==================== */}
            {(activeFilter === 'all' || activeFilter === 'portfolio' || activeFilter === 'ai') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* PERSONAL PORTFOLIO SHOWCASE (Replaced in place of previous photography card) */}
                {(activeFilter === 'all' || activeFilter === 'portfolio') && (
                  <div
                    onMouseMove={(e) => handleCardMouseMove('portfolio', e)}
                    onMouseEnter={() => setHoveredCardId('portfolio')}
                    onMouseLeave={() => handleCardMouseLeave('portfolio')}
                    style={{
                      transform:
                        hoveredCardId === 'portfolio'
                          ? `perspective(1000px) rotateX(${tiltStyle.portfolio?.rx || 0}deg) rotateY(${tiltStyle.portfolio?.ry || 0}deg)`
                          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                      transition: hoveredCardId === 'portfolio' ? 'none' : 'transform 0.5s ease-out',
                    }}
                    className="relative rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-all duration-300 group shadow-md will-change-transform overflow-hidden"
                  >
                    {hoveredCardId === 'portfolio' && (
                      <div
                        className="absolute inset-0 pointer-events-none z-30"
                        style={{
                          background: `radial-gradient(circle 350px at ${tiltStyle.portfolio?.gx || 50}% ${tiltStyle.portfolio?.gy || 50}%, rgba(198,243,107,0.06), transparent 80%)`,
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Actual Live Portfolio Screenshot with System HUD Badge */}
                      <div
                        data-cursor="view"
                        className="relative aspect-video rounded-xl overflow-hidden bg-black mb-6 border border-stone-200 dark:border-[#262A34] shadow-inner"
                      >
                        <img
                          src={portfolioProject.image}
                          alt="Ansh Pratap — AI/ML & Interactive Web Portfolio Live Preview"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 dark:from-[#111318] via-transparent to-transparent opacity-60" />

                        {/* Top HUD Badge */}
                        <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border border-cyan-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                          <span className="text-cyan-400">SYSTEM BUS: ACTIVE</span>
                          <span className="text-stone-400">·</span>
                          <span>VERCEL PRODUCTION</span>
                        </div>
                      </div>

                      <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5" />
                        <span>CATEGORY: PORTFOLIO & WEB · {portfolioProject.category}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-stone-950 dark:text-[#FFFFFF] font-display mb-2">
                        {portfolioProject.title}
                      </h3>
                      <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-4">
                        {portfolioProject.subtitle}
                      </div>
                      <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/80 leading-relaxed mb-6 font-normal">
                        {portfolioProject.description}
                      </p>

                      {/* Verified Details */}
                      <div className="space-y-2 mb-8 text-xs text-stone-600 dark:text-[#9296A2]">
                        {portfolioProject.verifiedDetails.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-stone-200 dark:border-[#262A34] relative z-10">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={portfolioProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider"
                      >
                        <span>Visit Live Portfolio</span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
                      </motion.a>

                      <a
                        href={portfolioProject.githubUrl || 'https://github.com/AnshPratap2314/Ansh-portfolio'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-stone-800 dark:text-[#FFFFFF] hover:text-emerald-700 dark:hover:text-[#C6F36B] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] rounded-xl transition-all"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>GitHub Repo</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* AI ART PROJECT SHOWCASE */}
                {(activeFilter === 'all' || activeFilter === 'ai') && (
                  <div
                    onMouseMove={(e) => handleCardMouseMove('createsphere', e)}
                    onMouseEnter={() => setHoveredCardId('createsphere')}
                    onMouseLeave={() => handleCardMouseLeave('createsphere')}
                    style={{
                      transform:
                        hoveredCardId === 'createsphere'
                          ? `perspective(1000px) rotateX(${tiltStyle.createsphere?.rx || 0}deg) rotateY(${tiltStyle.createsphere?.ry || 0}deg)`
                          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                      transition: hoveredCardId === 'createsphere' ? 'none' : 'transform 0.5s ease-out',
                    }}
                    className="relative rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] p-6 sm:p-8 flex flex-col justify-between hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-all duration-300 group shadow-md will-change-transform overflow-hidden"
                  >
                    {hoveredCardId === 'createsphere' && (
                      <div
                        className="absolute inset-0 pointer-events-none z-30"
                        style={{
                          background: `radial-gradient(circle 350px at ${tiltStyle.createsphere?.gx || 50}% ${tiltStyle.createsphere?.gy || 50}%, rgba(198,243,107,0.06), transparent 80%)`,
                        }}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Image Showcase */}
                      <div
                        data-cursor="view"
                        className="relative aspect-video rounded-xl overflow-hidden bg-black mb-6 border border-stone-200 dark:border-[#262A34]"
                      >
                        <img
                          src={createSphereProject.image}
                          alt="CreateSphere AI — Creative Technology Suite Preview"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 dark:from-[#111318] via-transparent to-transparent opacity-65" />

                        <div className="absolute top-3 left-3 bg-stone-900/90 text-stone-100 font-mono text-[10px] font-bold px-2.5 py-1 rounded-lg border border-white/20 backdrop-blur-md flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-emerald-400 dark:text-[#C6F36B]" />
                          <span>GENAI SUITE · GEMINI POWERED</span>
                        </div>
                      </div>

                      <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>CATEGORY: AI ART · {createSphereProject.category}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-stone-950 dark:text-[#FFFFFF] font-display mb-3">
                        {createSphereProject.title}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/80 leading-relaxed mb-6 font-normal">
                        {createSphereProject.description}
                      </p>

                      {/* Verified Capabilities */}
                      <div className="space-y-2 mb-8 text-xs text-stone-600 dark:text-[#9296A2]">
                        {createSphereProject.verifiedDetails.map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B] shrink-0 mt-0.5" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-stone-200 dark:border-[#262A34] relative z-10">
                      <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href={createSphereProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-wider"
                      >
                        <span>Visit CreateSphere</span>
                        <ExternalLink className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
                      </motion.a>

                      <button
                        onClick={() => onOpenInquiry('CreateSphere AI Creative Services')}
                        className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-stone-800 dark:text-[#FFFFFF] hover:text-emerald-700 dark:hover:text-[#C6F36B] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] rounded-xl transition-all cursor-pointer"
                      >
                        <span>Request Creative Service</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Video Lightbox Modal */}
      {!onPlayVideo && (
        <VideoModal
          isOpen={Boolean(activeVideoModal)}
          onClose={() => setActiveVideoModal(null)}
          videoSrc={activeVideoModal || ''}
          title={cyberbullyingProject.title}
          subtitle="iStudio Video Editing Internship Final Project (50–60s)"
        />
      )}

      {/* Zindagi Ki Dhun Dedicated 7-Section Fullscreen Case Study Experience */}
      <ZindagiCaseStudyModal
        isOpen={caseStudyOpen}
        onClose={() => setCaseStudyOpen(false)}
      />

      {/* Kuchh Bhi Post Kardo Dedicated 8-Section Case Study Modal */}
      <KuchhBhiCaseStudyModal
        isOpen={kuchhBhiModalOpen}
        onClose={() => setKuchhBhiModalOpen(false)}
      />
    </section>
  );
};

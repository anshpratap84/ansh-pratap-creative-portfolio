import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ExternalLink,
  Play,
  TrendingUp,
  Instagram,
  Flame,
  Sparkles,
  BarChart3,
  CheckCircle2,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Film,
  Layers,
  ArrowRight,
  Bookmark,
  Calendar,
  Zap,
  Target,
  Award,
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface KuchhBhiCaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GalleryItem {
  id: string;
  type: 'reel' | 'post' | 'meme' | 'carousel';
  title: string;
  viewsBadge?: string;
  aspect: string;
  tag: string;
  caption: string;
  hook: string;
  stats: { likes: string; comments: string; shares: string };
  gradient: string;
}

export const KuchhBhiCaseStudyModal: React.FC<KuchhBhiCaseStudyModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (selectedGalleryItem) {
            setSelectedGalleryItem(null);
          } else {
            onClose();
          }
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose, selectedGalleryItem]);

  if (!isOpen) return null;

  // Selected Performance Highlights figures from real screenshots and updated resume
  const metrics = [
    {
      value: '143K',
      label: 'Top Breakout Reel',
      sub: 'Peak views recorded on viral cricket Reel',
      icon: Eye,
      accent: 'from-amber-500/20 to-orange-500/20 border-orange-500/30 text-orange-400',
    },
    {
      value: '128K',
      label: 'Secondary Peak Reel',
      sub: 'High-retention cricket moment video',
      icon: Play,
      accent: 'from-pink-500/20 to-rose-500/20 border-pink-500/30 text-pink-400',
    },
    {
      value: '448K+',
      label: '30-Day Period Reach',
      sub: 'Instagram Professional Dashboard analytics',
      icon: BarChart3,
      accent: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
    },
    {
      value: '70+',
      label: 'Curated Posts Published',
      sub: 'Reels, memes, and matchday stories catalog',
      icon: Flame,
      accent: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400',
    },
  ];

  const galleryItems: GalleryItem[] = [
    {
      id: 'g1',
      type: 'post',
      title: 'Top Breakout Cricket Moment',
      viewsBadge: '~143K Views',
      aspect: 'aspect-square',
      tag: 'VIRAL POST',
      caption: 'Crucial matchday turning point analyzed with sharp relatable storytelling & fan commentary.',
      hook: '“The over that turned the entire tournament upside down.”',
      stats: { likes: '11.8K', comments: '640', shares: '2.1K' },
      gradient: 'from-orange-600/40 via-red-600/20 to-stone-900',
    },
    {
      id: 'g2',
      type: 'reel',
      title: 'High-Retention Cricket Reel',
      viewsBadge: '~99.5K Views',
      aspect: 'aspect-[9/16]',
      tag: 'FEATURED REEL',
      caption: 'Dynamic short-form video edit synchronized to trending audio with fast-cut match highlights.',
      hook: '“3 balls, 12 runs needed: Watch how this finish stunned the stadium.”',
      stats: { likes: '8.4K', comments: '390', shares: '1.7K' },
      gradient: 'from-pink-600/40 via-purple-600/20 to-stone-900',
    },
    {
      id: 'g3',
      type: 'meme',
      title: 'IPL Matchday Reaction Meme',
      viewsBadge: 'Viral Engagement',
      aspect: 'aspect-square',
      tag: 'IPL MEME',
      caption: 'Relatable pop-culture meme format capturing authentic Indian fan emotion during intense run-chases.',
      hook: '“POV: Watching the last over with your friends when net run rate matters.”',
      stats: { likes: '6.2K', comments: '280', shares: '950' },
      gradient: 'from-purple-600/40 via-indigo-600/20 to-stone-900',
    },
    {
      id: 'g4',
      type: 'carousel',
      title: 'Player Story & Milestone Tribute',
      viewsBadge: 'Community Favorite',
      aspect: 'aspect-square',
      tag: 'CAROUSEL STORY',
      caption: 'Multi-slide narrative exploring an underrated domestic player’s inspiring journey into the league.',
      hook: '“From local district trials to the grand stage: The untold grind.”',
      stats: { likes: '5.1K', comments: '195', shares: '430' },
      gradient: 'from-blue-600/40 via-cyan-600/20 to-stone-900',
    },
    {
      id: 'g5',
      type: 'reel',
      title: 'Fast-Cut Player Spotlight Reel',
      viewsBadge: 'Trending Audio',
      aspect: 'aspect-[9/16]',
      tag: 'REELS EDIT',
      caption: 'Paced cuts, typography pop-ins, and sound-effect accents edited in CapCut & Premiere Pro.',
      hook: '“Notice the subtle footwork change before that maximum?”',
      stats: { likes: '7.3K', comments: '310', shares: '1.2K' },
      gradient: 'from-emerald-600/40 via-teal-600/20 to-stone-900',
    },
    {
      id: 'g6',
      type: 'post',
      title: 'Interactive Match Poll & Debate',
      viewsBadge: 'High Comments',
      aspect: 'aspect-square',
      tag: 'FAN ENGAGEMENT',
      caption: 'Audience debate prompt encouraging community opinions, prediction votes, and lively banter.',
      hook: '“Which captain makes the bolder tactical call under pressure?”',
      stats: { likes: '4.7K', comments: '512', shares: '380' },
      gradient: 'from-amber-600/40 via-yellow-600/20 to-stone-900',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/85 backdrop-blur-xl flex justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-5xl bg-[#111318] text-[#F3F1EA] rounded-3xl border border-stone-800 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-[#111318]/95 backdrop-blur-md border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white shadow-md">
                <Instagram className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-stone-100 font-display">
                    Kuchh Bhi Post Kardo
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                    ACTIVE ARCHIVE
                  </span>
                </div>
                <div className="text-xs text-stone-400 font-mono">
                  @kuchhbhhipostkardo · Instagram Case Study
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/kuchhbhhipostkardo/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playClick()}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono font-bold rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white hover:opacity-90 transition-opacity shadow-sm"
              >
                <span>Visit Instagram</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onClose();
                }}
                className="w-9 h-9 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors border border-stone-800 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-10 space-y-12">
            {/* 1. PROJECT HERO & OVERVIEW */}
            <div className="relative rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-stone-900/90 via-stone-900/50 to-stone-950 border border-stone-800 overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-[#DD2A7B]/10 via-[#F58529]/10 to-transparent blur-3xl pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-mono mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SOCIAL MEDIA MANAGEMENT · CONTENT CREATION</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display tracking-tight mb-4">
                  Kuchh Bhi Post Kardo
                </h1>

                <p className="text-base sm:text-lg text-stone-300 leading-relaxed mb-6 font-normal">
                  Managed a cricket-focused entertainment Instagram page featuring trending cricket updates, IPL moments, player stories, memes, and short-form Reels. Experimented with different content formats, visual storytelling, and trending topics to create engaging social media content and increase content reach.
                </p>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://www.instagram.com/kuchhbhhipostkardo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundManager.playClick()}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-opacity"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Open @kuchhbhhipostkardo on Instagram</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-stone-900 text-stone-300 font-mono text-xs border border-stone-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Niche: Cricket &amp; IPL Entertainment</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. SELECTED PERFORMANCE HIGHLIGHTS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-[#C6F36B] font-bold">
                    01 / VERIFIED MILESTONES
                  </div>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Selected Performance Highlights
                  </h2>
                </div>
                <div className="text-[11px] font-mono text-stone-400 hidden md:block">
                  From genuine Instagram Dashboard records
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, idx) => {
                  const Icon = m.icon;
                  return (
                    <div
                      key={idx}
                      className={`p-5 rounded-2xl bg-gradient-to-br ${m.accent} bg-stone-900/60 border backdrop-blur-sm transition-transform hover:-translate-y-1 duration-200`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-5 h-5" />
                        <span className="text-[10px] font-mono uppercase opacity-75 font-bold">
                          MILESTONE
                        </span>
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white font-display tracking-tight mb-1">
                        {m.value}
                      </div>
                      <div className="text-xs font-bold text-stone-200 mb-1">
                        {m.label}
                      </div>
                      <div className="text-[11px] text-stone-400 leading-snug">
                        {m.sub}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 text-[11px] font-mono text-stone-500 italic">
                * Note: Figures reflect selected performance milestones from Instagram screenshots and dashboard analytics during active publishing periods.
              </div>
            </div>

            {/* 3. CONTENT NICHE & AUDIENCE + CREATION PROCESS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Niche & Audience */}
              <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800">
                <div className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold mb-2 flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5" />
                  <span>02 / CONTENT STRATEGY</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-3">
                  Content Niche &amp; Target Audience
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed mb-4">
                  A high-velocity entertainment vertical aimed at Indian cricket followers and IPL franchise fanbases. Content was designed to capture real-time match sentiment, player debates, and relatable humor in fast-scrolling feeds.
                </p>

                <div className="space-y-2.5 text-xs text-stone-300">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Matchday Momentum:</strong> Instant coverage of game-changing overs and breakout player spells.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>Meme Culture:</strong> Relatable cricket situations turned into shareable visual formats.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
                    <span><strong>High Retention Reels:</strong> Paced edits engineered around viral trending audio tracks.</span>
                  </div>
                </div>
              </div>

              {/* Content Creation Process */}
              <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C6F36B] font-bold mb-2 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>03 / WORKFLOW</span>
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-3">
                  Content Creation &amp; Publishing Process
                </h3>
                <div className="space-y-3 text-xs text-stone-300">
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <span className="font-mono text-emerald-400 font-bold">1. Trend &amp; Audio Discovery:</span> Identifying viral match clips, tournament talking points, and trending Instagram audio.
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <span className="font-mono text-emerald-400 font-bold">2. Hook &amp; Narrative Craft:</span> Writing 3-second visual and caption hooks to stop the scroll and boost watch completion.
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <span className="font-mono text-emerald-400 font-bold">3. Multi-Tool Production:</span> Editing fast cuts in CapCut &amp; Premiere Pro; assembling graphic carousels and memes in Canva.
                  </div>
                  <div className="p-2.5 rounded-xl bg-stone-950/60 border border-stone-800/80">
                    <span className="font-mono text-emerald-400 font-bold">4. Analytics &amp; Iteration:</span> Reviewing 30-day views, shares, and retention curves via Instagram Dashboard.
                  </div>
                </div>
              </div>
            </div>

            {/* 4. MY RESPONSIBILITIES & SKILLS */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-7 p-6 rounded-2xl bg-stone-900/40 border border-stone-800">
                <div className="text-xs font-mono uppercase tracking-widest text-[#C6F36B] font-bold mb-2">
                  04 / EXECUTION
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-4">
                  My Core Responsibilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-300">
                  {[
                    'Instagram content planning and publishing',
                    'Cricket and IPL trend research',
                    'Reels editing and short-form storytelling',
                    'Creative post and meme creation',
                    'Caption and hook writing',
                    'Visual content selection and presentation',
                    'Monitoring Instagram content performance',
                  ].map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-stone-950/40 border border-stone-800/60">
                      <CheckCircle2 className="w-4 h-4 text-[#C6F36B] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools & Skills */}
              <div className="md:col-span-5 p-6 rounded-2xl bg-stone-900/40 border border-stone-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold mb-2">
                    05 / TOOLKIT &amp; SKILLS
                  </div>
                  <h3 className="text-xl font-bold text-white font-display mb-4">
                    Tools &amp; Capabilities
                  </h3>

                  <div className="mb-4">
                    <div className="text-xs font-mono text-stone-400 mb-2 font-semibold">SOFTWARE &amp; PLATFORMS:</div>
                    <div className="flex flex-wrap gap-2">
                      {['Canva', 'CapCut', 'Adobe Premiere Pro', 'Instagram Professional Dashboard'].map((tool, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 text-xs font-mono font-medium border border-stone-700/60">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-stone-400 mb-2 font-semibold">APPLIED SKILLS:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Social Media Management',
                        'Instagram Marketing',
                        'Content Strategy',
                        'Video Editing',
                        'Graphic Design',
                        'Copywriting',
                        'Trend Research',
                        'Creative Storytelling',
                      ].map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-300 text-[11px] font-mono border border-emerald-500/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. INSTAGRAM CONTENT GALLERY & FORMAT SHOWCASE */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                    06 / CONTENT PORTFOLIO
                  </div>
                  <h2 className="text-2xl font-bold text-white font-display">
                    Instagram Content Showcase &amp; Post Formats
                  </h2>
                </div>
                <div className="text-xs font-mono text-stone-400 hidden sm:block">
                  Click any post card to inspect details
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {galleryItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      soundManager.playClick();
                      setSelectedGalleryItem(item);
                    }}
                    className="group relative rounded-2xl bg-stone-900/70 border border-stone-800 hover:border-pink-500/50 transition-all duration-300 p-4 cursor-pointer overflow-hidden shadow-lg hover:-translate-y-1"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                        {item.tag}
                      </span>
                      {item.viewsBadge && (
                        <span className="font-mono text-[11px] font-bold text-pink-400 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{item.viewsBadge}</span>
                        </span>
                      )}
                    </div>

                    {/* Visual Card Frame */}
                    <div className={`relative w-full ${item.aspect} rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10 p-4 flex flex-col justify-between mb-3 overflow-hidden group-hover:border-white/20 transition-all`}>
                      <div className="flex justify-between items-start">
                        <div className="w-7 h-7 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                          {item.type === 'reel' ? <Film className="w-3.5 h-3.5" /> : <Instagram className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-sm">
                          @kuchhbhhipostkardo
                        </span>
                      </div>

                      <div>
                        <div className="text-xs font-bold text-white mb-1 line-clamp-2">
                          {item.title}
                        </div>
                        <div className="text-[11px] text-white/80 italic font-serif line-clamp-2">
                          {item.hook}
                        </div>
                      </div>
                    </div>

                    {/* Social Meta */}
                    <p className="text-xs text-stone-300 mb-3 line-clamp-2 leading-relaxed">
                      {item.caption}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-stone-800/80 text-[11px] font-mono text-stone-400">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-rose-400" />
                        <span>{item.stats.likes}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3 text-blue-400" />
                        <span>{item.stats.comments}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3 text-emerald-400" />
                        <span>{item.stats.shares}</span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. CALL TO ACTION & PROFILE VISIT */}
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#F58529]/15 via-[#DD2A7B]/15 to-[#8134AF]/15 border border-pink-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold mb-1">
                  EXPLORE THE CONTENT
                </div>
                <h3 className="text-2xl font-bold text-white font-display mb-1">
                  Visit @kuchhbhhipostkardo on Instagram
                </h3>
                <p className="text-sm text-stone-300 max-w-lg">
                  Explore published cricket Reels, matchday reaction memes, and audience interactions directly on Instagram.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://www.instagram.com/kuchhbhhipostkardo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundManager.playClick()}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90 transition-opacity"
                >
                  <Instagram className="w-4 h-4" />
                  <span>Open Instagram Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onClose();
                  }}
                  className="px-5 py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold border border-stone-800 transition-colors cursor-pointer"
                >
                  Back to Portfolio
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Gallery Lightbox Modal */}
        <AnimatePresence>
          {selectedGalleryItem && (
            <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative max-w-md w-full bg-stone-900 border border-stone-700 rounded-3xl p-6 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedGalleryItem(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-xs font-mono text-pink-400 mb-1 font-bold">
                  {selectedGalleryItem.tag} · {selectedGalleryItem.viewsBadge}
                </div>
                <h3 className="text-xl font-bold text-white font-display mb-2">
                  {selectedGalleryItem.title}
                </h3>
                <p className="text-sm font-serif italic text-stone-300 mb-4">
                  {selectedGalleryItem.hook}
                </p>

                <div className={`w-full ${selectedGalleryItem.aspect} max-h-72 rounded-2xl bg-gradient-to-br ${selectedGalleryItem.gradient} border border-white/20 p-5 flex flex-col justify-between mb-4 shadow-inner`}>
                  <div className="flex justify-between items-center text-xs text-white">
                    <span className="font-mono bg-black/60 px-2.5 py-1 rounded-full">@kuchhbhhipostkardo</span>
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="text-white text-sm font-semibold">
                    {selectedGalleryItem.caption}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-stone-300 py-2 border-y border-stone-800 mb-4">
                  <span>Likes: {selectedGalleryItem.stats.likes}</span>
                  <span>Comments: {selectedGalleryItem.stats.comments}</span>
                  <span>Shares: {selectedGalleryItem.stats.shares}</span>
                </div>

                <a
                  href="https://www.instagram.com/kuchhbhhipostkardo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white text-xs font-bold uppercase tracking-wider"
                >
                  <span>View Post on Instagram</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

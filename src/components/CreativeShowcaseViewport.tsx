import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Sliders,
  Sparkles,
  Film,
  Volume2,
  Eye,
  Maximize2,
  ChevronRight,
  Layers,
  Activity,
  Check,
} from 'lucide-react';

interface CreativeShowcaseViewportProps {
  onPlayShowreel?: () => void;
  className?: string;
}

type ChannelMode = 'reel' | 'grade' | 'genai';

export const CreativeShowcaseViewport: React.FC<CreativeShowcaseViewportProps> = ({
  onPlayShowreel,
  className = '',
}) => {
  const [activeChannel, setActiveChannel] = useState<ChannelMode>('reel');
  const [isHovered, setIsHovered] = useState(false);
  const [gradeSplit, setGradeSplit] = useState(55); // Percentage for Before/After split
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const [activeKeyframe, setActiveKeyframe] = useState(0);

  // 3D Parallax tilt state
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // Timecode counter simulation for authentic cinematic HUD feel
  const [timecodeFrame, setTimecodeFrame] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimecodeFrame((prev) => (prev >= 59 ? 0 : prev + 1));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || isDraggingSlider) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rY = ((x - centerX) / centerX) * 6; // max 6 deg

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Dragging slider for Color Grade Comparison
  const handleSliderMove = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setGradeSplit(Math.round((pos / rect.width) * 100));
  };

  const keyframes = [
    { time: '00:04', label: 'Tension Hook', tag: 'High-contrast shadow' },
    { time: '00:19', label: 'Phone Glow', tag: 'Screen bounce light' },
    { time: '00:38', label: 'Cyber Pressure', tag: 'Fast cut & audio drop' },
    { time: '00:54', label: 'Awareness Climax', tag: 'Graded resolution' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`relative w-full max-w-[500px] rounded-2xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] shadow-2xl overflow-hidden transition-colors ${className}`}
    >
      {/* Sleek Top Studio Monitor Bar (Replacing generic pill badge with professional HUD) */}
      <div className="flex items-center justify-between px-4 py-3 bg-stone-100/90 dark:bg-[#15181F]/90 border-b border-stone-200 dark:border-[#262A34] backdrop-blur-md z-30 relative select-none">
        {/* Left: Professional Status & Timecode */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 dark:bg-[#C6F36B] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 dark:bg-[#C6F36B]" />
          </span>
          <span className="text-[11px] font-mono font-bold tracking-wider text-stone-900 dark:text-stone-100 uppercase">
            LIVE MONITOR
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono text-stone-500 dark:text-stone-400 bg-stone-200 dark:bg-stone-800/80 px-1.5 py-0.5 rounded">
            TC 00:00:57:{timecodeFrame < 10 ? `0${timecodeFrame}` : timecodeFrame}
          </span>
        </div>

        {/* Right: Tactile Discipline Mode Selector */}
        <div className="flex items-center gap-1 bg-stone-200/80 dark:bg-[#0E1015] p-1 rounded-lg border border-stone-300/60 dark:border-[#262A34]">
          <button
            onClick={() => setActiveChannel('reel')}
            className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              activeChannel === 'reel'
                ? 'bg-white dark:bg-[#262A34] text-stone-950 dark:text-[#C6F36B] shadow-sm font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
            title="Video Editing Showreel View"
          >
            <Film className="w-3 h-3" />
            <span>REEL</span>
          </button>

          <button
            onClick={() => setActiveChannel('grade')}
            className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              activeChannel === 'grade'
                ? 'bg-white dark:bg-[#262A34] text-stone-950 dark:text-[#C6F36B] shadow-sm font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
            title="Interactive Color Grade Split View"
          >
            <Sliders className="w-3 h-3" />
            <span>GRADE</span>
          </button>

          <button
            onClick={() => setActiveChannel('genai')}
            className={`px-2.5 py-1 text-[10px] font-mono font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              activeChannel === 'genai'
                ? 'bg-white dark:bg-[#262A34] text-stone-950 dark:text-[#C6F36B] shadow-sm font-bold'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
            title="Generative AI Neural Lab View"
          >
            <Sparkles className="w-3 h-3" />
            <span>GENAI</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Content Area */}
      <div className="relative aspect-[4/4.5] sm:aspect-[4/4.6] bg-black overflow-hidden group">
        <AnimatePresence mode="wait">
          {/* CHANNEL 01: REEL / VIDEO SHOWCASE */}
          {activeChannel === 'reel' && (
            <motion.div
              key="reel"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src="/assets/aistudio/Screenshot_2026-11-02_at_4.53.19_PM_576db55c.png"
                alt="Stop Cyberbullying Awareness Video Frame"
                className="w-full h-full object-cover object-center filter contrast-105 transition-transform duration-700 group-hover:scale-105"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/40 pointer-events-none" />

              {/* Viewfinder Overlay Camera Markings */}
              <div className="absolute inset-4 pointer-events-none flex flex-col justify-between opacity-70">
                <div className="flex justify-between items-start">
                  <div className="w-4 h-4 border-t-2 border-l-2 border-white/60" />
                  <div className="flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-emerald-400 dark:text-[#C6F36B] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    <span>4K UHD</span>
                    <span>·</span>
                    <span>60 FPS</span>
                  </div>
                  <div className="w-4 h-4 border-t-2 border-r-2 border-white/60" />
                </div>
                <div className="flex justify-between items-end">
                  <div className="w-4 h-4 border-b-2 border-l-2 border-white/60" />
                  <div className="w-4 h-4 border-b-2 border-r-2 border-white/60" />
                </div>
              </div>

              {/* Center Play Button with Luminous Aura */}
              {onPlayShowreel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={onPlayShowreel}
                    aria-label="Play Full Showreel Video"
                    className="relative flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500 dark:bg-[#C6F36B] text-black shadow-[0_0_35px_rgba(198,243,107,0.55)] cursor-pointer group/btn"
                  >
                    <span className="absolute inset-0 rounded-full bg-emerald-400 dark:bg-[#C6F36B] animate-ping opacity-30 pointer-events-none" />
                    <Play className="w-8 h-8 fill-current translate-x-0.5 text-stone-950" />
                  </motion.button>
                  <span className="mt-3 text-xs font-mono font-bold tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    CLICK TO WATCH SHOWREEL (57S)
                  </span>
                </div>
              )}

              {/* Bottom Reel Audio Wave & Metadata */}
              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <div className="p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 dark:text-[#C6F36B]">
                      DIRECTOR'S CUT · AWARENESS
                    </div>
                    <div className="text-xs font-bold text-white font-display">
                      Stop Cyberbullying Project
                    </div>
                  </div>

                  {/* Dynamic Audio Visualizer Bars */}
                  <div className="flex items-end gap-1 h-5">
                    <span className="w-1 bg-emerald-400 dark:bg-[#C6F36B] rounded-full animate-pulse h-3" />
                    <span className="w-1 bg-emerald-400 dark:bg-[#C6F36B] rounded-full animate-pulse h-5 delay-75" />
                    <span className="w-1 bg-emerald-400 dark:bg-[#C6F36B] rounded-full animate-pulse h-2 delay-150" />
                    <span className="w-1 bg-emerald-400 dark:bg-[#C6F36B] rounded-full animate-pulse h-4 delay-100" />
                    <span className="w-1 bg-emerald-400 dark:bg-[#C6F36B] rounded-full animate-pulse h-5 delay-200" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHANNEL 02: COLOR GRADE INTERACTIVE BEFORE / AFTER SLIDER */}
          {activeChannel === 'grade' && (
            <motion.div
              key="grade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={sliderRef}
              onMouseDown={() => setIsDraggingSlider(true)}
              onMouseUp={() => setIsDraggingSlider(false)}
              onMouseMove={(e) => isDraggingSlider && handleSliderMove(e.clientX)}
              onTouchMove={(e) => handleSliderMove(e.touches[0].clientX)}
              className="absolute inset-0 w-full h-full select-none cursor-ew-resize"
            >
              {/* After: Fully Graded Cinematic Master */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_at_4.53.19_PM_576db55c.png"
                  alt="Graded Master Frame"
                  className="w-full h-full object-cover filter saturate-125 contrast-110"
                />
                <div className="absolute top-4 right-4 bg-emerald-500/90 text-stone-950 font-mono text-[10px] font-bold px-2 py-0.5 rounded shadow">
                  MASTER GRADE
                </div>
              </div>

              {/* Before: Raw Flat Log Profile (Clipped to gradeSplit) */}
              <div
                style={{ width: `${gradeSplit}%` }}
                className="absolute inset-0 h-full overflow-hidden border-r-2 border-emerald-400 dark:border-[#C6F36B] z-10 shadow-[2px_0_15px_rgba(0,0,0,0.5)]"
              >
                <div className="absolute inset-0 w-[500px] h-full">
                  <img
                    src="/assets/aistudio/Screenshot_2026-11-02_at_4.53.19_PM_576db55c.png"
                    alt="Raw Log Camera Frame"
                    className="w-full h-full object-cover filter grayscale(40%) brightness-125 contrast-75 sepia(15%)"
                  />
                  <div className="absolute top-4 left-4 bg-stone-900/90 text-stone-200 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-white/20">
                    RAW LOG CAMERA
                  </div>
                </div>
              </div>

              {/* Draggable Divider Handle */}
              <div
                style={{ left: `${gradeSplit}%` }}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-8 h-8 rounded-full bg-emerald-400 dark:bg-[#C6F36B] text-stone-950 flex items-center justify-center shadow-[0_0_20px_rgba(198,243,107,0.7)] pointer-events-none"
              >
                <Sliders className="w-4 h-4 stroke-[2.5]" />
              </div>

              {/* Instructions banner */}
              <div className="absolute bottom-4 left-4 right-4 z-20">
                <div className="p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
                  <span className="text-[11px] font-mono text-stone-300">
                    ⟵ Drag slider to compare RAW footage vs. Color Grade ⟶
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHANNEL 03: GENAI NEURAL MULTIMODAL LAB */}
          {activeChannel === 'genai' && (
            <motion.div
              key="genai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full bg-[#0D0F14] p-5 flex flex-col justify-between"
            >
              {/* Top Prompt Breakdown */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 dark:text-[#C6F36B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>GENAI PROMPT ENGINE</span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400">
                    Multimodal Synthesis
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800 text-xs font-mono text-stone-200 leading-relaxed mb-4">
                  <span className="text-emerald-400 dark:text-[#C6F36B] font-bold">PROMPT: </span>
                  "Moody editorial portrait of modern digital storyteller, cinematic rim light, dark room with glowing mobile screen reflections, 35mm anamorphic depth..."
                </div>

                {/* Interactive Token Chips */}
                <div className="text-[11px] font-mono text-stone-400 mb-2 uppercase tracking-wider">
                  Active Workflow Weights:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    '#CyberAmbient 1.4',
                    '#Anamorphic 35mm',
                    '#VolumetricCyan',
                    '#HighRetentionPacing',
                    '#DualToneColor',
                  ].map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-stone-800/80 hover:bg-stone-700 text-[10px] font-mono text-emerald-300 dark:text-[#C6F36B] border border-stone-700/50 cursor-pointer transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mini Preview & Pipeline Specs */}
              <div className="mt-4 p-3 rounded-xl bg-black/60 border border-stone-800 flex items-center gap-3">
                <img
                  src="/assets/aistudio/Screenshot_2026-11-02_at_4.54.03_PM_b84daf47.png"
                  alt="CreateSphere AI Tool Suite"
                  className="w-14 h-14 rounded-lg object-cover border border-stone-700"
                />
                <div className="text-xs">
                  <div className="font-bold text-white font-display">CreateSphere AI Suite</div>
                  <div className="text-[10px] font-mono text-stone-400">
                    Prompt-to-Video Storyboards & Brand Graphics
                  </div>
                  <div className="text-[10px] font-mono text-emerald-400 dark:text-[#C6F36B] mt-0.5">
                    ● Model Inference: 1.8s
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tactile Keyframe Timeline Scrubber Footer */}
      <div className="px-4 py-3 bg-stone-50 dark:bg-[#15181F] border-t border-stone-200 dark:border-[#262A34] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-emerald-500 dark:text-[#C6F36B]" />
          <span className="font-mono text-[11px] text-stone-600 dark:text-stone-300">
            {activeChannel === 'reel' && 'Interactive Showreel & Keyframe Audio'}
            {activeChannel === 'grade' && 'Color Grading & Pacing Craft'}
            {activeChannel === 'genai' && 'Generative AI Pipelines & Workflows'}
          </span>
        </div>

        {onPlayShowreel && (
          <button
            onClick={onPlayShowreel}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold font-mono uppercase tracking-wider text-stone-900 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-md transition-all shadow-sm cursor-pointer active:scale-95"
          >
            <Play className="w-2.5 h-2.5 fill-current" />
            <span>PLAY REEL</span>
          </button>
        )}
      </div>
    </div>
  );
};

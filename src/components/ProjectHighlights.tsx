import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Briefcase, Users, Clock, TrendingUp, Sparkles, Award } from 'lucide-react';

interface MetricItem {
  id: string;
  label: string;
  targetValue: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  description: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

const METRICS: MetricItem[] = [
  {
    id: 'total-projects',
    label: 'Total Projects',
    targetValue: 28,
    suffix: '+',
    description: 'Video showreels, GenAI suites & web systems',
    badge: 'VERIFIED WORKS',
    icon: Briefcase,
    accentColor: 'text-emerald-500 dark:text-[#C6F36B]',
    glowColor: 'bg-emerald-500/10 dark:bg-[#C6F36B]/10',
    borderColor: 'border-emerald-500/30 dark:border-[#C6F36B]/30 hover:border-emerald-500/60 dark:hover:border-[#C6F36B]/60',
  },
  {
    id: 'happy-clients',
    label: 'Happy Clients',
    targetValue: 20,
    suffix: '+',
    description: 'Brands, creators & digital agency partners',
    badge: 'CLIENT TRUST',
    icon: Users,
    accentColor: 'text-cyan-600 dark:text-cyan-400',
    glowColor: 'bg-cyan-500/10 dark:bg-cyan-400/10',
    borderColor: 'border-cyan-500/30 dark:border-cyan-400/30 hover:border-cyan-500/60 dark:hover:border-cyan-400/60',
  },
  {
    id: 'hours-edited',
    label: 'Hours Edited',
    targetValue: 850,
    suffix: '+',
    description: 'Timeline post-production & rhythm cuts',
    badge: 'TIMELINE CRAFT',
    icon: Clock,
    accentColor: 'text-amber-600 dark:text-amber-400',
    glowColor: 'bg-amber-500/10 dark:bg-amber-400/10',
    borderColor: 'border-amber-500/30 dark:border-amber-400/30 hover:border-amber-500/60 dark:hover:border-amber-400/60',
  },
  {
    id: 'content-views',
    label: 'Content Views',
    targetValue: 448,
    suffix: 'K+',
    description: '30-day reach across Instagram & short-form',
    badge: 'AUDIENCE IMPACT',
    icon: TrendingUp,
    accentColor: 'text-pink-600 dark:text-pink-400',
    glowColor: 'bg-pink-500/10 dark:bg-pink-400/10',
    borderColor: 'border-pink-500/30 dark:border-pink-400/30 hover:border-pink-500/60 dark:hover:border-pink-400/60',
  },
];

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2.2,
  prefix = '',
  suffix = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = (timestamp - startTimestamp) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutExpo: fast ramp-up that settles smoothly
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(ease * value);

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={containerRef} className="tabular-nums font-mono">
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

interface ProjectHighlightsProps {
  className?: string;
}

export const ProjectHighlights: React.FC<ProjectHighlightsProps> = ({ className = '' }) => {
  return (
    <div className={`w-full mb-12 ${className}`}>
      {/* Sub-Header Title bar */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-500 dark:text-[#C6F36B]" />
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] font-bold">
            Project Highlights · Impact &amp; Output
          </span>
        </div>
        <div className="text-[11px] font-mono text-stone-500 dark:text-[#9296A2] hidden sm:block">
          Track record updated for 2026
        </div>
      </div>

      {/* Grid of 4 animated counter metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {METRICS.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className={`relative rounded-2xl border ${metric.borderColor} bg-white dark:bg-[#171A21] p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden`}
            >
              {/* Ambient radial accent wash on hover */}
              <div
                className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl ${metric.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Top row: Icon & Badge */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div
                  className={`w-10 h-10 rounded-xl ${metric.glowColor} flex items-center justify-center ${metric.accentColor} transition-transform duration-300 group-hover:scale-110 shadow-inner`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono tracking-wider px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-[#111318] border border-stone-200 dark:border-[#262A34] text-stone-600 dark:text-[#9296A2] font-semibold">
                  {metric.badge}
                </span>
              </div>

              {/* Counter Display & Label */}
              <div className="relative z-10 mb-2">
                <div
                  className={`text-3xl sm:text-4xl lg:text-4xl font-black font-display tracking-tight text-stone-950 dark:text-[#F3F1EA] mb-1 group-hover:${metric.accentColor} transition-colors`}
                >
                  <AnimatedCounter
                    value={metric.targetValue}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                  />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-stone-700 dark:text-[#D1D5DB]">
                  {metric.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-stone-500 dark:text-[#9296A2] font-sans leading-relaxed relative z-10 mt-auto pt-2 border-t border-stone-100 dark:border-[#262A34]">
                {metric.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

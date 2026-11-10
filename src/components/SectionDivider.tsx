import React from 'react';
import { motion } from 'motion/react';

export interface SectionDividerProps {
  /**
   * Visual variation of the divider
   * @default 'glow-line'
   */
  variant?: 'glow-line' | 'beam' | 'geometric' | 'flow';

  /**
   * Optional custom accent label or icon in the center (e.g. '04 / PRODUCTION', '✦', etc.)
   */
  centerBadge?: string | React.ReactNode;

  /**
   * Additional custom CSS classes for spacing or container
   */
  className?: string;

  /**
   * Subtle tint flavor for thematic variety
   * @default 'emerald'
   */
  accentFlavor?: 'emerald' | 'cyan' | 'pink' | 'amber';
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  variant = 'glow-line',
  centerBadge,
  className = '',
  accentFlavor = 'emerald',
}) => {
  // Color palette mappings based on accentFlavor
  const flavorGradients = {
    emerald: {
      line: 'from-transparent via-emerald-500/35 dark:via-[#C6F36B]/40 to-transparent',
      leftLine: 'from-transparent via-emerald-500/30 to-emerald-500/60 dark:via-[#C6F36B]/30 dark:to-[#C6F36B]/60',
      rightLine: 'from-emerald-500/60 via-emerald-500/30 to-transparent dark:from-[#C6F36B]/60 dark:via-[#C6F36B]/30 to-transparent',
      glow: 'from-emerald-500/10 via-[#C6F36B]/20 to-teal-500/10',
      shimmer: 'from-transparent via-emerald-400 dark:via-[#C6F36B] to-transparent',
      dot: 'bg-emerald-500 dark:bg-[#C6F36B] shadow-[0_0_10px_#C6F36B]',
      border: 'border-emerald-500/30 dark:border-[#C6F36B]/30',
      text: 'text-emerald-700 dark:text-[#C6F36B]',
    },
    cyan: {
      line: 'from-transparent via-cyan-500/35 dark:via-cyan-400/40 to-transparent',
      leftLine: 'from-transparent via-cyan-500/30 to-cyan-400/60 dark:via-cyan-400/30 dark:to-cyan-400/60',
      rightLine: 'from-cyan-400/60 via-cyan-500/30 to-transparent dark:from-cyan-400/60 dark:via-cyan-400/30 to-transparent',
      glow: 'from-cyan-500/10 via-blue-500/15 to-transparent',
      shimmer: 'from-transparent via-cyan-300 dark:via-cyan-400 to-transparent',
      dot: 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]',
      border: 'border-cyan-500/30 dark:border-cyan-400/30',
      text: 'text-cyan-600 dark:text-cyan-300',
    },
    pink: {
      line: 'from-transparent via-pink-500/35 dark:via-pink-400/40 to-transparent',
      leftLine: 'from-transparent via-pink-500/30 to-pink-400/60 dark:via-pink-400/30 dark:to-pink-400/60',
      rightLine: 'from-pink-400/60 via-pink-500/30 to-transparent dark:from-pink-400/60 dark:via-pink-400/30 to-transparent',
      glow: 'from-purple-500/10 via-pink-500/15 to-transparent',
      shimmer: 'from-transparent via-pink-300 dark:via-pink-400 to-transparent',
      dot: 'bg-pink-400 shadow-[0_0_10px_#f472b6]',
      border: 'border-pink-500/30 dark:border-pink-400/30',
      text: 'text-pink-600 dark:text-pink-300',
    },
    amber: {
      line: 'from-transparent via-amber-500/35 dark:via-amber-400/40 to-transparent',
      leftLine: 'from-transparent via-amber-500/30 to-amber-400/60 dark:via-amber-400/30 dark:to-amber-400/60',
      rightLine: 'from-amber-400/60 via-amber-500/30 to-transparent dark:from-amber-400/60 dark:via-amber-400/30 to-transparent',
      glow: 'from-amber-500/10 via-orange-500/15 to-transparent',
      shimmer: 'from-transparent via-amber-300 dark:via-amber-400 to-transparent',
      dot: 'bg-amber-400 shadow-[0_0_10px_#fbbf24]',
      border: 'border-amber-500/30 dark:border-amber-400/30',
      text: 'text-amber-600 dark:text-amber-300',
    },
  }[accentFlavor];

  // Renders the solid, opaque center badge that never allows lines behind or through it
  const renderBadge = () => (
    <div
      className={`relative z-20 shrink-0 px-3.5 py-1 rounded-full bg-[#FAF9F6] dark:bg-[#111318] border ${flavorGradients.border} text-[10px] font-mono tracking-widest uppercase ${flavorGradients.text} shadow-md flex items-center gap-2 select-none`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${flavorGradients.dot} animate-pulse shrink-0`} />
      <span className="font-semibold whitespace-nowrap text-stone-800 dark:text-[#F3F1EA]">{centerBadge}</span>
    </div>
  );

  return (
    <div
      aria-hidden="true"
      className={`relative w-full py-4 md:py-6 overflow-hidden flex items-center justify-center select-none pointer-events-none ${className}`}
    >
      {/* If centerBadge is present, use a physical gap split-line architecture so lines NEVER cross into the badge */}
      {centerBadge ? (
        <div className="relative w-full max-w-7xl mx-auto px-6 flex items-center justify-center gap-3 sm:gap-4">
          {/* Left Hairline with Shimmer */}
          <div className="flex-1 h-[1px] relative overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-r ${flavorGradients.leftLine}`} />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute inset-0 bg-gradient-to-r ${flavorGradients.shimmer}`}
            />
          </div>

          {/* Solid Opaque Center Badge */}
          {renderBadge()}

          {/* Right Hairline with Shimmer */}
          <div className="flex-1 h-[1px] relative overflow-hidden">
            <div className={`w-full h-full bg-gradient-to-r ${flavorGradients.rightLine}`} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              className={`absolute inset-0 bg-gradient-to-r ${flavorGradients.shimmer}`}
            />
          </div>
        </div>
      ) : (
        /* If no badge is present, render the standard continuous hairline variants */
        <>
          {variant === 'beam' && (
            <div className="relative w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0.35, scale: 0.95 }}
                animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className={`absolute w-96 h-12 rounded-full blur-2xl bg-gradient-to-r ${flavorGradients.glow}`}
              />
              <div className="relative w-full h-[1px]">
                <div className={`w-full h-full bg-gradient-to-r ${flavorGradients.line}`} />
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: [0, 0.9, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className={`absolute top-0 left-0 w-48 h-full bg-gradient-to-r ${flavorGradients.shimmer}`}
                />
              </div>
              <div className="absolute z-10 flex items-center justify-center">
                <span className={`w-2 h-2 rounded-full ${flavorGradients.dot}`} />
                <motion.span
                  animate={{ scale: [1, 2.2, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeOut' }}
                  className={`absolute w-3 h-3 rounded-full border border-emerald-400 dark:border-[#C6F36B]`}
                />
              </div>
            </div>
          )}

          {variant === 'geometric' && (
            <div className="relative w-full max-w-6xl mx-auto px-6 flex items-center justify-center">
              <div className="flex-1 h-[1px] relative overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-r from-transparent to-stone-300 dark:to-[#262A34]`} />
              </div>
              <div className="mx-4 flex items-center gap-2 text-stone-400 dark:text-[#9296A2]/50 font-mono text-[10px]">
                <span className="text-[11px] text-emerald-500 dark:text-[#C6F36B]">✦</span>
                <span className="text-[11px] text-emerald-500 dark:text-[#C6F36B]">✦</span>
              </div>
              <div className="flex-1 h-[1px] relative overflow-hidden">
                <div className={`w-full h-full bg-gradient-to-l from-transparent to-stone-300 dark:to-[#262A34]`} />
              </div>
            </div>
          )}

          {variant === 'flow' && (
            <div className="relative w-full max-w-7xl mx-auto px-6">
              <div className="relative h-[1.5px] w-full rounded-full overflow-hidden bg-stone-200/50 dark:bg-[#1E222B]/60">
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/25 dark:via-[#C6F36B]/30 to-transparent`} />
                <motion.div
                  animate={{
                    x: ['-40%', '40%', '-40%'],
                    opacity: [0.4, 0.85, 0.4],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-y-0 w-3/4 left-1/8 bg-gradient-to-r from-transparent via-[#C6F36B] to-transparent blur-[0.5px]"
                />
              </div>
            </div>
          )}

          {variant === 'glow-line' && (
            <div className="relative w-full max-w-7xl mx-auto px-6 flex items-center justify-center">
              <div className="relative w-full h-[1px]">
                <div className={`w-full h-full bg-gradient-to-r ${flavorGradients.line}`} />
                <motion.div
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ x: '100%', opacity: [0, 0.8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className={`absolute top-0 left-0 w-64 h-full bg-gradient-to-r ${flavorGradients.shimmer}`}
                />
              </div>
              <div className="absolute z-10 flex items-center justify-center p-1 rounded-full bg-[#FAF9F6] dark:bg-[#111318]">
                <div className={`w-2 h-2 rounded-full ${flavorGradients.dot}`} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

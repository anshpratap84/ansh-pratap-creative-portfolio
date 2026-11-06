import React from 'react';

interface MarqueeProps {
  text?: string;
  speed?: number;
}

export const Marquee: React.FC<MarqueeProps> = ({ text, speed = 30 }) => {
  const defaultWords = [
    { text: 'CREATE', isAccent: true },
    { text: 'EDIT', isAccent: false },
    { text: 'EXPERIMENT', isAccent: true },
    { text: 'DESIGN', isAccent: false },
    { text: 'IMAGINE', isAccent: true },
    { text: 'REPEAT', isAccent: false },
  ];

  const words = text
    ? text
        .split('·')
        .map((w) => w.trim())
        .filter(Boolean)
        .map((w, idx) => ({
          text: w,
          isAccent: idx % 2 === 0,
        }))
    : defaultWords;

  return (
    <div
      className="py-4 overflow-hidden border-y border-stone-200 dark:border-[#262A34] bg-stone-100/80 dark:bg-[#111318] relative select-none transition-colors"
      aria-hidden="true"
    >
      <div
        className="animate-marquee flex items-center gap-8 whitespace-nowrap"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 shrink-0">
            {words.map((item, idx) => (
              <React.Fragment key={`${i}-${idx}`}>
                <span
                  className={`text-base sm:text-lg md:text-xl font-black font-display tracking-widest ${
                    item.isAccent
                      ? 'text-emerald-600 dark:text-[#C6F36B]'
                      : 'text-stone-900 dark:text-[#F3F1EA]'
                  }`}
                >
                  {item.text}
                </span>
                <span className="text-stone-400 dark:text-[#9296A2]/50 text-xs font-mono">✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

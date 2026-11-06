import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    category: 'Turnaround & Delivery',
    question: 'What is your typical turnaround time for short-form video projects?',
    answer:
      'For standard Reels and YouTube Shorts (30–60 seconds), turnaround is typically 24 to 48 hours from footage handover. For multi-video batch packages or complex visual storytelling with custom motion titles, delivery timelines are agreed upon upfront during initial project scoping.',
  },
  {
    category: 'Asset Transfer',
    question: 'How do we share raw footage, assets, and project briefs?',
    answer:
      'We use high-speed cloud storage links such as Google Drive, Dropbox, WeTransfer, or Frame.io. You can simply share a folder link containing your raw video clips, b-roll, voiceovers, soundtrack preferences, and brand logos.',
  },
  {
    category: 'Editing Suite',
    question: 'Which creative software and editing tools do you specialize in?',
    answer:
      'My primary video editing pipeline centers on Adobe Premiere Pro and CapCut for frame-accurate rhythm cuts, beat-synced audio, and vertical mobile optimization. For still imagery, color grading, and thumbnail design, I use Adobe Lightroom, Figma, and Canva, coupled with Google Gemini for GenAI ideation.',
  },
  {
    category: 'Revisions',
    question: 'How do revisions and creative refinements work?',
    answer:
      'Every project includes two complimentary rounds of creative revisions to fine-tune pacing, caption typography, sound design, and color grading. Additional iterations or major storyboard pivots can be accommodated seamlessly as needed.',
  },
  {
    category: 'Pricing & Terms',
    question: 'How are project pricing, budgets, and milestones structured?',
    answer:
      'I offer transparent, creator-friendly rates tailored to either single project deliverables or recurring weekly/monthly creator retainers. Milestones and scope are confirmed before production starts, with secure payment methods supported.',
  },
  {
    category: 'Generative AI',
    question: 'Can you assist with Generative AI imagery and concept art pipelines?',
    answer:
      'Yes! Through certified prompt engineering and multimodal AI workflows, I craft bespoke concept art, stylistic backdrops for thumbnails, and experimental video assets tailored to your brand aesthetic.',
  },
];

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    soundManager.playClick();
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="mt-20 pt-16 border-t border-stone-200 dark:border-[#262A34]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-stone-950 dark:text-[#F3F1EA] font-display">
            Services & Workflow Inquiries.
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 dark:text-[#9296A2] max-w-md font-normal leading-relaxed">
          Quick answers to common questions about timeline pacing, file delivery, revision policies, and creative collaboration.
        </p>
      </div>

      {/* Accordion Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {FAQ_ITEMS.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                isOpen
                  ? 'bg-white dark:bg-[#1B1E26] border-emerald-500/60 dark:border-[#C6F36B]/60 shadow-md ring-1 ring-emerald-500/20 dark:ring-[#C6F36B]/20'
                  : 'bg-white/70 dark:bg-[#1B1E26]/60 border-stone-200 dark:border-[#262A34] hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <button
                onClick={() => toggleItem(idx)}
                aria-expanded={isOpen}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-emerald-600 dark:text-[#C6F36B] mb-1 font-semibold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.category}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-stone-950 dark:text-[#F3F1EA] font-display leading-snug">
                    {item.question}
                  </h4>
                </div>

                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'bg-emerald-400 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318] rotate-180'
                      : 'bg-stone-100 dark:bg-[#111318] text-stone-600 dark:text-[#9296A2]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-1 text-xs sm:text-sm text-stone-600 dark:text-[#F3F1EA]/85 font-normal leading-relaxed border-t border-stone-100 dark:border-[#262A34]/60">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

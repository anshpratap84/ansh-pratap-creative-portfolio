import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, Film, Palette, Sparkles } from 'lucide-react';

interface ServicesProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenInquiry }) => {
  const serviceCategories = [
    {
      id: 'video-editing',
      number: '01',
      icon: Film,
      title: 'Video Editing & Visual Storytelling',
      tagline: 'Short-Form Narrative, Reels & Commercial Pacing',
      description:
        'Crafting high-retention video content for Instagram Reels, YouTube Shorts, and brand campaigns. Every cut is synchronized to rhythm, emotional beats, and storytelling clarity.',
      deliverables: [
        'Short-form Reels & YouTube Shorts editing',
        'Timeline sequencing & beat-sync cutting',
        'Motion graphic titles and dynamic captions',
        'Audio leveling, sound design & music synchronization',
        '9:16 mobile format optimization and pacing',
      ],
      idealFor: 'Creators, agencies, and brands requiring engaging, punchy short-form video assets.',
    },
    {
      id: 'graphic-design',
      number: '02',
      icon: Palette,
      title: 'Graphic Design & Visual Communication',
      tagline: 'Digital Brand Identity, Social Creatives & Editorial Layouts',
      description:
        'Designing distinctive social media graphics, high-CTR YouTube thumbnails, promotional banners, and visual identities that capture attention in crowded digital spaces.',
      deliverables: [
        'High-converting YouTube thumbnail design',
        'Social media carousels and static creatives',
        'Header banners, promo flyers & digital posters',
        'Photo retouching & Adobe Lightroom color grading',
        'Consistent typography & brand design language',
      ],
      idealFor: 'YouTubers, entrepreneurs, and brands seeking modern, high-converting visual design.',
    },
    {
      id: 'genai-creative',
      number: '03',
      icon: Sparkles,
      title: 'Generative AI & Creative Technology',
      tagline: 'Multimodal Synthesis, Prompt Engineering & Concept Art',
      description:
        'Leveraging state-of-the-art Generative AI models and prompt engineering to produce bespoke concept visuals, AI-assisted video pipelines, and experimental digital imagery.',
      deliverables: [
        'Text-to-image concept visual synthesis',
        'Custom prompt engineering & style exploration',
        'AI image editing, composition & upscaling',
        'Creative AI video generation & motion ideation',
        'Modern creative AI workflow integration',
      ],
      idealFor: 'Creative teams, startups, and clients exploring cutting-edge AI-assisted visual production.',
    },
  ];

  return (
    <section id="services" className="py-24 relative bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-[#C6F36B] mb-2 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B]" />
              <span>04 / SERVICES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950 dark:text-[#FFFFFF] font-display">
              Creative Capabilities & Deliverables.
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-[#9296A2] max-w-md font-normal leading-relaxed">
            Collaborating with brands, creators, and agencies across three dedicated creative disciplines.
          </p>
        </motion.div>

        {/* Pricing Transparency Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-[#F3F1EA]/90">
              <strong className="text-emerald-700 dark:text-[#C6F36B] font-semibold">Creator-friendly rates tailored to your project scope.</strong>{' '}
              Clear milestones, prompt delivery, and transparent communication.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onOpenInquiry('Custom Creative Project')}
            className="px-5 py-2.5 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shrink-0 cursor-pointer uppercase tracking-wider active:scale-95 shadow-sm"
          >
            Discuss a Project
          </motion.button>
        </motion.div>

        {/* 3 Clean Editorial Service Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {serviceCategories.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] p-7 flex flex-col justify-between hover:border-emerald-500/50 dark:hover:border-[#C6F36B]/50 transition-all duration-300 group shadow-md"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono text-emerald-600 dark:text-[#C6F36B] font-bold">
                      CATEGORY {service.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-stone-100 dark:bg-[#111318] border border-stone-200 dark:border-[#262A34] flex items-center justify-center text-emerald-600 dark:text-[#C6F36B] group-hover:scale-105 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-stone-950 dark:text-[#FFFFFF] font-display mb-2 group-hover:text-emerald-600 dark:group-hover:text-[#C6F36B] transition-colors">
                    {service.title}
                  </h3>

                  <div className="text-xs font-mono text-stone-500 dark:text-[#9296A2] mb-4">
                    {service.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-[#F3F1EA]/80 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2.5 mb-7">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-[#9296A2]">
                      Key Deliverables:
                    </div>
                    {service.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 text-xs text-stone-600 dark:text-[#9296A2]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="pt-5 border-t border-stone-200 dark:border-[#262A34]">
                  <button
                    onClick={() => onOpenInquiry(service.title)}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-xs font-semibold text-stone-900 dark:text-[#FFFFFF] bg-stone-100 dark:bg-[#111318] hover:bg-emerald-400 dark:hover:bg-[#C6F36B] hover:text-stone-950 dark:hover:text-[#111318] rounded-xl transition-all cursor-pointer group/btn"
                  >
                    <span>Request This Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B] group-hover/btn:text-stone-950 dark:group-hover/btn:text-[#111318] transition-colors" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

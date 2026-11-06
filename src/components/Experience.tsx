import React from 'react';
import { Calendar, MapPin, CheckCircle2, Award, FileText, Play, ExternalLink } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

interface ExperienceProps {
  onSelectCertificate: (certId: string) => void;
  onPlayVideo?: () => void;
}

export const Experience: React.FC<ExperienceProps> = ({ onSelectCertificate, onPlayVideo }) => {
  return (
    <section id="experience" className="py-24 relative border-t border-stone-200 dark:border-[#262A34] bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-600 dark:text-[#C6F36B] uppercase mb-2 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B]" />
              <span>06 / EXPERIENCE & INTERNSHIPS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950 dark:text-[#F3F1EA] font-display">
              Professional Fieldwork & Experience.
            </h2>
          </div>
          <p className="text-sm text-stone-600 dark:text-[#9296A2] max-w-md font-normal leading-relaxed">
            Documented video editing internships and industrial AI training programs combining creative storytelling and modern technology.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l border-stone-300 dark:border-[#262A34] ml-4 md:ml-8 pl-6 md:pl-10 space-y-12">
          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] md:-left-[47px] top-2.5 w-3.5 h-3.5 rounded-full bg-white dark:bg-[#111318] border-2 border-emerald-500 dark:border-[#C6F36B] group-hover:scale-125 transition-transform" />

              {/* Card Container */}
              <div className="rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] p-6 md:p-8 hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all duration-300 shadow-md">
                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="text-xs font-mono text-emerald-700 dark:text-[#C6F36B] flex items-center gap-1.5 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.duration}</span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-[#9296A2] flex items-center gap-1.5 font-mono">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{exp.location}</span>
                  </div>
                </div>

                {/* Role & Org */}
                <h3 className="text-xl md:text-2xl font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-1">
                  {exp.role}
                </h3>
                <div className="text-sm font-semibold text-stone-700 dark:text-[#F3F1EA]/80 mb-4 font-mono">
                  {exp.organization}
                </div>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-[#F3F1EA]/85 leading-relaxed mb-6 font-normal">
                  {exp.description}
                </p>

                {/* Highlights */}
                <div className="space-y-2.5 mb-6 text-xs text-stone-600 dark:text-[#9296A2]">
                  {exp.keyHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Attached Document Badges / Quick Actions */}
                {exp.id === 'exp-istudio' && (
                  <div className="pt-5 border-t border-stone-200 dark:border-[#262A34] flex flex-wrap items-center gap-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-[#9296A2] mr-2">
                      VERIFIED DELIVERABLES & CREDENTIALS:
                    </span>

                    {onPlayVideo && (
                      <button
                        onClick={onPlayVideo}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-lg transition-colors cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Watch Cyberbullying Awareness Video</span>
                      </button>
                    )}

                    <a
                      href="/assets/aistudio/ANSH_PRATAP_-_Video_Editing_Internship_-_Internship_56aebe83.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-800 dark:text-[#F3F1EA] hover:text-emerald-700 dark:hover:text-[#C6F36B] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] rounded-lg transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B]" />
                      <span>Internship Document (ISVEI2342266)</span>
                      <ExternalLink className="w-3 h-3 text-stone-400 dark:text-[#9296A2]" />
                    </a>

                    <a
                      href="/assets/aistudio/ANSH_PRATAP_-_Video_Editing_Internship_-_Training_a0c20824.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-800 dark:text-[#F3F1EA] hover:text-emerald-700 dark:hover:text-[#C6F36B] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] rounded-lg transition-colors"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-[#C6F36B]" />
                      <span>Training Document (ISVET2342266)</span>
                      <ExternalLink className="w-3 h-3 text-stone-400 dark:text-[#9296A2]" />
                    </a>

                    <a
                      href="/assets/aistudio/ANSH_PRATAP_-_Video_Editing_Internship_-_Offer_Letter_03f92ef2.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-600 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-[#F3F1EA] bg-stone-100 dark:bg-[#111318] border border-stone-200 dark:border-[#262A34] rounded-lg transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-stone-400 dark:text-[#9296A2]" />
                      <span>Offer Letter</span>
                    </a>
                  </div>
                )}

                {exp.id === 'exp-cttc' && (
                  <div className="pt-5 border-t border-stone-200 dark:border-[#262A34] flex flex-wrap items-center gap-2.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-[#9296A2] mr-2">
                      VERIFIED CREDENTIALS:
                    </span>
                    <button
                      onClick={() => onSelectCertificate('cttc-training')}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-lg transition-colors cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Training Certificate #4441826</span>
                    </button>
                    <a
                      href="/assets/aistudio/Ansh_Pratap_1479331_0c1b6c6d.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-stone-800 dark:text-[#F3F1EA] hover:text-emerald-700 dark:hover:text-[#C6F36B] bg-stone-100 dark:bg-[#111318] hover:bg-stone-200 dark:hover:bg-[#262A34] border border-stone-300 dark:border-[#262A34] rounded-lg transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-stone-400 dark:text-[#9296A2]" />
                      <span>CTTC Endorsement Document</span>
                      <ExternalLink className="w-3 h-3 text-stone-400 dark:text-[#9296A2]" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

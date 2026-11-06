import React from 'react';
import { ArrowUp, Mail, Linkedin, Github, Download } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { soundManager } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    soundManager.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-stone-200 dark:border-[#262A34] bg-stone-100 dark:bg-[#111318] py-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-stone-200 dark:border-[#262A34]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-7 h-7 rounded-lg bg-white dark:bg-[#1B1E26] border border-stone-300 dark:border-[#C6F36B]/30 flex items-center justify-center text-[11px] font-mono font-bold text-stone-900 dark:text-[#C6F36B] shadow-sm">
                AP
              </span>
              <span className="text-xl font-black font-display text-stone-950 dark:text-[#F3F1EA] tracking-tight">
                ANSH PRATAP<span className="text-emerald-600 dark:text-[#C6F36B]">®</span>
              </span>
            </div>
            <p className="text-xs text-stone-600 dark:text-[#9296A2] max-w-sm font-normal leading-relaxed">
              Creative Content Creator · Video Editor · Visual Storytelling · Generative AI
            </p>
          </div>

          {/* Clean 1-line Navigation links */}
          <nav className="flex flex-wrap items-center gap-6 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2]">
            <a href="#about" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              About
            </a>
            <a href="#projects" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              Work
            </a>
            <a href="#services" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              Services
            </a>
            <a href="#toolkit" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              Toolkit
            </a>
            <a href="#experience" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              Experience
            </a>
            <a href="#credentials" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              Credentials
            </a>
            <a href="#contact" className="hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions: Download Resume Button, Social Icons & Back to top */}
          <div className="flex flex-wrap items-center gap-3">
            {/* The primary Download Resume Button */}
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Ansh_Pratap_Resume.pdf"
              onClick={() => soundManager.playClick()}
              data-cursor="view"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-[#1B1E26] hover:bg-emerald-400 dark:hover:bg-[#C6F36B] text-stone-900 dark:text-[#F3F1EA] hover:text-stone-950 dark:hover:text-[#111318] border border-stone-300 dark:border-[#262A34] hover:border-emerald-500 dark:hover:border-[#C6F36B] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Resume</span>
            </a>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              aria-label="Email Ansh Pratap"
              className="p-2.5 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] text-stone-600 dark:text-[#9296A2] hover:text-emerald-600 dark:hover:text-[#C6F36B] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-colors shadow-sm"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ansh Pratap LinkedIn"
              className="p-2.5 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] text-stone-600 dark:text-[#9296A2] hover:text-emerald-600 dark:hover:text-[#C6F36B] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-colors shadow-sm"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ansh Pratap GitHub"
              className="p-2.5 rounded-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] text-stone-600 dark:text-[#9296A2] hover:text-emerald-600 dark:hover:text-[#C6F36B] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-colors shadow-sm"
            >
              <Github className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="p-2.5 rounded-xl bg-emerald-400 dark:bg-[#C6F36B] text-stone-950 dark:text-[#111318] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] transition-all cursor-pointer ml-1 active:scale-95 shadow-sm"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Bottom row: Clean copyright and location */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-stone-500 dark:text-[#9296A2]">
          <div>
            © {currentYear} ANSH PRATAP · CREATIVE PORTFOLIO
          </div>

          <div className="text-emerald-700 dark:text-[#C6F36B] font-semibold">
            "CREATING VISUALS. BUILDING EXPERIENCES."
          </div>

          <div>
            Chittorgarh, Rajasthan, India
          </div>
        </div>
      </div>
    </footer>
  );
};

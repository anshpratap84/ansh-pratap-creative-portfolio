import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenInquiry: (serviceName?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#projects' },
    { label: 'Services', href: '#services' },
    { label: 'Toolkit', href: '#toolkit' },
    { label: 'Experience', href: '#experience' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF9F6]/90 dark:bg-[#111318]/95 backdrop-blur-md border-b border-stone-200 dark:border-[#262A34] py-3.5 shadow-md dark:shadow-lg dark:shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className="group text-lg md:text-xl font-black tracking-tight text-stone-950 dark:text-[#F3F1EA] hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors whitespace-nowrap shrink-0 font-display flex items-center gap-2.5"
        >
          <span className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-[#1B1E26] border border-stone-300 dark:border-[#C6F36B]/30 flex items-center justify-center text-xs font-mono font-bold text-stone-900 dark:text-[#C6F36B] group-hover:scale-105 transition-transform shadow-sm">
            AP
          </span>
          <span className="font-bold tracking-tight">
            ANSH PRATAP<span className="text-emerald-600 dark:text-[#C6F36B]">®</span>
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono font-semibold tracking-wider text-stone-500 dark:text-[#9296A2] border-l border-stone-300 dark:border-[#262A34] pl-2 uppercase">
            Creative Portfolio
          </span>
        </a>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-stone-950 dark:hover:text-[#C6F36B] transition-colors whitespace-nowrap shrink-0 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-emerald-600 dark:after:bg-[#C6F36B] hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Actions (Theme Toggle + CTA) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Light / Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2.5 rounded-xl border border-stone-300 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-[#C6F36B] hover:border-stone-400 dark:hover:border-[#C6F36B]/40 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#C6F36B] animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-stone-800 animate-in spin-in-180 duration-300" />
            )}
          </button>

          <button
            onClick={() => onOpenInquiry('General Creative Inquiry')}
            className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
          >
            <span>Let's Collaborate</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        </div>

        {/* Mobile Menu & Theme Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-stone-300 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] text-stone-700 dark:text-stone-300 shadow-sm"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-[#C6F36B]" />
            ) : (
              <Moon className="w-4 h-4 text-stone-800" />
            )}
          </button>

          <button
            onClick={() => onOpenInquiry('General Creative Inquiry')}
            className="sm:hidden px-3 py-1.5 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] rounded-lg"
          >
            Hire
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 dark:text-[#F3F1EA] hover:text-stone-950 dark:hover:text-[#C6F36B] rounded-lg border border-stone-300 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF9F6] dark:bg-[#111318] border-b border-stone-200 dark:border-[#262A34] px-6 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-mono uppercase tracking-wider text-stone-800 dark:text-[#F3F1EA] hover:text-emerald-600 dark:hover:text-[#C6F36B] py-2.5 border-b border-stone-200 dark:border-[#262A34] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry('General Creative Inquiry');
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] rounded-xl hover:bg-emerald-300 dark:hover:bg-[#d5faa0] transition-colors shadow-md"
              >
                <span>Let's Collaborate</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

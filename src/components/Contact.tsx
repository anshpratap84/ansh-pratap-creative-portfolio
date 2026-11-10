import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, MapPin, Send, CheckCircle2, Copy, Check, Sparkles, ArrowUpRight, Download } from 'lucide-react';
import { PERSONAL_INFO, SERVICES } from '../data/portfolioData';
import { FAQAccordion } from './FAQAccordion';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Short-Form Video Editing');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('Flexible / Let\'s discuss');
  const [referenceLink, setReferenceLink] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 500);
  };

  const handleLaunchEmailClient = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${service} - ${name}`);
    const body = encodeURIComponent(
      `Hi Ansh,\n\nI came across your creative portfolio and would like to collaborate.\n\nName: ${name}\nEmail: ${email}\nSelected Service: ${service}\nBudget Expectation: ${budget}\nReference Link: ${referenceLink || 'None'}\n\nProject Details:\n${description}\n\nBest regards,\n${name}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 relative bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-[#C6F36B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Narrative & Direct Links */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-600 dark:text-[#C6F36B] uppercase mb-3 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B]" />
                <span>08 / LET'S CONNECT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-950 dark:text-[#F3F1EA] font-display mb-4">
                Let's Build Something Together.
              </h2>
              <p className="text-base text-stone-600 dark:text-[#9296A2] font-normal leading-relaxed mb-8">
                Have an idea for a short-form video, visual story, digital asset, or creative AI production? Let's bring it to life. Open for freelance commissions, agency contracts, and creative collaborations.
              </p>

              {/* Direct Info List */}
              <div className="space-y-4 mb-8">
                {/* Email with 1-click copy */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B]">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-500 dark:text-[#9296A2] font-mono uppercase tracking-wider">DIRECT INBOX</div>
                      <a
                        href={`mailto:${PERSONAL_INFO.email}`}
                        className="text-sm font-semibold text-stone-900 dark:text-[#F3F1EA] hover:text-emerald-600 dark:hover:text-[#C6F36B] transition-colors"
                      >
                        {PERSONAL_INFO.email}
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-stone-500 dark:text-[#9296A2] hover:text-emerald-600 dark:hover:text-[#C6F36B] rounded-lg hover:bg-stone-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                    title="Copy Email Address"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] flex items-center gap-3 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 dark:text-[#9296A2] font-mono uppercase tracking-wider">LOCATION</div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-[#F3F1EA]">
                      {PERSONAL_INFO.location}
                    </div>
                  </div>
                </div>

                {/* Resume Download Card */}
                <div className="p-4 rounded-2xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B] shrink-0">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-500 dark:text-[#9296A2] font-mono uppercase tracking-wider">
                        CURRICULUM VITAE · PDF
                      </div>
                      <div className="text-sm font-semibold text-stone-900 dark:text-[#F3F1EA]">
                        Ansh Pratap Resume
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={PERSONAL_INFO.resumeUrl}
                      download="Ansh_Pratap_Resume.pdf"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-sm active:scale-95"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                    <a
                      href={PERSONAL_INFO.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono text-stone-600 dark:text-[#9296A2] hover:text-stone-950 dark:hover:text-[#F3F1EA] bg-stone-100 dark:bg-[#111318] rounded-xl border border-stone-200 dark:border-[#262A34] transition-colors"
                      title="Open in new tab"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Platforms */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-[#F3F1EA] hover:text-stone-950 dark:hover:text-[#111318] bg-white dark:bg-[#1B1E26] hover:bg-emerald-400 dark:hover:bg-[#C6F36B] rounded-xl border border-stone-300 dark:border-[#262A34] hover:border-emerald-500 dark:hover:border-[#C6F36B] transition-all shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-stone-800 dark:text-[#F3F1EA] hover:text-stone-950 dark:hover:text-[#111318] bg-white dark:bg-[#1B1E26] hover:bg-emerald-400 dark:hover:bg-[#C6F36B] rounded-xl border border-stone-300 dark:border-[#262A34] hover:border-emerald-500 dark:hover:border-[#C6F36B] transition-all shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-200 dark:border-[#262A34] text-xs text-stone-500 dark:text-[#9296A2] font-mono">
              * Dedicated freelance response within 24 hours. Affordable, creator-friendly rates for brands, creators, and agencies.
            </div>
          </motion.div>

          {/* Right Column: Working Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="p-8 md:p-10 rounded-2xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] shadow-xl relative">
              {isSubmitted ? (
                <div className="py-12 text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B] mb-5">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-2">
                    Message Prepared!
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-[#9296A2] mb-8 max-w-md leading-relaxed">
                    Thank you, <strong className="text-stone-900 dark:text-[#F3F1EA]">{name}</strong>. Your project details for{' '}
                    <span className="text-emerald-700 dark:text-[#C6F36B] font-mono font-semibold">{service}</span> have been formatted.
                    Click below to open your email client and send directly to Ansh:
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                    <button
                      onClick={handleLaunchEmailClient}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-stone-950 dark:text-[#111318]" />
                      <span>Send via Email Client</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setName('');
                        setEmail('');
                        setDescription('');
                        setReferenceLink('');
                      }}
                      className="px-6 py-4 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] hover:text-stone-950 dark:hover:text-[#F3F1EA] bg-stone-100 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl transition-colors cursor-pointer"
                    >
                      Reset Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-[#C6F36B] uppercase tracking-wider mb-2 font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Project Inquiry & Brief</span>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="alex@brand.com"
                        className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                      Service of Interest
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-[#F3F1EA] focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title} ({s.category})
                        </option>
                      ))}
                      <option value="Custom Creative Collaboration">
                        Custom Creative Collaboration
                      </option>
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] font-medium">
                        Project Brief *
                      </label>
                      <span className="text-[11px] text-stone-400 dark:text-[#9296A2]/60 font-mono">
                        {description.length} chars
                      </span>
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Tell me about what you are looking to create, any deadlines, mood/style preferences, or key deliverables..."
                      className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl p-4 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                    />
                  </div>

                  {/* Budget & Reference Link */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                        Budget Range (Optional)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-[#F3F1EA] focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                      >
                        <option value="Affordable / Starter ($20 - $70 / ₹1,500 - ₹5,000)">
                          Affordable / Starter ($20 - $70 / ₹1,500 - ₹5,000)
                        </option>
                        <option value="Standard Production ($70 - $200 / ₹5,000 - ₹15,000)">
                          Standard Production ($70 - $200 / ₹5,000 - ₹15,000)
                        </option>
                        <option value="Full Creative Package">Full Creative Package</option>
                        <option value="Flexible / Let's discuss">Flexible / Let's discuss</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                        Reference Link (Optional)
                      </label>
                      <input
                        type="url"
                        value={referenceLink}
                        onChange={(e) => setReferenceLink(e.target.value)}
                        placeholder="https://drive.google.com/..."
                        className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-3 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      <Send className="w-4 h-4 text-stone-950 dark:text-[#111318]" />
                      <span>{isSubmitting ? 'Transmitting Request...' : 'Send Project Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Interactive Services & Workflow FAQ Accordion */}
        <FAQAccordion />
      </div>
    </section>
  );
};

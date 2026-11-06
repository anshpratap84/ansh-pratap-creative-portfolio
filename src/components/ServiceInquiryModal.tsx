import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { SERVICES, PERSONAL_INFO } from '../data/portfolioData';

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ServiceInquiryModal: React.FC<ServiceInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const [selectedService, setSelectedService] = useState(
    defaultService || SERVICES[0].title
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [budgetRange, setBudgetRange] = useState('Flexible / To discuss');
  const [referenceLink, setReferenceLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 500);
  };

  const handleSendViaEmailClient = () => {
    const subject = encodeURIComponent(`Creative Service Inquiry: ${selectedService} - ${name}`);
    const body = encodeURIComponent(
      `Hello Ansh,\n\nI am interested in your creative service: ${selectedService}.\n\nName: ${name}\nEmail: ${email}\nBudget Expectation: ${budgetRange}\nReference/Idea Link: ${referenceLink || 'None'}\n\nProject Overview:\n${description}\n\nLooking forward to hearing from you!`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-xl bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] rounded-2xl overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-200 dark:border-[#262A34] bg-stone-50 dark:bg-[#111318]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-[#F3F1EA] font-display">
                Request a Creative Service
              </h3>
              <p className="text-xs text-stone-500 dark:text-[#9296A2]">
                Discuss your idea & find a budget-friendly creative solution
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-500 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200 dark:hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isSuccess ? (
          <div className="p-8 text-center flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 dark:bg-[#C6F36B]/10 border border-emerald-500/30 dark:border-[#C6F36B]/30 flex items-center justify-center text-emerald-600 dark:text-[#C6F36B] mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-2">
              Inquiry Prepared!
            </h4>
            <p className="text-sm text-stone-600 dark:text-[#9296A2] mb-6 max-w-sm leading-relaxed">
              Thank you, <span className="text-stone-900 dark:text-[#F3F1EA] font-medium">{name}</span>! Your inquiry for{' '}
              <span className="text-emerald-700 dark:text-[#C6F36B] font-medium">{selectedService}</span> has been logged.
              You can also send it directly to Ansh's inbox now:
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={handleSendViaEmailClient}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
                <span>Open in Email App ({PERSONAL_INFO.email})</span>
              </button>

              <button
                onClick={onClose}
                className="px-5 py-3 text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-white bg-stone-100 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Service Selection */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                Desired Creative Service
              </label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-[#F3F1EA] focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.title}>
                    {s.title} ({s.category})
                  </option>
                ))}
                <option value="Custom Creative Request">Custom Creative Request</option>
              </select>
            </div>

            {/* Name & Email */}
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
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
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
                  placeholder="name@company.com"
                  className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                />
              </div>
            </div>

            {/* Project Overview */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                Describe Your Project / Requirement *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Share a brief overview of what you would like created (e.g. video style, length, image concept, or asset needs)..."
                className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl p-4 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
              />
            </div>

            {/* Budget & Reference Link */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-stone-600 dark:text-[#9296A2] mb-1.5 font-medium">
                  Budget Expectation
                </label>
                <select
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-[#F3F1EA] focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                >
                  <option value="Affordable / Starter ($20 - $70 / ₹1,500 - ₹5,000)">
                    Affordable / Starter
                  </option>
                  <option value="Moderate Project ($70 - $200 / ₹5,000 - ₹15,000)">
                    Moderate Project
                  </option>
                  <option value="Full Campaign / Custom">Full Campaign / Custom</option>
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
                  className="w-full bg-stone-50 dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-[#F3F1EA] placeholder:text-stone-400 dark:placeholder:text-[#9296A2]/40 focus:outline-none focus:border-emerald-500 dark:focus:border-[#C6F36B] transition-colors"
                />
              </div>
            </div>

            {/* Note on affordable rates */}
            <p className="text-[11px] text-stone-500 dark:text-[#9296A2] italic font-mono">
              * Affordable pricing based on your requirements. Let's discuss your idea and find a budget-friendly creative solution.
            </p>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
                <span>{isSubmitting ? 'Sending Request...' : 'Submit Creative Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

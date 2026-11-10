import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Eye, Download, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';
import { CertificationItem } from '../types/portfolio';
import { CertificateLightbox } from './CertificateLightbox';

interface CertificationsProps {
  selectedCertId?: string | null;
  onClearSelectedCert?: () => void;
}

export const Certifications: React.FC<CertificationsProps> = ({
  selectedCertId,
  onClearSelectedCert,
}) => {
  const [activeCert, setActiveCert] = useState<CertificationItem | null>(() => {
    if (selectedCertId) {
      return CERTIFICATIONS.find((c) => c.id === selectedCertId) || null;
    }
    return null;
  });

  // Watch prop changes
  React.useEffect(() => {
    if (selectedCertId) {
      const found = CERTIFICATIONS.find((c) => c.id === selectedCertId);
      if (found) setActiveCert(found);
    }
  }, [selectedCertId]);

  const handleClose = () => {
    setActiveCert(null);
    if (onClearSelectedCert) onClearSelectedCert();
  };

  return (
    <section id="credentials" className="py-24 relative bg-[#FAF9F6] dark:bg-[#111318] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <div className="text-xs font-mono tracking-widest text-emerald-600 dark:text-[#C6F36B] uppercase mb-2 font-bold flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#C6F36B]" />
              <span>07 / CREDENTIALS & CERTIFICATIONS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-stone-950 dark:text-[#F3F1EA] font-display">
              Verified Industry Specializations.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-stone-600 dark:text-[#9296A2]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B]" />
            <span>6 VERIFIED INDUSTRY SPECIALIZATIONS</span>
          </div>
        </motion.div>

        {/* 6 Verified Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="rounded-2xl border border-stone-200 dark:border-[#262A34] bg-white dark:bg-[#1B1E26] p-6 sm:p-7 flex flex-col justify-between hover:border-emerald-500/40 dark:hover:border-[#C6F36B]/40 transition-all duration-300 group shadow-md"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-start justify-between gap-2 text-xs text-stone-500 dark:text-[#9296A2] mb-3">
                  <span className="font-mono text-emerald-700 dark:text-[#C6F36B] font-semibold">{cert.issuer}</span>
                  <span className="font-mono text-[11px] shrink-0 text-stone-500 dark:text-[#9296A2]">{cert.date}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-stone-950 dark:text-[#F3F1EA] font-display mb-2 group-hover:text-emerald-600 dark:group-hover:text-[#C6F36B] transition-colors leading-snug">
                  {cert.title}
                </h3>

                {/* Credential type badge */}
                <div className="text-xs text-emerald-700 dark:text-[#C6F36B] mb-3 flex items-center gap-1.5 font-mono">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-600 dark:text-[#C6F36B]" />
                  <span>{cert.credentialType}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-stone-600 dark:text-[#9296A2] leading-relaxed mb-6 font-normal">
                  {cert.description}
                </p>

                {cert.credentialNumber && (
                  <div className="text-[11px] font-mono text-stone-500 dark:text-[#9296A2] mb-4 truncate">
                    ID: {cert.credentialNumber}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="pt-4 border-t border-stone-200 dark:border-[#262A34] flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveCert(cert)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-lg transition-colors cursor-pointer active:scale-95 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
                  <span>View Certificate</span>
                </button>

                <div className="flex items-center gap-1">
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Verify Credential Online"
                      className="p-2 text-stone-500 dark:text-[#9296A2] hover:text-emerald-600 dark:hover:text-[#C6F36B] rounded-lg hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <a
                    href={cert.assetPath}
                    download
                    title="Download Certificate File"
                    className="p-2 text-stone-500 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-[#F3F1EA] rounded-lg hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <CertificateLightbox certificate={activeCert} onClose={handleClose} />
    </section>
  );
};

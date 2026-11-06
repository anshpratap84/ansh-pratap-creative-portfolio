import React, { useEffect } from 'react';
import { X, ExternalLink, Download, CheckCircle2 } from 'lucide-react';
import { CertificationItem } from '../types/portfolio';

interface CertificateLightboxProps {
  certificate: CertificationItem | null;
  onClose: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({
  certificate,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (certificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#1B1E26] border border-stone-200 dark:border-[#262A34] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-[#262A34] bg-stone-50 dark:bg-[#111318]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-[#C6F36B] mb-0.5 font-semibold">
              <span>{certificate.issuer}</span>
              <span aria-hidden="true" className="text-stone-400 dark:text-[#9296A2]">·</span>
              <span className="text-stone-500 dark:text-[#9296A2]">{certificate.date}</span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-[#F3F1EA] font-display">
              {certificate.title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5">
            {certificate.verificationUrl && (
              <a
                href={certificate.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-stone-700 dark:text-[#F3F1EA] hover:text-emerald-600 dark:hover:text-[#C6F36B] bg-white dark:bg-[#111318] border border-stone-300 dark:border-[#262A34] rounded-lg transition-colors"
              >
                <span>Verify Online</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={certificate.assetPath}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-stone-950 dark:text-[#111318] bg-emerald-400 dark:bg-[#C6F36B] hover:bg-emerald-300 dark:hover:bg-[#d5faa0] rounded-lg transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-stone-950 dark:text-[#111318]" />
              <span className="hidden sm:inline">Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 dark:text-[#9296A2] hover:text-stone-900 dark:hover:text-white rounded-lg hover:bg-stone-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close certificate viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Display Area */}
        <div className="flex-1 overflow-auto bg-stone-900/10 dark:bg-black/60 p-4 md:p-6 flex items-center justify-center min-h-[350px]">
          {certificate.assetType === 'image' ? (
            <img
              src={certificate.assetPath}
              alt={certificate.title}
              className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-stone-200 dark:border-[#262A34]"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-[65vh] flex flex-col items-center justify-center bg-stone-100 dark:bg-[#111318] rounded-xl border border-stone-200 dark:border-[#262A34] p-2 text-center">
              <iframe
                src={`${certificate.assetPath}#toolbar=0`}
                title={certificate.title}
                className="w-full h-full rounded-lg bg-white"
              />
            </div>
          )}
        </div>

        {/* Footer Details */}
        <div className="px-5 py-3.5 bg-stone-50 dark:bg-[#111318] border-t border-stone-200 dark:border-[#262A34] flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 dark:text-[#9296A2] font-mono">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-[#C6F36B]" />
            <span>
              {certificate.credentialType}
              {certificate.credentialNumber ? ` · ID: ${certificate.credentialNumber}` : ''}
            </span>
          </div>

          {certificate.verificationUrl && (
            <a
              href={certificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden text-emerald-600 dark:text-[#C6F36B] hover:underline flex items-center gap-1"
            >
              <span>Verify Online</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

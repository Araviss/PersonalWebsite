'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type ModalState = 'prompt' | 'downloading' | 'success' | 'error';

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * ResumeDownloadModal — Nintendo Switch-style download dialog
 * 
 * Theming: Uses CSS variables for dark/light mode support
 * - Modal bg: var(--surface-elevated)
 * - Text: var(--on-surface)
 * - Dividers: var(--separator)
 * - Accent/buttons: var(--color-accent)
 * 
 * States: prompt → downloading → success/error
 */
export function ResumeDownloadModal({ isOpen, onClose }: ResumeDownloadModalProps) {
  const [state, setState] = useState<ModalState>('prompt');

  const handleDownload = async () => {
    setState('downloading');
    
    try {
      // Simulate download with small delay for UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const link = document.createElement('a');
      link.href = '/Jzon_Livingston_Resume.pdf';
      link.download = 'Jzon_Livingston_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setState('success');
    } catch {
      setState('error');
    }
  };

  const handleClose = () => {
    onClose();
    setState('prompt');
  };

  const handleRetry = () => {
    setState('prompt');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/20"
            onClick={state === 'prompt' || state === 'error' ? handleClose : undefined}
            aria-hidden="true"
          />

          {/* Modal — uses theme CSS variables */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[580px] -translate-x-1/2 -translate-y-1/2"
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
          >
            <div className="overflow-hidden rounded-xl bg-surface-elevated shadow-lg">
              
              {/* === PROMPT STATE === */}
              {state === 'prompt' && (
                <>
                  {/* Text area */}
                  <div className="px-8 py-10">
                    <p id="resume-modal-title" className="text-[17px] leading-relaxed text-on-surface">
                      Download Jzon Livingston Jr.&apos;s resume as a PDF file to view work experience, skills, and education.
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-separator" />

                  {/* Button row */}
                  <div className="flex h-14 items-center justify-center">
                    <button
                      onClick={handleClose}
                      className="flex-1 h-full text-[17px] font-medium text-accent transition-colors hover:bg-black/5"
                    >
                      Cancel
                    </button>

                    <div className="h-full w-px bg-separator" />

                    <button
                      onClick={handleDownload}
                      className="flex-1 h-full text-[17px] font-medium text-accent transition-colors hover:bg-black/5"
                      autoFocus
                    >
                      Download
                    </button>
                  </div>
                </>
              )}

              {/* === DOWNLOADING STATE === */}
              {state === 'downloading' && (
                <>
                  <div className="flex flex-col items-center justify-center px-8 py-10">
                    <p className="mb-4 text-[17px] leading-relaxed text-on-surface">Please wait...</p>
                    {/* Switch-style spinner */}
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-separator border-t-accent" />
                  </div>

                  <div className="h-px bg-separator" />

                  <div className="flex h-14 items-center justify-center">
                    <button
                      onClick={handleClose}
                      className="h-full w-full text-[17px] font-medium text-accent transition-colors hover:bg-black/5"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}

              {/* === SUCCESS STATE === */}
              {state === 'success' && (
                <>
                  <div className="flex flex-col items-center justify-center px-8 py-10">
                    {/* Checkmark */}
                    <svg className="mb-4 h-10 w-10 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-[17px] leading-relaxed text-on-surface">Download complete!</p>
                  </div>

                  <div className="h-px bg-separator" />

                  <div className="flex h-14 items-center justify-center">
                    <button
                      onClick={handleClose}
                      className="h-full w-full text-[17px] font-medium text-accent transition-colors hover:bg-black/5"
                      autoFocus
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {/* === ERROR STATE === */}
              {state === 'error' && (
                <>
                  <div className="px-8 py-10">
                    <p className="text-[17px] leading-relaxed text-on-surface">
                      Unable to download the resume. Please check your connection and try again.
                    </p>
                  </div>

                  <div className="h-px bg-separator" />

                  <div className="flex h-14 items-center justify-center">
                    <button
                      onClick={handleClose}
                      className="flex-1 h-full text-[17px] font-medium text-accent transition-colors hover:bg-black/5"
                    >
                      Cancel
                    </button>

                    <div className="h-full w-px bg-separator" />

                    <button
                      onClick={handleRetry}
                      className="flex-1 h-full text-[17px] font-medium text-accent transition-colors hover:bg-black/5"
                      autoFocus
                    >
                      Retry
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

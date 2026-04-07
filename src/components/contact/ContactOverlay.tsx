'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContactOverlay } from '@/components/shared/ContactOverlayContext';
import { ContactSection } from '@/components/contact/ContactSection';

export function ContactOverlay() {
  const { isOpen, close } = useContactOverlay();

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute inset-0 z-50 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* Blurred backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={close}
            aria-hidden="true"
          />

          {/* Overlay content — fills the shell */}
          <motion.div
            className="relative z-10 flex flex-1 flex-col overflow-hidden"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ContactSection />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { launchOverlayVariants, launchTransition } from '@/lib/animations';

interface LaunchOverlayProps {
  isActive: boolean;
  projectTitle: string;
  onComplete: () => void;
}

export function LaunchOverlay({ isActive, projectTitle, onComplete }: LaunchOverlayProps) {
  const [phase, setPhase] = useState<'black' | 'logo' | 'done'>('black');

  useEffect(() => {
    if (!isActive) return;

    // black screen → show logo → complete
    const logoTimer = setTimeout(() => setPhase('logo'), 300);
    const doneTimer = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 800);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(doneTimer);
    };
  }, [isActive, onComplete]);

  return (
    <AnimatePresence>
      {isActive && phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-surface-deep"
          variants={launchOverlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="status"
          aria-label={`Launching ${projectTitle}`}
        >
          <AnimatePresence>
            {phase === 'logo' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={launchTransition}
                className="flex flex-col items-center gap-3"
              >
                <div className="h-20 w-20 rounded-tile bg-accent/20 flex items-center justify-center">
                  <span className="text-3xl font-bold text-accent">
                    {projectTitle.charAt(0)}
                  </span>
                </div>
                <span className="text-lg font-medium text-on-surface">
                  {projectTitle}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

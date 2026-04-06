'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { bootLogoVariants } from '@/lib/animations';

const NINTENDO_RED = '#F32013';
const WHITE = '#FFFFFF';
const BLACK = '#000000';

// Timing from frame-by-frame analysis (10fps, 80 frames)
const TIMING = {
  blackHold: 1200,    // frames 1–12
  redHold: 4500,      // frames 14–59
  fadeToWhite: 1200,  // frames 60–71
  whiteHold: 300,
};

// All measurements scaled from original 854×480 video to our rendered icon (107px tall)
// Icon rendered at: width=160px, height=107px
// Scale factor: 107/175 = 0.611
const TEXT = {
  gap_icon_to_top: 16,    // 26px * 0.611
  top: {
    // Replaces "Nintendo" — smaller line
    label: 'livingston',
    fontSize: 13,         // 21px * 0.611
    letterSpacing: '0.61em', // spans full icon width (160px) for 10 chars
  },
  gap_between: 6,         // 10px * 0.611
  bottom: {
    // Replaces "SWITCH" — larger line
    label: 'jzon',
    fontSize: 25,         // 41px * 0.611
    letterSpacing: '0.98em', // spans full icon width (160px) for 4 chars
  },
};

type Phase = 'black' | 'red' | 'white' | 'done';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [phase, setPhase] = useState<Phase>('black');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('red'), TIMING.blackHold);
    const t2 = setTimeout(() => setPhase('white'), TIMING.blackHold + TIMING.redHold);
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, TIMING.blackHold + TIMING.redHold + TIMING.fadeToWhite + TIMING.whiteHold);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  if (phase === 'done') return null;

  const bgColor = phase === 'black' ? BLACK : phase === 'red' ? NINTENDO_RED : WHITE;
  const bgTransition =
    phase === 'red'
      ? { duration: 0.08, ease: 'linear' as const }
      : phase === 'white'
        ? { duration: TIMING.fadeToWhite / 1000, ease: 'linear' as const }
        : { duration: 0 };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      animate={{ backgroundColor: bgColor }}
      transition={bgTransition}
      initial={{ backgroundColor: BLACK }}
    >
      <AnimatePresence>
        {phase === 'red' && (
          <motion.div
            className="flex flex-col items-center"
            variants={bootLogoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Image
              src="/switch-icon.png"
              alt="Switch icon"
              width={160}
              height={107}
              priority
            />

            {/* Gap: icon → top text (16px, from frame analysis) */}
            <div style={{ marginTop: TEXT.gap_icon_to_top }}>

              {/* Top line — replaces "Nintendo" */}
              <div
                className="text-white font-bold uppercase text-center"
                style={{
                  fontSize: TEXT.top.fontSize,
                  letterSpacing: TEXT.top.letterSpacing,
                  width: 160,
                }}
              >
                {TEXT.top.label}
              </div>

              {/* Gap: between lines (6px, from frame analysis) */}
              <div style={{ marginTop: TEXT.gap_between }}>

                {/* Bottom line — replaces "SWITCH" */}
                <div
                  className="text-white font-bold uppercase text-center"
                  style={{
                    fontSize: TEXT.bottom.fontSize,
                    letterSpacing: TEXT.bottom.letterSpacing,
                    width: 160,
                  }}
                >
                  {TEXT.bottom.label}
                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

import type { Variants, Transition } from 'framer-motion';
import { animation } from '@/lib/constants/theme';

/* ── Shared transitions ── */

export const switchTransition: Transition = {
  duration: animation.duration.normal,
  ease: animation.easing.default,
};

export const snappyTransition: Transition = {
  duration: animation.duration.fast,
  ease: animation.easing.snappy,
};

export const launchTransition: Transition = {
  duration: animation.duration.launch,
  ease: animation.easing.snappy,
};

/* ── Game tile variants ── */

export const tileVariants: Variants = {
  idle: {
    scale: 1,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  hover: {
    scale: 1.02,
    transition: snappyTransition,
  },
  tap: {
    scale: 0.98,
    transition: { duration: animation.duration.fast },
  },
  selected: {
    scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  },
};

/* ── Game launch transition (tile → full screen) ── */

export const launchOverlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: animation.duration.slow },
  },
  exit: {
    opacity: 0,
    transition: { duration: animation.duration.normal },
  },
};

/* ── Page / screen transitions ── */

export const pageVariants: Variants = {
  initial: { opacity: 0, x: 40 },
  enter: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    x: -40,
    transition: { duration: 0.15 },
  },
};

/* ── Wake-up animation (screen power-on) ── */

export const wakeUpVariants: Variants = {
  asleep: { opacity: 0, scale: 0.98 },
  awake: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: animation.duration.slow,
      ease: animation.easing.default,
    },
  },
};

/* ── Fade in (generic) ── */

export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: switchTransition,
  },
};

/* ── Boot screen (faithful to Switch startup timing) ── */

// Black (0s) → snap red (1.2s) → hold (4.5s) → fade white (1.2s) → done
export const bootLogoVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.08, ease: 'linear' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0 },
  },
};

/* ── Stagger children (for tile row, nav items) ── */

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: switchTransition,
  },
};

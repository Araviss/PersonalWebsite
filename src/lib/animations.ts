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
    boxShadow: '0 0 0 0px rgba(0, 195, 227, 0)',
  },
  hover: {
    scale: 1.08,
    boxShadow: '0 0 20px 4px rgba(0, 195, 227, 0.4)',
    transition: snappyTransition,
  },
  tap: {
    scale: 0.96,
    transition: { duration: animation.duration.fast },
  },
  selected: {
    scale: 1.08,
    boxShadow: '0 0 24px 6px rgba(0, 195, 227, 0.5)',
    transition: switchTransition,
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
  initial: { opacity: 0, y: 12 },
  enter: {
    opacity: 1,
    y: 0,
    transition: switchTransition,
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: animation.duration.fast },
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

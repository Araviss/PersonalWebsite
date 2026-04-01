'use client';

import { motion } from 'framer-motion';
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations';
import { useTheme } from '@/components/shared/ThemeProvider';

export function SettingsSection() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.article
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4"
    >
      <h1 className="text-2xl font-bold text-on-surface">Settings</h1>

      <motion.div
        className="flex flex-col gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Theme toggle */}
        <motion.div
          variants={staggerItem}
          className="flex items-center justify-between rounded-lg bg-surface-elevated p-4"
        >
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-accent"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              {theme === 'dark' ? (
                <path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
              ) : (
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 00-1.41 0 .996.996 0 000 1.41l1.06 1.06c.39.39 1.03.39 1.41 0a.996.996 0 000-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 000-1.41.996.996 0 00-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
              )}
            </svg>
            <div>
              <p className="text-sm font-medium text-on-surface">Theme</p>
              <p className="text-xs text-on-surface-muted">
                {theme === 'dark' ? 'Dark mode' : 'Light mode'}
              </p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            role="switch"
            aria-checked={theme === 'light'}
            aria-label="Toggle theme"
            className={`relative h-7 w-12 rounded-full transition-colors ${
              theme === 'light' ? 'bg-accent' : 'bg-on-surface-muted/40'
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                theme === 'light' ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </motion.div>

        {/* Sound toggle (placeholder — Phase 7) */}
        <motion.div
          variants={staggerItem}
          className="flex items-center justify-between rounded-lg bg-surface-elevated p-4 opacity-50"
        >
          <div className="flex items-center gap-3">
            <svg
              className="h-6 w-6 text-on-surface-muted"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0014 8.5v7a4.47 4.47 0 002.5-3.5zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-on-surface">Sound Effects</p>
              <p className="text-xs text-on-surface-muted">Coming in Phase 7</p>
            </div>
          </div>
          <div
            role="switch"
            aria-checked={false}
            aria-label="Toggle sound effects"
            aria-disabled="true"
            className="relative h-7 w-12 cursor-not-allowed rounded-full bg-on-surface-muted/40"
          >
            <span className="absolute top-0.5 h-6 w-6 translate-x-0.5 rounded-full bg-white shadow" />
          </div>
        </motion.div>

        {/* Version info */}
        <motion.div
          variants={staggerItem}
          className="rounded-lg bg-surface-elevated p-4"
        >
          <p className="text-xs text-on-surface-muted">
            Portfolio OS v1.0.0 · Built with Next.js + Tailwind CSS
          </p>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}

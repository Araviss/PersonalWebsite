'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { useTheme } from '@/components/shared/ThemeProvider';

const categories = ['Themes', 'Internet', 'Screen Lock', 'Sound', 'System'] as const;
type Category = (typeof categories)[number];

export function SettingsSection() {
  const { theme, toggleTheme } = useTheme();
  const [selected, setSelected] = useState<Category>('Themes');

  return (
    <article className="flex flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-separator px-6">
        <svg
          className="h-8 w-8 text-on-surface"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1112 8.4a3.6 3.6 0 010 7.2z" />
        </svg>
        <h1 className="text-xl font-medium text-on-surface">System Settings</h1>
      </div>

      {/* Two-panel body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — staggered entry */}
        <motion.nav
          className="flex w-[30%] flex-col gap-2 border-r border-separator bg-settings-sidebar-bg px-4 py-6"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={staggerItem}
              onClick={() => setSelected(cat)}
              className={`rounded-lg px-4 py-3 text-left text-base font-medium transition-all ${
                selected === cat
                  ? 'border-2 border-settings-selected-border text-settings-selected-text shadow-[0_0_8px] shadow-highlight-glow'
                  : 'border-2 border-transparent text-on-surface-muted hover:text-on-surface'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.nav>

        {/* Content — animated panel switch */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {selected === 'Themes' && (
                <ThemesContent theme={theme} toggleTheme={toggleTheme} />
              )}
              {selected === 'Internet' && <InternetContent />}
              {selected === 'Screen Lock' && <ScreenLockContent />}
              {selected === 'Sound' && <SoundContent />}
              {selected === 'System' && <SystemContent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}

function ThemesContent({
  theme,
  toggleTheme,
}: {
  theme: string;
  toggleTheme: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <button
        onClick={() => theme === 'dark' && toggleTheme()}
        className="flex items-center gap-4 py-3"
      >
        <div className="h-[60px] w-[100px] rounded border border-separator bg-white" />
        <span className="flex-1 text-left text-base text-on-surface">
          Basic White
        </span>
        {theme === 'light' && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-highlight">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>

      <div className="border-t border-separator" />

      <button
        onClick={() => theme === 'light' && toggleTheme()}
        className="flex items-center gap-4 py-3"
      >
        <div className="h-[60px] w-[100px] rounded border border-separator bg-black" />
        <span className="flex-1 text-left text-base text-on-surface">
          Basic Black
        </span>
        {theme === 'dark' && (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-highlight">
            <svg
              className="h-5 w-5 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </button>
    </div>
  );
}

function InternetContent() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Connection Status</p>
        <p className="text-base text-highlight">Connected</p>
      </div>
      <div className="border-t border-separator" />
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Network</p>
        <p className="text-base text-highlight">Portfolio-WiFi</p>
      </div>
      <div className="border-t border-separator" />
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Signal Strength</p>
        <p className="text-base text-highlight">Excellent</p>
      </div>
    </div>
  );
}

function ScreenLockContent() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Auto-Lock</p>
        <p className="text-base text-highlight">Never</p>
      </div>
      <div className="border-t border-separator" />
      <div className="py-4">
        <p className="text-base text-on-surface">Screen Brightness</p>
        <div className="mt-2 h-2 w-full rounded-full bg-surface-elevated">
          <div className="h-full w-3/4 rounded-full bg-highlight" />
        </div>
      </div>
    </div>
  );
}

function SoundContent() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Volume</p>
        <p className="text-base text-highlight">80%</p>
      </div>
      <div className="border-t border-separator" />
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Mute</p>
        <p className="text-base text-on-surface-muted">Off</p>
      </div>
    </div>
  );
}

function SystemContent() {
  return (
    <div className="flex flex-col">
      <div className="py-4">
        <p className="text-base text-on-surface">System Update</p>
        <p className="mt-1 text-sm text-on-surface-muted">
          Current system version: 1.0.0
        </p>
      </div>
      <div className="border-t border-separator" />
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Console Nickname</p>
        <p className="text-base text-highlight">Portfolio OS</p>
      </div>
      <div className="border-t border-separator" />
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Language</p>
        <p className="text-base text-highlight">English</p>
      </div>
      <div className="border-t border-separator" />
      <div className="flex items-center justify-between py-4">
        <p className="text-base text-on-surface">Region</p>
        <p className="text-base text-highlight">Americas</p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { navItems } from '@/data/navigation';
import { ResumeDownloadModal } from '@/components/shared/ResumeDownloadModal';

const iconPaths: Record<string, string> = {
  home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
  news: 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12zM7 9h2v2H7V9zm4 0h2v2h-2V9zm4 0h2v2h-2V9z',
  shop: 'M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z',
  controller:
    'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  gear: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6A3.6 3.6 0 1112 8.4a3.6 3.6 0 010 7.2z',
};

const iconColors: Record<string, string> = {
  home: '#e74444',
  news: '#e60012',
  shop: '#FF7D00',
  controller: '#0AB9E6',
  gear: '#707070',
};

export function BottomNav() {
  const pathname = usePathname();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const renderNavItem = (item: typeof navItems[0]) => {
    const isActive = pathname === item.href;
    const isResume = item.id === 'resume';

    const content = (
      <>
        <div
          className="relative flex items-center justify-center rounded-full bg-icon-bg"
          style={{ width: 'clamp(40px, 4.17vw, 80px)', height: 'clamp(40px, 4.17vw, 80px)' }}
        >
          {isActive && !isResume && (
            <motion.div
              layoutId="nav-ring"
              className="absolute inset-0 rounded-full ring-2 ring-highlight shadow-[0_0_8px_2px] shadow-highlight-glow"
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
            />
          )}
          <svg
            className="h-[50%] w-[50%]"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            style={{ color: isActive && !isResume ? 'var(--highlight)' : iconColors[item.icon] }}
          >
            <path d={iconPaths[item.icon]} />
          </svg>
        </div>
        <span
          className={`text-[11px] leading-none ${
            isActive && !isResume ? 'font-medium text-highlight' : 'text-on-surface-muted'
          }`}
        >
          {item.label}
        </span>
      </>
    );

    // Resume opens a modal instead of navigating
    if (isResume) {
      return (
        <button
          key={item.id}
          onClick={() => setIsResumeModalOpen(true)}
          className="flex flex-col items-center gap-1 outline-none"
          aria-label="Download resume"
        >
          {content}
        </button>
      );
    }

    return (
      <Link
        key={item.id}
        href={item.href}
        className="flex flex-col items-center gap-1 outline-none"
        aria-current={isActive ? 'page' : undefined}
      >
        {content}
      </Link>
    );
  };

  return (
    <>
      <nav
        className="flex w-full shrink-0 items-center justify-center py-1"
        style={{ gap: '3vw' }}
        role="navigation"
        aria-label="Main navigation"
      >
        {navItems.map(renderNavItem)}
      </nav>

      <ResumeDownloadModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </>
  );
}

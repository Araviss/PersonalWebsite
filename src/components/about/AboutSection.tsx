'use client';

import { useCallback, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

interface NewsItem {
  id: string;
  title: string;
  body: string;
  date: string;
  gradient: string;
  overlayText: string;
  icon: string;
}

const FIRST_ROW_COLS = 3;
const COLS = 4;

const newsItems: NewsItem[] = [
  {
    id: 'intro',
    title: 'Full-Stack Engineer with a Console-Quality Design Obsession',
    body: 'I build products that feel as polished as a first-party Nintendo title. 5+ years shipping React, Python, and cloud-native systems at scale. This portfolio is proof — every animation, every transition, every micro-interaction was built from scratch.',
    date: '03/15/2026',
    gradient: 'linear-gradient(135deg, #e60012 0%, #ff6b6b 100%)',
    overlayText: 'About Me',
    icon: 'M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
  },
  {
    id: 'current-role',
    title: 'Led Microservices Migration — 12 Services, 2M+ Events/Day',
    body: 'Decomposed a monolithic platform into 12 independently deployable services. Built a real-time data pipeline processing 2M+ events/day. Reduced p95 latency by 60% and deployment frequency from weekly to multiple-times-daily.',
    date: '01/22/2026',
    gradient: 'linear-gradient(135deg, #0AB9E6 0%, #0077b6 100%)',
    overlayText: 'Career',
    icon: 'M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z',
  },
  {
    id: 'design-system',
    title: 'Shipped a 40+ Component Design System Used by 3 Teams',
    body: 'Built a production-grade component library with Radix UI primitives, comprehensive a11y testing, Storybook documentation, and theme tokens. Used across the organization.',
    date: '09/10/2025',
    gradient: 'linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)',
    overlayText: 'Projects',
    icon: 'M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7a2.5 2.5 0 010-5 2.5 2.5 0 010 5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z',
  },
  {
    id: 'philosophy',
    title: 'Why I Treat Interfaces Like Game Design',
    body: 'Every frame matters. I approach UI the same way Nintendo approaches game feel — 60fps transitions, spring physics for weight, stagger animations for rhythm. Users shouldn\'t notice the craft, they should just feel "this is good."',
    date: '07/04/2025',
    gradient: 'linear-gradient(135deg, #059669 0%, #34d399 100%)',
    overlayText: 'Philosophy',
    icon: 'M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
  },
  {
    id: 'stack',
    title: 'My Go-To Stack in 2026',
    body: 'Next.js + TypeScript for frontend. FastAPI + Python for backend. PostgreSQL + Redis for data. Docker + AWS for infra. Vitest for testing. Tailwind + Framer Motion for UI. Simple tools, composed well.',
    date: '04/18/2025',
    gradient: 'linear-gradient(135deg, #306998 0%, #FFD43B 100%)',
    overlayText: 'Tech',
    icon: 'M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z',
  },
  {
    id: 'outside-work',
    title: 'When I\'m Not Coding — Smash, Keyboards, Coffee',
    body: 'Competitive Smash Bros. player (Falcon main, naturally). Mechanical keyboard enthusiast. Home-barista with too many pour-over opinions. Always looking for the next great JRPG.',
    date: '02/14/2025',
    gradient: 'linear-gradient(135deg, #ff9900 0%, #ffb347 100%)',
    overlayText: 'Personal',
    icon: 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
  },
  {
    id: 'aws-infra',
    title: 'Zero-Downtime Deploys on AWS with CDK',
    body: 'Built a fully automated CI/CD pipeline using AWS CDK, CodePipeline, and ECS Fargate. Blue-green deployments with automatic rollback. Infrastructure as code for the entire stack.',
    date: '11/30/2024',
    gradient: 'linear-gradient(135deg, #ff6f00 0%, #f57c00 50%, #232f3e 100%)',
    overlayText: 'DevOps',
    icon: 'M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
  },
  {
    id: 'open-source',
    title: 'Contributing to the Tools I Use Every Day',
    body: 'Active contributor to several open-source projects. Believe in giving back to the ecosystem that powers my work. From bug fixes to feature PRs across React, Python, and DevOps tooling.',
    date: '08/22/2024',
    gradient: 'linear-gradient(135deg, #2d333b 0%, #444c56 50%, #adbac7 100%)',
    overlayText: 'Open Source',
    icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
  },
];

function NewsCard({
  item,
  isSelected,
  onActivate,
  tabIndex,
}: {
  item: NewsItem;
  isSelected: boolean;
  onActivate: () => void;
  tabIndex: number;
}) {
  return (
    <button
      type="button"
      onClick={onActivate}
      tabIndex={tabIndex}
      aria-label={item.title}
      className={`flex h-full w-full flex-col overflow-hidden rounded-sm bg-white text-left shadow-sm transition-all dark:bg-white/[.08] ${
        isSelected
          ? 'ring-[3px] ring-highlight ring-offset-0 ring-offset-surface'
          : ''
      }`}
    >
      {/* Thumbnail — gradient fills the top, grows to fill available space */}
      <div
        className="relative flex min-h-0 flex-1 w-full items-center justify-center"
        style={{ background: item.gradient }}
      >
        <span className="text-[clamp(12px,2vw,20px)] font-black uppercase tracking-wider text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
          {item.overlayText}
        </span>
        <svg className="absolute bottom-1.5 right-1.5 h-4 w-4 text-white/20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={item.icon} />
        </svg>
      </div>
      {/* Title strip — white in both light/dark for contrast, fixed height */}
      <div className="flex h-12 w-full shrink-0 items-start bg-white px-3 pt-2 dark:bg-[#2d2d2d]">
        <span className="text-sm font-normal leading-snug text-neutral-800 line-clamp-2 dark:text-neutral-200">
          {item.title}
        </span>
      </div>
    </button>
  );
}

function DetailPanel({
  item,
  onClose,
}: {
  item: NewsItem;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className="absolute inset-0 z-10 flex flex-col overflow-y-auto bg-surface"
    >
      {/* Hero image */}
      <div
        className="relative flex aspect-[2.5] w-full shrink-0 items-center justify-center"
        style={{ background: item.gradient }}
      >
        <span className="text-[clamp(18px,3.5vw,32px)] font-black uppercase tracking-wider text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
          {item.overlayText}
        </span>
      </div>
      {/* Content */}
      <div className="flex flex-1 flex-col px-6 py-5">
        <h2 className="text-base font-bold leading-snug text-on-surface">{item.title}</h2>
        <p className="mt-1.5 text-[11px] text-on-surface-muted">{item.date}</p>
        <p className="mt-4 text-sm leading-relaxed text-on-surface-muted">{item.body}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 self-start rounded-sm border border-separator px-4 py-2 text-xs font-medium text-on-surface transition-colors hover:bg-surface-elevated"
        >
          ← Back to News
        </button>
      </div>
    </motion.div>
  );
}

export function AboutSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (activeArticle) {
        if (e.key === 'Escape' || e.key === 'Backspace') {
          e.preventDefault();
          setActiveArticle(null);
        }
        return;
      }
      let next = selectedIndex;
      switch (e.key) {
        case 'ArrowRight': next = Math.min(selectedIndex + 1, newsItems.length - 1); break;
        case 'ArrowLeft': next = Math.max(selectedIndex - 1, 0); break;
        case 'ArrowDown': {
          // From first row → second row
          if (selectedIndex < FIRST_ROW_COLS) {
            next = Math.min(FIRST_ROW_COLS + Math.min(selectedIndex, COLS - 1), newsItems.length - 1);
          } else {
            next = Math.min(selectedIndex + COLS, newsItems.length - 1);
          }
          break;
        }
        case 'ArrowUp': {
          // From second row → first row
          if (selectedIndex >= FIRST_ROW_COLS && selectedIndex < FIRST_ROW_COLS + COLS) {
            next = Math.min(selectedIndex - FIRST_ROW_COLS, FIRST_ROW_COLS - 1);
          } else {
            next = Math.max(selectedIndex - COLS, 0);
          }
          break;
        }
        case 'Enter':
          e.preventDefault();
          setActiveArticle(newsItems[selectedIndex]);
          return;
        default: return;
      }
      if (next !== selectedIndex) {
        e.preventDefault();
        setSelectedIndex(next);
        // Find the button by querying all card buttons in the grid container
        const buttons = gridRef.current?.querySelectorAll<HTMLButtonElement>('[aria-label]');
        buttons?.[next]?.focus();
        buttons?.[next]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    },
    [selectedIndex, activeArticle],
  );

  return (
    <article className="relative flex flex-1 flex-col overflow-hidden">
      {/* Header — icon + "News" left, "Find Channels" right */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-separator px-5">
        <div className="flex items-center gap-3">
          <svg className="h-7 w-7 text-on-surface" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
          </svg>
          <h1 className="text-xl font-medium text-on-surface">News</h1>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-sm border border-on-surface-muted/40 px-3 py-1.5 text-xs font-medium text-on-surface transition-colors hover:bg-surface-elevated"
        >
          Find Channels
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
        </button>
      </div>

      {/* Card grid — first row 3-col (taller), remaining rows 4-col */}
      <div
        ref={gridRef as React.RefObject<HTMLDivElement>}
        className="flex-1 overflow-y-auto px-5 py-3"
        onKeyDown={handleKeyDown}
      >
        {/* First row — 3 columns, taller cards */}
        <motion.ul
          role="list"
          className="grid h-[220px] grid-cols-3 gap-2.5 md:h-[260px] lg:h-[280px]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {newsItems.slice(0, FIRST_ROW_COLS).map((item, i) => (
            <motion.li key={item.id} variants={staggerItem} className="min-w-0">
              <NewsCard
                item={item}
                isSelected={i === selectedIndex}
                onActivate={() => setActiveArticle(item)}
                tabIndex={i === selectedIndex ? 0 : -1}
              />
            </motion.li>
          ))}
        </motion.ul>

        {/* Remaining rows — 4 columns, shorter cards */}
        <motion.ul
          role="list"
          className="mt-2.5 grid auto-rows-[160px] grid-cols-4 gap-2.5 md:auto-rows-[180px] lg:auto-rows-[200px]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {newsItems.slice(FIRST_ROW_COLS).map((item, i) => {
            const idx = i + FIRST_ROW_COLS;
            return (
              <motion.li key={item.id} variants={staggerItem} className="min-w-0">
                <NewsCard
                  item={item}
                  isSelected={idx === selectedIndex}
                  onActivate={() => setActiveArticle(item)}
                  tabIndex={idx === selectedIndex ? 0 : -1}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>

      {/* Detail panel — slides in when a card is activated */}
      <AnimatePresence>
        {activeArticle && (
          <DetailPanel
            key={activeArticle.id}
            item={activeArticle}
            onClose={() => setActiveArticle(null)}
          />
        )}
      </AnimatePresence>
    </article>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * ContactSection — Simplified "Change Grip/Order" screen
 *
 * Design adapted from Switch's controller sync screen:
 * - Off-white background (#F5F5F5) filling the content area
 * - 4 square contact slots centered vertically and horizontally
 * - Slot grid: ~855px max width, 24px gaps
 * - Active slot: 3px solid black border
 * - Inactive slots: 1px solid #B0B0B0 border
 * - Header/footer removed for cleaner contact UX
 */

interface ContactSlot {
  id: string;
  label: string;
  href: string;
}

const contactSlots: ContactSlot[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/in/jzonlvngston' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/jzonlvngston' },
  { id: 'email', label: 'Email', href: 'mailto:hello@jzonlvngston.dev' },
  { id: 'twitter', label: 'X / Twitter', href: 'https://twitter.com/jzonlvngston' },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Contact Site Icons
   ═══════════════════════════════════════════════════════════════════════════ */

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function EmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 6L12 13L2 6" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function getSlotIcon(id: string, className: string) {
  switch (id) {
    case 'linkedin': return <LinkedInIcon className={className} />;
    case 'github': return <GitHubIcon className={className} />;
    case 'email': return <EmailIcon className={className} />;
    case 'twitter': return <TwitterIcon className={className} />;
    default: return null;
  }
}

/* ═══════════════════════════════════════════════════════════════════════════
   Header Icons — Clean outline style matching Switch controller icons
   
   Design principles (matching Nintendo Switch UI):
   - 2px stroke width for visual consistency
   - Rounded line caps and joins (strokeLinecap/strokeLinejoin="round")
   - Simple geometric shapes — no unnecessary details
   - Balanced visual weight across all icons
   - Professional, minimalist aesthetic
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Simple envelope icon — Left side
 * Clean white outline, minimal detail
 */
function HeaderEmailIcon() {
  return (
    <svg
      viewBox="0 0 48 36"
      className="h-9 w-12"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="44" height="32" rx="3" />
      <path d="M2 6 L24 22 L46 6" />
    </svg>
  );
}

/**
 * Simple chat bubble icon — Right side
 * Clean white outline with small tail
 */
function HeaderChatIcon() {
  return (
    <svg
      viewBox="0 0 48 40"
      className="h-10 w-12"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="44" height="28" rx="4" />
      <path d="M12 30 L12 38 L22 30" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Header Component — Mimics Switch "Change Grip/Order" header
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactHeader() {
  return (
    <div
      className="flex w-full items-center justify-between px-12"
      style={{ height: '115px', backgroundColor: '#6B6B6B' }}
    >
      {/* Left: Envelope icon */}
      <div className="flex items-center justify-center">
        <HeaderEmailIcon />
      </div>

      {/* Center: Wide tooltip */}
      <div className="relative flex items-center">
        {/* Arrow pointing LEFT */}
        <div
          className="h-0 w-0"
          style={{
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            borderRight: '10px solid #4A4A4A',
          }}
        />
        {/* Tooltip — wider horizontal layout */}
        <div
          className="flex items-center gap-6 rounded-2xl px-8 py-4"
          style={{ backgroundColor: '#4A4A4A', minWidth: '280px' }}
        >
          {/* Small envelope */}
          <svg viewBox="0 0 32 24" className="h-6 w-8" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <rect x="1" y="1" width="30" height="22" rx="2" />
            <path d="M1 4 L16 14 L31 4" />
          </svg>
          {/* Text */}
          <span className="text-sm" style={{ color: '#FFFFFF' }}>
            Let&apos;s connect.
          </span>
          {/* Small chat bubble */}
          <svg viewBox="0 0 32 28" className="h-7 w-8" fill="none" stroke="#FFFFFF" strokeWidth="2">
            <rect x="1" y="1" width="30" height="20" rx="3" />
            <path d="M8 21 L8 27 L15 21" />
          </svg>
        </div>
      </div>

      {/* Right: Chat bubble icon */}
      <div className="flex items-center justify-center">
        <HeaderChatIcon />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Contact Slot Component — Square tile matching Switch player slot styling
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactSlotCard({
  slot,
  isSelected,
  onClick,
}: {
  slot: ContactSlot;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`flex aspect-square w-full flex-col items-center justify-center gap-3 bg-white transition-all ${
        isSelected
          ? 'border-[3px] border-black'
          : 'border border-[#B0B0B0]'
      }`}
      aria-label={slot.label}
    >
      <div className="text-neutral-700">
        {getSlotIcon(slot.id, 'h-16 w-16 sm:h-20 sm:w-20')}
      </div>
      <span className="text-base font-medium text-neutral-700 sm:text-lg">{slot.label}</span>
    </motion.button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main Component — 3-section layout matching Switch proportions
   ═══════════════════════════════════════════════════════════════════════════ */

export function ContactSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <article className="flex w-full flex-1 flex-col bg-[#F5F5F5]">
      {/* Header — Controller icons replaced with contact icons */}
      <ContactHeader />

      {/* Main content — Slot grid centered */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="flex flex-col items-center">
          {/* Slot Grid — 4 square slots, 67% width, 24px gap */}
          <div
            className="grid grid-cols-4 gap-6"
            style={{ width: 'min(855px, 90vw)' }}
          >
            {contactSlots.map((slot, i) => (
              <ContactSlotCard
                key={slot.id}
                slot={slot}
                isSelected={i === selectedIndex}
                onClick={() => {
                  setSelectedIndex(i);
                  if (slot.href) {
                    window.open(slot.href, slot.href.startsWith('mailto:') ? '_self' : '_blank');
                  }
                }}
              />
            ))}
          </div>

          {/* Instruction text below slots */}
          <p className="mt-6 text-center text-sm text-neutral-500 sm:text-base">
            Click a tile to connect.
          </p>
        </div>
      </div>
    </article>
  );
}

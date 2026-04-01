'use client';

import { motion } from 'framer-motion';
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations';

interface ContactLink {
  label: string;
  href: string;
  icon: string;
}

const contactLinks: ContactLink[] = [
  { label: 'Email', href: 'mailto:hello@example.com', icon: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z' },
  { label: 'GitHub', href: 'https://github.com', icon: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.7.114 2.5.34 1.9-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.16.59.67.5A10.013 10.013 0 0022 12c0-5.523-4.477-10-10-10z' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z' },
];

export function ContactSection() {
  return (
    <motion.article
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4"
    >
      <div>
        <h1 className="text-2xl font-bold text-on-surface">Contact</h1>
        <p className="mt-1 text-sm text-on-surface-muted">
          Get in touch — I&apos;m always open to interesting conversations.
        </p>
      </div>

      {/* Contact links */}
      <motion.div
        className="flex flex-col gap-3"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {contactLinks.map((link) => (
          <motion.a
            key={link.label}
            variants={staggerItem}
            href={link.href}
            target={link.href.startsWith('mailto:') ? undefined : '_blank'}
            rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            className="flex items-center gap-4 rounded-lg bg-surface-elevated p-4 transition-colors hover:bg-accent/10"
          >
            <svg
              className="h-6 w-6 shrink-0 text-accent"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d={link.icon} />
            </svg>
            <span className="text-sm font-medium text-on-surface">{link.label}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Status */}
      <div className="mt-auto rounded-lg border border-accent/20 bg-accent/5 p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-400" aria-hidden="true" />
          <span className="text-sm text-on-surface/80">
            Currently open to new opportunities
          </span>
        </div>
      </div>
    </motion.article>
  );
}

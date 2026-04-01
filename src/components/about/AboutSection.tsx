'use client';

import { motion } from 'framer-motion';
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations';

const skills = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Python',
  'FastAPI',
  'AWS',
  'Docker',
];

export function AboutSection() {
  return (
    <motion.article
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4"
    >
      {/* Profile header */}
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/20">
          <span className="text-2xl font-bold text-accent" aria-hidden="true">
            NS
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-on-surface">About Me</h1>
          <p className="text-sm text-on-surface-muted">Software Engineer</p>
        </div>
      </div>

      {/* Bio */}
      <section aria-label="Biography">
        <p className="leading-relaxed text-on-surface/90">
          I build software that solves real problems. Passionate about clean architecture,
          developer experience, and shipping things that matter. Currently exploring the
          intersection of AI tooling and software engineering.
        </p>
      </section>

      {/* Skills */}
      <section aria-label="Skills">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
          Skills
        </h2>
        <motion.div
          className="flex flex-wrap gap-2"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              variants={staggerItem}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* Interests */}
      <section aria-label="Interests">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
          Interests
        </h2>
        <motion.ul
          className="grid grid-cols-2 gap-2 text-sm text-on-surface/80"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {['Open Source', 'AI/ML Tooling', 'Systems Design', 'Game Dev'].map((interest) => (
            <motion.li
              key={interest}
              variants={staggerItem}
              className="flex items-center gap-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              {interest}
            </motion.li>
          ))}
        </motion.ul>
      </section>
    </motion.article>
  );
}

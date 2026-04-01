'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { pageVariants, switchTransition } from '@/lib/animations';
import type { Project } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <motion.article
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex flex-1 flex-col gap-6 overflow-y-auto px-2 py-4"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-on-surface">{project.title}</h1>
          <p className="text-sm text-on-surface-muted">{project.description}</p>
        </div>
        <Link
          href="/"
          className="shrink-0 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-accent hover:text-surface-deep"
          aria-label="Return to home"
        >
          ← Home
        </Link>
      </div>

      {/* Tech stack */}
      <section aria-label="Tech stack">
        <h2 className="mb-2 text-sm font-semibold text-on-surface-muted uppercase tracking-wider">
          Tech Stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <motion.span
              key={tech}
              className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={switchTransition}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </section>

      {/* Links */}
      {project.links.length > 0 && (
        <section aria-label="Project links">
          <h2 className="mb-2 text-sm font-semibold text-on-surface-muted uppercase tracking-wider">
            Links
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-on-surface transition-colors hover:bg-accent hover:text-surface-deep"
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </section>
      )}
    </motion.article>
  );
}

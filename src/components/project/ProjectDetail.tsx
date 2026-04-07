'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project } from '@/data/projects';
import { animation } from '@/lib/constants/theme';

/* ── Animation variants ── */

const ease = animation.easing.default;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease },
  },
};

/* ── Sub-components ── */

/** Controller button prompt — matches BottomBar style */
function ButtonPrompt({
  letter,
  label,
  className = '',
}: {
  letter: string;
  label: string;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-on-surface/90 text-[11px] font-bold text-surface-deep">
        {letter}
      </span>
      <span>{label}</span>
    </span>
  );
}

/* ── Main component ── */

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();

  // Keyboard: B or Escape → back to home
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' || e.key.toLowerCase() === 'b') {
        // Don't trigger if user is typing in an input
        if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
        router.push('/');
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [router]);

  const gradient = project.theme?.gradient ?? 'linear-gradient(135deg, #2d2d2d, #161616)';
  const accent = project.theme?.accentColor ?? '#ffffff';

  // Map links to controller buttons (A = first link, Y = second, X = third)
  const buttonMap = ['A', 'Y', 'X'] as const;

  return (
    <motion.article
      className="relative flex min-h-screen flex-1 flex-col bg-surface-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease }}
      aria-label={`${project.title} project details`}
    >
      {/* Background gradient from project theme */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{ background: gradient }}
        aria-hidden="true"
      />

      {/* Back hint — top right */}
      <motion.button
        onClick={() => router.push('/')}
        className="absolute right-[4.6875vw] top-[6.667vh] z-10 flex items-center gap-2 text-xs text-on-surface-muted transition-colors hover:text-on-surface"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
        aria-label="Back to home"
      >
        <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-on-surface/30 text-[9px] font-bold text-surface-deep">
          B
        </span>
        Back
      </motion.button>

      {/* Content area */}
      <motion.div
        className="relative z-[1] flex flex-1 items-center px-[4.6875vw] py-[6.667vh]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left column — project info */}
        <div className="flex flex-1 flex-col gap-3 pr-[4.6875vw]">
          {/* Category label */}
          <motion.span
            className="text-[11px] font-semibold uppercase tracking-[2px]"
            style={{ color: `${accent}66` }}
            variants={childVariants}
          >
            {project.role ?? 'Portfolio Project'}
          </motion.span>

          {/* Title */}
          <motion.h1
            className="text-[clamp(24px,5vh,36px)] font-bold leading-tight tracking-tight text-on-surface"
            style={{ letterSpacing: '-0.02em' }}
            variants={childVariants}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            className="max-w-[400px] text-base leading-relaxed text-on-surface-muted"
            variants={childVariants}
          >
            {project.description}
          </motion.p>

          {/* Tech stack — ghost tags */}
          <motion.div
            className="mt-2 flex flex-wrap gap-1.5"
            variants={childVariants}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-[4px] border border-on-surface/15 px-2.5 py-1 text-[11px] font-medium text-on-surface-muted"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          {/* Separator */}
          <motion.div
            className="my-3 h-px w-full max-w-[400px] bg-separator"
            variants={childVariants}
            aria-hidden="true"
          />

          {/* Action buttons — stacked, controller prompts */}
          <motion.div
            className="flex flex-col gap-3 text-[13px] font-medium text-on-surface-muted"
            variants={childVariants}
          >
            {project.links.map((link, i) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-100"
                style={{ opacity: 0.7 }}
              >
                <ButtonPrompt
                  letter={buttonMap[i] ?? '?'}
                  label={link.label}
                />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right column — preview & screenshots */}
        <div className="flex w-[clamp(240px,26.5vw,340px)] shrink-0 flex-col gap-2">
          {/* Hero preview */}
          <motion.div
            className="aspect-video w-full overflow-hidden rounded-lg border border-on-surface/10 bg-surface-elevated"
            variants={childVariants}
          >
            {project.coverArt ? (
              <Image
                src={project.coverArt}
                alt={`${project.title} preview`}
                width={680}
                height={383}
                className="h-full w-full object-cover"
              />
            ) : project.theme ? (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ background: gradient }}
              >
                <svg
                  className="h-1/3 w-1/3 opacity-30"
                  viewBox="0 0 24 24"
                  fill={accent}
                >
                  <path d={project.theme.icon} />
                </svg>
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-surface-elevated text-sm text-on-surface-muted">
                Preview
              </div>
            )}
          </motion.div>

          {/* Mini screenshot thumbnails */}
          {project.screenshots && project.screenshots.length > 0 && (
            <motion.div
              className="flex gap-2"
              variants={childVariants}
            >
              {project.screenshots.slice(0, 3).map((src, i) => (
                <div
                  key={src}
                  className="flex-1 overflow-hidden rounded-[4px] border border-on-surface/8"
                  style={{ height: 'clamp(48px, 9.7vh, 70px)' }}
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    width={200}
                    height={112}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

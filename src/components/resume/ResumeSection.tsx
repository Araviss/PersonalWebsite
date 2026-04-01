'use client';

import { motion } from 'framer-motion';
import { pageVariants, staggerContainer, staggerItem } from '@/lib/animations';

interface Experience {
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

const experience: Experience[] = [
  {
    company: 'Acme Corp',
    role: 'Senior Software Engineer',
    period: '2023 – Present',
    highlights: [
      'Led migration of monolith to microservices architecture',
      'Built internal developer platform reducing deploy time by 60%',
      'Mentored 4 junior engineers through structured growth plans',
    ],
  },
  {
    company: 'StartupCo',
    role: 'Software Engineer',
    period: '2021 – 2023',
    highlights: [
      'Shipped full-stack features across React + Node.js stack',
      'Designed and built REST APIs handling 10K+ requests/min',
      'Introduced automated testing, reaching 85% coverage',
    ],
  },
];

const education = [
  {
    school: 'University of Technology',
    degree: 'B.S. Computer Science',
    year: '2021',
  },
];

export function ResumeSection() {
  return (
    <motion.article
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      className="flex flex-1 flex-col gap-6 overflow-y-auto px-5 py-4"
    >
      <h1 className="text-2xl font-bold text-on-surface">Resume</h1>

      {/* Experience */}
      <section aria-label="Work experience">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
          Experience
        </h2>
        <motion.div
          className="flex flex-col gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {experience.map((job) => (
            <motion.div
              key={`${job.company}-${job.role}`}
              variants={staggerItem}
              className="rounded-lg bg-surface-elevated p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-on-surface">{job.role}</h3>
                <span className="shrink-0 text-xs text-on-surface-muted">{job.period}</span>
              </div>
              <p className="text-sm text-accent">{job.company}</p>
              <ul className="mt-2 space-y-1">
                {job.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-start gap-2 text-sm text-on-surface/80"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Education */}
      <section aria-label="Education">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-on-surface-muted">
          Education
        </h2>
        <motion.div
          className="flex flex-col gap-3"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {education.map((edu) => (
            <motion.div
              key={edu.school}
              variants={staggerItem}
              className="rounded-lg bg-surface-elevated p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-semibold text-on-surface">{edu.degree}</h3>
                <span className="shrink-0 text-xs text-on-surface-muted">{edu.year}</span>
              </div>
              <p className="text-sm text-accent">{edu.school}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </motion.article>
  );
}

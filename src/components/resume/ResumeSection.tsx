'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

/**
 * ResumeSection — Styled after Nintendo Switch User Profile / Play Activity
 * 
 * Design references:
 * - User icon + name header (like Switch profile)
 * - "Play Activity" style entries with duration labels
 * - Dark background (#2D2D2D) matching Switch UI
 * - Activity cards with square icons, duration on right
 */

interface ActivityEntry {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  firstPlayed: string;
  color: string;
  category: 'experience' | 'skills' | 'education';
  details?: string[];
}

const activities: ActivityEntry[] = [
  // ── Experience ──
  {
    id: 'liberty-mutual',
    title: 'Software Engineer',
    subtitle: 'Liberty Mutual — Dallas, TX',
    duration: '1+ year',
    firstPlayed: 'First started: January 2024',
    color: '#e60012',
    category: 'experience',
    details: [
      'Led migration of 100+ legacy applications to AWS-based Java microservices on Kubernetes, improving scalability, deployment reliability, and operational consistency across distributed systems.',
      'Engineered a Python-based automation framework to modernize mainframe batch workloads, reducing environment variable remediation time from 2+ hours to under 1 second per application across thousands of scripts.',
      'Designed and implemented observability solutions (logging, monitoring) for cloud-based systems, including filtering and remediation of sensitive data before ingestion into Splunk and Datadog.',
      'Designed and deployed multi-region disaster recovery architecture using Amazon EFS, improving system resilience and failover readiness.',
      'Owned backend development of serverless services using AWS API Gateway and Lambda for secure file and directory operations across environments.',
      'Built internal CLI tools (Python/Bash) to detect configuration drift and support Helm-based Kubernetes deployments, improving environment consistency.',
      'Implemented CI/CD pipelines in Linux environments to automate deployment validation and configuration checks, improving release reliability and reducing manual intervention.',
      'Containerized and deployed vendor applications across environments, collaborating with cross-functional teams to ensure successful integration and validation.',
      'Authored technical documentation and gap analyses to guide decisions on automation, infrastructure modernization, and system reliability improvements.',
    ],
  },
  {
    id: 'epsilon-systems',
    title: 'Software Engineer',
    subtitle: 'Epsilon Systems C5I — Largo, FL',
    duration: '1 year',
    firstPlayed: 'First started: January 2024',
    color: '#00c3e3',
    category: 'experience',
    details: [
      'Developed multi-threaded C++ applications in Linux for real-time systems, processing and distributing sensor data across networked components.',
      'Implemented concurrency control and message serialization logic to support reliable data exchange between system modules.',
      'Built data handling components for ingesting and transmitting time-sensitive data across distributed processes.',
      'Debugged concurrency and data consistency issues in latency-sensitive systems, improving system stability and reliability.',
      'Contributed to system design, implementation, and testing within Agile/SCRUM environments.',
    ],
  },
  // ── Skills ──
  {
    id: 'languages',
    title: 'Python · Java · C++ · SQL · Bash',
    subtitle: 'Programming Languages',
    duration: '3+ years',
    firstPlayed: 'Core competencies',
    color: '#306998',
    category: 'skills',
    details: [
      'Python: Automation frameworks, scripting, FastAPI',
      'Java: Microservices, Spring Boot, enterprise applications',
      'C++: Real-time systems, multi-threaded applications',
      'SQL: Database queries, optimization, SQL Server',
      'Bash: Linux scripting, CLI tools, deployment automation',
    ],
  },
  {
    id: 'cloud-infra',
    title: 'AWS · Kubernetes · Helm',
    subtitle: 'Cloud & Infrastructure',
    duration: '2+ years',
    firstPlayed: 'Production experience',
    color: '#ff9900',
    category: 'skills',
    details: [
      'AWS: EC2, Lambda, API Gateway, EFS, serverless architecture',
      'Kubernetes: Container orchestration, Helm chart deployments',
      'Infrastructure as Code, multi-region disaster recovery',
    ],
  },
  {
    id: 'devops',
    title: 'CI/CD · Jenkins · Git · CodeQL',
    subtitle: 'DevOps & Tooling',
    duration: '2+ years',
    firstPlayed: 'Daily workflow',
    color: '#2496ed',
    category: 'skills',
    details: [
      'CI/CD pipelines for automated deployment validation',
      'Jenkins pipeline configuration and maintenance',
      'Git version control, branching strategies',
      'CodeQL for security analysis',
      'Linux/Unix system administration',
    ],
  },
  {
    id: 'observability',
    title: 'Splunk · Datadog · SQL Server',
    subtitle: 'Data & Observability',
    duration: '1+ year',
    firstPlayed: 'Enterprise monitoring',
    color: '#65bc47',
    category: 'skills',
    details: [
      'Splunk: Log aggregation, sensitive data filtering',
      'Datadog: Metrics, monitoring, alerting',
      'SQL Server: Data persistence, queries, optimization',
    ],
  },
  // ── Education ──
  {
    id: 'fiu',
    title: 'B.S. Computer Science',
    subtitle: 'Florida International University',
    duration: '4 years',
    firstPlayed: 'Graduated',
    color: '#002d62',
    category: 'education',
    details: [
      'Bachelor of Science in Computer Science',
      'Focus: Software Engineering, Systems Programming',
    ],
  },
];

const filters = ['All Activity', 'Experience', 'Skills', 'Education'] as const;
type Filter = (typeof filters)[number];

export function ResumeSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All Activity');
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  const filtered = activeFilter === 'All Activity'
    ? activities
    : activities.filter((a) => a.category === activeFilter.toLowerCase());

  return (
    <article className="flex flex-1 flex-col overflow-hidden bg-[#2D2D2D]">
      {/* ── Profile Header — Switch User Profile style ── */}
      <div className="flex shrink-0 items-center gap-4 border-b border-white/10 px-6 py-5">
        {/* Profile icon circle with initials */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e60012]">
          <span className="text-xl font-bold text-white">JL</span>
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">Jzon Livingston Jr.</h1>
          <p className="text-sm text-white/60">Software Engineer · Cloud & Backend Systems</p>
        </div>
        {/* Online indicator dot (like Switch profile) */}
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-[#65bc47]" />
          <span className="text-xs text-white/50">Available</span>
        </div>
      </div>

      {/* ── Filter Tabs — Switch-style horizontal filter ── */}
      <div className="flex shrink-0 gap-1 border-b border-white/10 bg-[#3D3D3D] px-4 py-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => { setActiveFilter(filter); setSelectedEntry(null); }}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-white text-[#2D2D2D]'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* ── Activity List — Play Activity style ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            className="flex flex-col gap-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
          >
            {filtered.map((entry) => {
              const isSelected = selectedEntry === entry.id;
              return (
                <motion.div
                  key={entry.id}
                  variants={staggerItem}
                  layout
                  onClick={() => setSelectedEntry(isSelected ? null : entry.id)}
                  className={`cursor-pointer rounded-lg transition-all ${
                    isSelected
                      ? 'bg-white shadow-lg'
                      : 'bg-[#4A4A4A] hover:bg-[#5A5A5A]'
                  }`}
                >
                  <div className="flex items-center gap-4 p-4">
                    {/* Activity icon square (like game icon) */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: entry.color }}
                    >
                      <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        {entry.category === 'experience' && (
                          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z" />
                        )}
                        {entry.category === 'skills' && (
                          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" />
                        )}
                        {entry.category === 'education' && (
                          <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
                        )}
                      </svg>
                    </div>

                    {/* Activity details */}
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm font-medium ${isSelected ? 'text-[#2D2D2D]' : 'text-white'}`}>
                        {entry.title}
                      </p>
                      <p className={`mt-0.5 text-xs ${isSelected ? 'text-[#4A4A4A]' : 'text-white/60'}`}>
                        {entry.subtitle}
                      </p>
                    </div>

                    {/* Duration badge (like play time) */}
                    <div className="shrink-0 text-right">
                      <p className={`text-sm font-semibold ${isSelected ? 'text-[#2D2D2D]' : 'text-white'}`}>
                        {entry.duration}
                      </p>
                      <p className={`text-xs ${isSelected ? 'text-[#6B6B6B]' : 'text-white/40'}`}>
                        {entry.firstPlayed}
                      </p>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isSelected && entry.details && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-[#E0E0E0] px-4 pb-4 pt-3">
                          <ul className="flex flex-col gap-1.5">
                            {entry.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-2 text-xs text-[#4A4A4A]">
                                <span 
                                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" 
                                  style={{ backgroundColor: entry.color }}
                                />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Footer — Career stats summary ── */}
      <div className="shrink-0 border-t border-white/10 bg-[#3D3D3D] px-6 py-3">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Total experience: 2+ years professional</span>
          <span>{filtered.length} entries</span>
        </div>
      </div>
    </article>
  );
}

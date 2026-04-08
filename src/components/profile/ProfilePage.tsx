'use client';

import { motion } from 'framer-motion';
import { profile, type TechIcon } from '@/data/profile';
import { staggerContainer, staggerItem } from '@/lib/animations';

function TechIconSvg({ icon, color }: { icon: TechIcon['icon']; color: string }) {
  const isLight = color === '#61DAFB' || color === '#FCC624' || color === '#4EAA25';
  const fg = isLight ? '#000000' : '#ffffff';

  const paths: Record<TechIcon['icon'], React.ReactNode> = {
    python: (
      <>
        <path d="M12 2C9.1 2 7 3.1 7 4.5V6h5v.5H5.5C4.1 6.5 3 7.9 3 10s1.1 3.5 2.5 3.5H6v1.5C6 16.7 8.7 18 12 18s6-1.3 6-3V13h-.5C19 13 21 11.6 21 9.5S19 6 17.5 6H17V4.5C17 3.1 14.9 2 12 2zm-1.5 1.8a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4zM7 13v2c0 .8 2.2 1.5 5 1.5s5-.7 5-1.5v-2H7zm5.5 2a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill={fg} />
      </>
    ),
    java: (
      <>
        <path d="M8.85 17.3s-.9.5.65.68c1.88.21 2.84.18 4.91-.2 0 0 .54.34 1.3.63-4.63 1.99-10.48-.11-6.86-1.11zM8.3 14.8s-1.02.75.54.91c2.02.21 3.6.22 6.35-.3 0 0 .38.38.97.59-5.62 1.64-11.88.13-7.86-1.2z" fill={fg} />
        <path d="M12.72 10.3c1.14 1.32-.3 2.5-.3 2.5s2.9-1.49 1.57-3.36c-1.24-1.75-2.2-2.62 2.98-5.62 0 0-8.15 2.04-4.25 6.48z" fill={fg} />
        <path d="M17.65 19.05s.67.55-.73.97c-2.67.81-11.1 1.05-13.45.03-.84-.37.74-.87 1.23-.98.52-.11.81-.09.81-.09-.93-.65-6.02 1.29-2.59 1.85 9.37 1.52 17.09-.69 14.73-1.78zM9.19 12.35s-4.25 1.01-1.51 1.38c1.16.15 3.47.12 5.62-.06 1.76-.15 3.53-.46 3.53-.46s-.62.27-1.07.57c-4.31 1.13-12.63.61-10.23-.56 2.04-1 3.66-.87 3.66-.87zM15.55 16.22c4.38-2.28 2.36-4.47.94-4.17-.35.07-.5.14-.5.14s.13-.2.37-.28c2.77-1 4.91 2.88-.9 4.4 0 0 .07-.06.09-.09z" fill={fg} />
        <path d="M13.6 2s2.44 2.44-2.31 6.2c-3.8 3-0.87 4.72 0 6.68-2.22-2-3.85-3.76-2.76-5.4C10.08 7.13 14.63 5.97 13.6 2z" fill={fg} />
      </>
    ),
    cpp: (
      <text x="3" y="17" fontSize="12" fontWeight="bold" fill={fg} fontFamily="monospace">C++</text>
    ),
    typescript: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="2" fill="transparent" />
        <text x="4" y="17" fontSize="11" fontWeight="bold" fill={fg} fontFamily="monospace">TS</text>
      </>
    ),
    react: (
      <>
        <circle cx="12" cy="12" r="2.5" fill={fg} />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke={fg} strokeWidth="1.5" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke={fg} strokeWidth="1.5" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke={fg} strokeWidth="1.5" transform="rotate(120 12 12)" />
      </>
    ),
    nextjs: (
      <text x="5" y="17" fontSize="14" fontWeight="bold" fill={fg} fontFamily="sans-serif">N</text>
    ),
    nodejs: (
      <>
        <path d="M12 2L3 7v10l9 5 9-5V7L12 2z" fill="none" stroke={fg} strokeWidth="1.5" />
        <text x="8.5" y="16" fontSize="9" fontWeight="bold" fill={fg} fontFamily="monospace">JS</text>
      </>
    ),
    tailwind: (
      <>
        <path d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C13.245 10.431 14.16 11.4 16.5 11.4c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C15.255 6.969 14.34 6 12 6zM7.5 11.4C5.1 11.4 3.6 12.6 3 15c.9-1.2 1.95-1.65 3.15-1.35.685.171 1.174.668 1.715 1.219C8.745 15.831 9.66 16.8 12 16.8c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.171-1.174-.668-1.715-1.219C10.755 12.369 9.84 11.4 7.5 11.4z" fill={fg} />
      </>
    ),
    spring: (
      <>
        <path d="M20.2 2a10 10 0 1 0-4.5 13.3A10 10 0 0 0 20.2 2zm-2 11.5c-.6 1.4-2 2.5-3.7 2.5-2.2 0-4-1.8-4-4s1.8-4 4-4c1 0 1.9.4 2.6 1l-1.1 1.1c-.4-.4-1-.6-1.5-.6-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5c1.2 0 2.1-.7 2.4-1.8H14v-1.5h4.1c.1.3.1.6.1.8z" fill={fg} />
      </>
    ),
    aws: (
      <>
        <path d="M7.5 11.5c0 .4.1.7.2 1 .1.3.3.5.6.7.2.1.5.2.8.2s.6-.1.8-.3c.2-.2.4-.4.5-.7v.9h.9V9.2h-.9v.4c-.2-.2-.4-.3-.6-.4-.2-.1-.5-.1-.7-.1-.3 0-.6.1-.8.2s-.4.3-.6.5c-.1.2-.2.5-.2.8v.9zm1-1.4c.2-.2.4-.3.7-.3s.5.1.7.3c.2.2.3.4.3.7v.7c0 .3-.1.5-.3.7-.2.2-.4.3-.7.3s-.5-.1-.7-.3-.3-.4-.3-.7v-.7c0-.3.1-.5.3-.7zM12 9.2v3.1h.9v-1.7l1.3 1.7h1l-1.4-1.8 1.3-1.3H14l-1.1 1.2V9.2H12z" fill={fg} />
        <path d="M6.1 15.5c.8.5 1.8.9 2.9 1.1 1.1.2 2.2.3 3.3.1 1.1-.2 2.1-.5 2.9-1.1.1-.1.1-.2 0-.3l-.4-.4c-.1-.1-.2-.1-.3 0-.7.5-1.5.8-2.4 1-.9.2-1.8.2-2.7 0-.9-.2-1.7-.5-2.4-1-.1-.1-.2-.1-.3 0l-.4.4c0 .1 0 .2.1.3l.7.9z" fill={fg} />
      </>
    ),
    kubernetes: (
      <>
        <path d="M12 2l2.4 4.8 5.2.8-3.8 3.7.9 5.2L12 14l-4.7 2.5.9-5.2L4.4 7.6l5.2-.8L12 2z" fill="none" stroke={fg} strokeWidth="1.5" />
        <circle cx="12" cy="12" r="2" fill={fg} />
      </>
    ),
    docker: (
      <>
        <path d="M4 13h2v2H4zm3 0h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zM7 10h2v2H7zm3 0h2v2h-2zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2h-2zm3 0h2v2h-2z" fill={fg} />
        <path d="M21.8 11.5a4 4 0 0 0-2.3-1 3.5 3.5 0 0 0-3.3-4 3.5 3.5 0 0 0-1.2.2V6H13v5h8.5c.2 0 .3-.2.3-.5z" fill={fg} />
      </>
    ),
    git: (
      <>
        <path d="M21.7 11.3l-9-9a1 1 0 0 0-1.4 0l-2 2 2.5 2.5a1.2 1.2 0 0 1 1.5 1.5l2.4 2.4a1.2 1.2 0 1 1-.7.7L12.6 9a1.2 1.2 0 0 1-1.3-.3L8.9 11c.1.2.1.4.1.6a1.2 1.2 0 1 1-1.2-1.2c.2 0 .4 0 .6.1l2.4-2.4a1.2 1.2 0 0 1 0-1.6L8.4 5l-6.1 6.1a1 1 0 0 0 0 1.4l9 9a1 1 0 0 0 1.4 0l9-9a1 1 0 0 0 0-1.2z" fill={fg} />
      </>
    ),
    linux: (
      <>
        <text x="6" y="16" fontSize="16" fill={fg}>🐧</text>
      </>
    ),
    jenkins: (
      <>
        <circle cx="12" cy="8" r="5" fill="none" stroke={fg} strokeWidth="1.5" />
        <path d="M10 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" fill={fg} />
        <path d="M8 16c0-2.2 1.8-4 4-4s4 1.8 4 4H8z" fill={fg} />
      </>
    ),
    sql: (
      <>
        <ellipse cx="12" cy="7" rx="8" ry="3" fill="none" stroke={fg} strokeWidth="1.5" />
        <path d="M4 7v4c0 1.66 3.58 3 8 3s8-1.34 8-3V7" fill="none" stroke={fg} strokeWidth="1.5" />
        <path d="M4 11v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4" fill="none" stroke={fg} strokeWidth="1.5" />
      </>
    ),
    bash: (
      <>
        <text x="3" y="16" fontSize="12" fontWeight="bold" fill={fg} fontFamily="monospace">&gt;_</text>
      </>
    ),
    datadog: (
      <>
        <path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9zm-1 13l-4-4 1.4-1.4 2.6 2.6 5.6-5.6L18 9l-7 7z" fill={fg} />
      </>
    ),
    splunk: (
      <>
        <path d="M12 4l8 4.5v7L12 20l-8-4.5v-7L12 4z" fill="none" stroke={fg} strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" stroke={fg} strokeWidth="2" strokeLinecap="round" />
      </>
    ),
  };

  return (
    <svg viewBox="0 0 24 24" className="h-9 w-9" aria-hidden="true">
      {paths[icon]}
    </svg>
  );
}

export function ProfilePage() {
  return (
    <motion.div
      className="flex h-full gap-0 overflow-hidden"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Left — fullbody avatar video */}
      <motion.div
        className="hidden h-full flex-shrink-0 md:block"
        style={{ width: 'clamp(220px, 32vw, 380px)' }}
        variants={staggerItem}
      >
        <video
          src="/avatarFullbody.mp4"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload nofullscreen noremoteplayback"
          className="h-full w-full object-cover"
          style={{ objectPosition: 'center 10%' }}
        />
      </motion.div>

      {/* Right — sleek info panel */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-8 px-10 py-10">
        {/* Name + tagline */}
        <motion.div className="flex flex-col gap-2" variants={staggerItem}>
          <h1 className="text-3xl font-bold text-on-surface">{profile.name}</h1>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#48d597]" aria-hidden="true" />
            <p className="text-sm text-on-surface-muted">{profile.status}</p>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.p
          className="max-w-sm text-base leading-relaxed text-on-surface-muted"
          variants={staggerItem}
        >
          {profile.bio}
        </motion.p>

        {/* Tech icons — single row */}
        <motion.div
          className="flex gap-4"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {profile.technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={staggerItem}
              whileHover={{ scale: 1.12, y: -4 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-md"
                style={{ backgroundColor: tech.color }}
              >
                <TechIconSvg icon={tech.icon} color={tech.color} />
              </div>
              <span className="text-center text-[11px] text-on-surface-muted">
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div className="flex gap-3" variants={staggerItem}>
          {profile.socials.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-surface-elevated px-5 py-2 text-sm font-medium text-on-surface transition-opacity hover:opacity-75"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

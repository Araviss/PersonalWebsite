'use client';

import { motion } from 'framer-motion';
import { profile } from '@/data/profile';
import { staggerContainer, staggerItem, switchTransition } from '@/lib/animations';

function SkillBar({ level }: { level: number }) {
  return (
    <div className="h-1.5 flex-1 rounded-full bg-separator">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: '#48d597' }}
        initial={{ width: 0 }}
        animate={{ width: `${level}%` }}
        transition={{ ...switchTransition, duration: 0.6, delay: 0.3 }}
      />
    </div>
  );
}

export function ProfilePage() {
  return (
    <motion.div
      className="flex h-full gap-12 overflow-y-auto px-[5vw] py-8"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {/* Left column — fullbody video */}
      <motion.div
        className="hidden flex-shrink-0 md:block"
        style={{ width: 'clamp(200px, 25vw, 320px)' }}
        variants={staggerItem}
      >
        <div
          className="h-full overflow-hidden rounded-lg"
          style={{ borderRadius: '8px' }}
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
            style={{
              objectPosition: 'center 15%',
            }}
          />
        </div>
      </motion.div>

      {/* Right column — profile info */}
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        {/* Header: avatar + name + status */}
        <motion.div className="flex flex-col gap-1" variants={staggerItem}>
          <h1
            className="font-bold text-on-surface"
            style={{ fontSize: '22px' }}
          >
            {profile.name}
          </h1>
          <span
            className="text-on-surface-muted"
            style={{ fontSize: '14px' }}
          >
            {profile.tagline}
          </span>
          <span
            className="flex items-center gap-1.5"
            style={{ fontSize: '13px' }}
          >
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: '#48d597' }}
              aria-hidden="true"
            />
            <span className="text-on-surface-muted">{profile.status}</span>
          </span>
        </motion.div>

        {/* Separator */}
        <motion.hr className="border-separator" variants={staggerItem} />

        {/* Bio */}
        <motion.p
          className="text-on-surface-muted"
          style={{ fontSize: '16px', lineHeight: 1.625 }}
          variants={staggerItem}
        >
          {profile.bio}
        </motion.p>

        {/* Separator */}
        <motion.hr className="border-separator" variants={staggerItem} />

        {/* Skill Activity */}
        <motion.section variants={staggerItem}>
          <h2
            className="mb-4 font-semibold uppercase tracking-wider text-on-surface-muted"
            style={{ fontSize: '12px' }}
          >
            Skill Activity
          </h2>
          <motion.div
            className="flex flex-col"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {profile.skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex items-center gap-4 border-b border-separator py-3 last:border-b-0"
                style={{ minHeight: '64px' }}
                variants={staggerItem}
              >
                {/* Skill icon placeholder */}
                <div
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-xs font-bold text-on-surface"
                  aria-hidden="true"
                >
                  {skill.name.slice(0, 2).toUpperCase()}
                </div>
                {/* Skill info */}
                <div className="flex min-w-0 flex-1 flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span
                      className="font-medium text-on-surface"
                      style={{ fontSize: '16px' }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="flex-shrink-0 text-on-surface-muted"
                      style={{ fontSize: '13px' }}
                    >
                      {skill.proficiency}
                    </span>
                  </div>
                  <span
                    className="text-on-surface-muted"
                    style={{ fontSize: '13px' }}
                  >
                    {skill.firstUsed}
                  </span>
                  <SkillBar level={skill.level} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Separator */}
        <motion.hr className="border-separator" variants={staggerItem} />

        {/* Social links */}
        <motion.section variants={staggerItem}>
          <h2
            className="mb-4 font-semibold uppercase tracking-wider text-on-surface-muted"
            style={{ fontSize: '12px' }}
          >
            Online
          </h2>
          <div className="flex flex-wrap gap-3">
            {profile.socials.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-surface-elevated px-4 py-2 text-sm font-medium text-on-surface transition-opacity hover:opacity-80"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#48d597' }}
                  aria-hidden="true"
                />
                {link.label}
              </a>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}

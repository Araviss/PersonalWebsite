'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tileVariants, snappyTransition } from '@/lib/animations';
import type { Project } from '@/data/projects';

interface GameTileProps {
  project: Project;
  isSelected: boolean;
  onSelect: () => void;
  onLaunch: () => void;
}

export function GameTile({ project, isSelected, onSelect, onLaunch }: GameTileProps) {
  return (
    <motion.button
      className="group flex shrink-0 flex-col items-center gap-2 outline-none"
      variants={tileVariants}
      initial="idle"
      animate={isSelected ? 'selected' : 'idle'}
      whileHover="hover"
      whileTap="tap"
      onClick={onSelect}
      onDoubleClick={onLaunch}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onLaunch();
      }}
      aria-label={`${project.title}${isSelected ? ' (selected)' : ''}`}
      data-testid={`tile-${project.id}`}
    >
      {/* Cover art */}
      <div
        className={`relative h-40 w-40 overflow-hidden rounded-tile bg-surface-elevated transition-colors ${
          isSelected ? 'ring-4 ring-accent' : 'ring-2 ring-transparent'
        }`}
      >
        {project.coverArt ? (
          <Image
            src={project.coverArt}
            alt=""
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-3xl font-bold text-accent">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Title */}
      <motion.span
        className={`max-w-[200px] truncate text-sm font-medium transition-colors ${
          isSelected ? 'text-accent' : 'text-on-surface'
        }`}
        animate={{ color: isSelected ? '#00C3E3' : undefined }}
        transition={snappyTransition}
      >
        {project.title}
      </motion.span>
    </motion.button>
  );
}

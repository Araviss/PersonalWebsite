'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { tileVariants } from '@/lib/animations';
import { TileCover } from './TileCover';
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
      className="group flex shrink-0 flex-col items-center outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-highlight"
      variants={tileVariants}
      initial="idle"
      animate={isSelected ? 'selected' : 'idle'}
      whileHover="hover"
      whileTap="tap"
      onClick={() => {
        if (isSelected) {
          onLaunch();
        } else {
          onSelect();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onLaunch();
      }}
      aria-label={`${project.title}${isSelected ? ' (selected)' : ''}`}
      data-testid={`tile-${project.id}`}
    >
      {/* Cover art */}
      <div
        className={`relative w-[20vw] min-w-[112px] max-w-[400px] aspect-square overflow-hidden rounded-tile bg-surface-elevated transition-all duration-200 ease-out ${
          isSelected
            ? 'ring-[6px] ring-highlight shadow-[0_0_12px_4px] shadow-highlight-glow'
            : 'ring-[6px] ring-tile-border/40 opacity-[0.85]'
        }`}
      >
        {project.coverArt ? (
          <Image
            src={project.coverArt}
            alt=""
            fill
            className="object-contain"
            sizes="20vw"
          />
        ) : (
          <TileCover project={project} />
        )}
      </div>
    </motion.button>
  );
}

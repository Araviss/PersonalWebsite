'use client';

import { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { projects } from '@/data/projects';
import { GameTile } from './GameTile';

export function GameRow() {
  const [selectedId, setSelectedId] = useState<string | null>(
    projects[0]?.id ?? null,
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = projects.findIndex((p) => p.id === selectedId);
      if (currentIndex === -1) return;

      let nextIndex: number | null = null;
      if (e.key === 'ArrowRight') {
        nextIndex = Math.min(currentIndex + 1, projects.length - 1);
      } else if (e.key === 'ArrowLeft') {
        nextIndex = Math.max(currentIndex - 1, 0);
      }

      if (nextIndex !== null && nextIndex !== currentIndex) {
        e.preventDefault();
        setSelectedId(projects[nextIndex].id);

        // Scroll the selected tile into view
        const container = scrollRef.current;
        const tile = container?.querySelector(
          `[data-testid="tile-${projects[nextIndex].id}"]`,
        );
        tile?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    },
    [selectedId],
  );

  const handleLaunch = useCallback((projectId: string) => {
    // Phase 5: will navigate to project detail page
    console.log('Launch:', projectId);
  }, []);

  return (
    <motion.div
      ref={scrollRef}
      className="flex items-end gap-5 overflow-x-auto scroll-smooth px-5 py-4 scrollbar-none"
      style={{ scrollSnapType: 'x mandatory' }}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      role="listbox"
      aria-label="Projects"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={staggerItem}
          style={{ scrollSnapAlign: 'center' }}
          role="option"
          aria-selected={selectedId === project.id}
        >
          <GameTile
            project={project}
            isSelected={selectedId === project.id}
            onSelect={() => setSelectedId(project.id)}
            onLaunch={() => handleLaunch(project.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';
import { projects } from '@/data/projects';
import { GameTile } from './GameTile';
import { LaunchOverlay } from './LaunchOverlay';

interface GameRowProps {
  onSelectionChange?: (projectId: string | null) => void;
}

export function GameRow({ onSelectionChange }: GameRowProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(
    projects[0]?.id ?? null,
  );
  const [launchingId, setLaunchingId] = useState<string | null>(null);
  const [titleLeft, setTitleLeft] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<Map<string, HTMLElement>>(new Map());

  const launchingProject = projects.find((p) => p.id === launchingId);
  const selectedProject = projects.find((p) => p.id === selectedId);

  // Update title position immediately (no animation)
  const updateTitlePosition = useCallback(() => {
    if (!selectedId) return;
    const tileEl = tileRefs.current.get(selectedId);
    if (tileEl) {
      const rect = tileEl.getBoundingClientRect();
      setTitleLeft(rect.left);
    }
  }, [selectedId]);

  // Update on selection change and initial mount
  useEffect(() => {
    // Small delay to ensure tiles are rendered
    const timer = setTimeout(updateTitlePosition, 50);
    return () => clearTimeout(timer);
  }, [selectedId, updateTitlePosition]);

  // Update on scroll (synchronous, no animation)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      requestAnimationFrame(updateTitlePosition);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [updateTitlePosition]);

  useEffect(() => {
    onSelectionChange?.(selectedId);
  }, [selectedId, onSelectionChange]);

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
    setLaunchingId(projectId);
  }, []);

  const handleLaunchComplete = useCallback(() => {
    if (launchingId) {
      router.push(`/projects/${launchingId}`);
    }
  }, [launchingId, router]);

  return (
    <>
      {/* Title OUTSIDE scrollable container — positioned to track selected tile */}
      <div className="relative h-7 mb-1">
        <AnimatePresence mode="wait">
          {selectedProject && titleLeft !== null && (
            <motion.h2
              key={selectedProject.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              style={{ left: titleLeft }}
              className="absolute top-0 text-[clamp(14px,1.8vw,24px)] font-light italic text-highlight whitespace-nowrap"
              aria-live="polite"
            >
              {selectedProject.title}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        ref={scrollRef}
        className="flex items-center gap-[2.5vw] overflow-x-auto overflow-y-visible scroll-smooth pl-[29%] pr-4 py-2 scrollbar-none"
        style={{ scrollSnapType: 'x mandatory' }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        role="listbox"
        aria-label="Projects"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {projects.map((project) => {
          const isSelected = selectedId === project.id;
          return (
            <motion.div
              key={project.id}
              ref={(el) => {
                if (el) tileRefs.current.set(project.id, el);
              }}
              variants={staggerItem}
              style={{ scrollSnapAlign: 'center' }}
              role="option"
              aria-selected={isSelected}
            >
              <GameTile
                project={project}
                isSelected={isSelected}
                onSelect={() => setSelectedId(project.id)}
                onLaunch={() => handleLaunch(project.id)}
              />
            </motion.div>
          );
        })}
      </motion.div>

      <LaunchOverlay
        key={launchingId}
        isActive={launchingId !== null}
        projectTitle={launchingProject?.title ?? ''}
        onComplete={handleLaunchComplete}
      />
    </>
  );
}

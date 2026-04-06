'use client';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/navigation';

const navOrder = navItems.map((item) => item.href);

function getNavIndex(pathname: string): number {
  const idx = navOrder.indexOf(pathname);
  return idx === -1 ? navOrder.length : idx;
}

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevIndexRef = useRef(getNavIndex(pathname));

  const currentIndex = getNavIndex(pathname);
  // eslint-disable-next-line react-hooks/refs -- intentional: sync direction calculation for animation
  const direction = currentIndex >= prevIndexRef.current ? 1 : -1;
  // eslint-disable-next-line react-hooks/refs -- intentional: track previous index for direction
  prevIndexRef.current = currentIndex;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: direction * 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction * -50 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex flex-1 flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

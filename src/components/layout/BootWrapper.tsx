'use client';

import { useState, useEffect } from 'react';
import { BootScreen } from './BootScreen';

const STORAGE_KEY = 'jzon-boot-played';

interface BootWrapperProps {
  children: React.ReactNode;
}

export function BootWrapper({ children }: BootWrapperProps) {
  const [booting, setBooting] = useState<boolean | null>(null);

  useEffect(() => {
    const played = sessionStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: hydrate from sessionStorage on mount
    setBooting(!played);
  }, []);

  function handleComplete() {
    sessionStorage.setItem(STORAGE_KEY, '1');
    setBooting(false);
  }

  // null = not yet determined (avoid flash), render nothing until we know
  if (booting === null) return null;

  return (
    <>
      {booting && <BootScreen onComplete={handleComplete} />}
      {children}
    </>
  );
}

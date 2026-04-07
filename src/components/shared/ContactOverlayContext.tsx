'use client';

import { createContext, useContext, useState, useCallback } from 'react';

interface ContactOverlayState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const ContactOverlayContext = createContext<ContactOverlayState>({
  isOpen: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
});

export function ContactOverlayProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <ContactOverlayContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </ContactOverlayContext.Provider>
  );
}

export function useContactOverlay() {
  return useContext(ContactOverlayContext);
}

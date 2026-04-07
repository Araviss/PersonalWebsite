'use client';

import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { BottomBar } from './BottomBar';
import { PageTransition } from './PageTransition';
import { ContactOverlayProvider } from '@/components/shared/ContactOverlayContext';
import { ContactOverlay } from '@/components/contact/ContactOverlay';

interface SwitchShellProps {
  children: React.ReactNode;
}

export function SwitchShell({ children }: SwitchShellProps) {
  return (
    <ContactOverlayProvider>
      <div className="switch-content relative flex min-h-full flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex flex-1 flex-col justify-center px-5">
          <PageTransition>{children}</PageTransition>
        </main>
        <BottomNav />
        <div className="border-t border-separator" />
        <BottomBar />

        {/* Contact overlay — contained within the shell */}
        <ContactOverlay />
      </div>
    </ContactOverlayProvider>
  );
}

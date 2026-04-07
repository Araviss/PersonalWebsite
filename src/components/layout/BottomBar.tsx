'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useContactOverlay } from '@/components/shared/ContactOverlayContext';

/**
 * Handheld Mode Icon - Phone/tablet silhouette
 * Matches Switch's handheld mode indicator style
 */
function HandheldIcon() {
  return (
    <svg
      className="h-6 w-10"
      viewBox="0 0 40 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Left Joy-Con outline */}
      <rect x="1" y="1" width="12" height="22" rx="3" />
      {/* Left joystick */}
      <circle cx="7" cy="8" r="2.5" />
      {/* Left buttons */}
      <rect x="5" y="14" width="4" height="1.5" rx="0.5" fill="currentColor" />
      <rect x="5" y="17" width="4" height="1.5" rx="0.5" fill="currentColor" />
      
      {/* Right Joy-Con outline */}
      <rect x="27" y="1" width="12" height="22" rx="3" />
      {/* Right joystick */}
      <circle cx="33" cy="16" r="2.5" />
      {/* Right buttons */}
      <circle cx="33" cy="6" r="1" fill="currentColor" />
      <circle cx="36" cy="9" r="1" fill="currentColor" />
      <circle cx="33" cy="12" r="1" fill="currentColor" />
      <circle cx="30" cy="9" r="1" fill="currentColor" />
    </svg>
  );
}

/**
 * Docked Mode Icon - TV/Monitor silhouette
 * Matches Switch's docked mode indicator style
 */
function DockedIcon() {
  return (
    <svg
      className="h-6 w-8"
      viewBox="0 0 32 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* TV screen */}
      <rect x="1" y="1" width="30" height="18" rx="2" />
      {/* Stand */}
      <path d="M12 19v3M20 19v3M9 22h14" />
    </svg>
  );
}

/**
 * Bottom bar with device mode indicator and functional button prompts
 */
export function BottomBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { toggle: toggleContact } = useContactOverlay();
  const [isHandheld, setIsHandheld] = useState(true);

  // Detect device mode based on screen width
  useEffect(() => {
    const checkMode = () => {
      // Consider < 1024px as handheld, >= 1024px as docked/desktop
      setIsHandheld(window.innerWidth < 1024);
    };

    checkMode();
    window.addEventListener('resize', checkMode);
    return () => window.removeEventListener('resize', checkMode);
  }, []);

  // Determine if we're on a page that can go back
  const canGoBack = pathname !== '/';
  const isHomePage = pathname === '/';

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  const handleStart = () => {
    // On home page, "Start" could launch the selected project
    // For now, we'll just focus the tile row
    const tileRow = document.querySelector('[role="listbox"]');
    if (tileRow instanceof HTMLElement) {
      tileRow.focus();
    }
  };

  return (
    <div
      className="flex shrink-0 items-center justify-between px-5"
      style={{ height: '10vh', minHeight: '48px', maxHeight: '75px' }}
    >
      {/* Device mode indicator */}
      <span
        className="text-on-surface-muted"
        aria-label={isHandheld ? 'Handheld mode' : 'Docked mode'}
      >
        {isHandheld ? <HandheldIcon /> : <DockedIcon />}
      </span>

      {/* Controller prompts */}
      <div className="flex items-center gap-5 text-sm text-on-surface-muted">
        {/* Y — Get in Touch CTA */}
        <button
          onClick={toggleContact}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-on-surface-muted text-[10px] font-bold text-surface">
            Y
          </span>
          <span>Get in Touch</span>
        </button>

        {/* B Back - only on non-home pages */}
        {canGoBack && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-on-surface-muted text-[10px] font-bold text-surface">
              B
            </span>
            <span>Back</span>
          </button>
        )}

        {/* A Start/OK */}
        <button
          onClick={handleStart}
          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-on-surface-muted text-[10px] font-bold text-surface">
            A
          </span>
          <span>{isHomePage ? 'Start' : 'OK'}</span>
        </button>
      </div>
    </div>
  );
}

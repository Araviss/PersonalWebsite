'use client';

import { useEffect, useState } from 'react';

function useCurrentTime() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }),
      );
    }
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export function TopBar() {
  const time = useCurrentTime();

  return (
    <header
      className="flex w-full shrink-0 items-center justify-between px-5 text-on-surface-muted"
      style={{ height: 'clamp(36px, 5.19vh, 56px)' }}
      role="banner"
    >
      {/* Left: user identity */}
      <div className="flex items-center gap-2">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e60012]"
          aria-hidden="true"
          data-testid="avatar"
        >
          <span className="text-sm font-bold text-white select-none">JL</span>
        </div>
        <span className="text-base font-medium text-on-surface">Jzon Livingston</span>
      </div>

      {/* Right: status indicators — Switch style */}
      <div className="flex items-center gap-3 text-sm">
        <time dateTime={time} suppressHydrationWarning>
          {time}
        </time>
        {/* WiFi icon — Switch style: 3 curved bars */}
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-label="WiFi connected"
          role="img"
        >
          {/* Three curved arcs like Switch WiFi indicator */}
          <path d="M12 18c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1z" />
          <path d="M12 14c-1.7 0-3.24.69-4.35 1.8l1.41 1.41C9.9 16.46 10.88 16 12 16s2.1.46 2.94 1.21l1.41-1.41A6.014 6.014 0 0012 14z" />
          <path d="M12 10c-3.03 0-5.78 1.23-7.78 3.22l1.42 1.41A9.008 9.008 0 0112 12c2.48 0 4.74 1.01 6.36 2.63l1.42-1.41A10.96 10.96 0 0012 10z" />
        </svg>
        {/* Battery — Switch style: rounded rectangle with nub */}
        <div className="flex items-center" aria-label="Battery full">
          <div className="relative h-4 w-7 rounded-[3px] border-2 border-current">
            <div className="absolute inset-[2px] rounded-[1px] bg-current" />
          </div>
          <div className="h-2 w-1 rounded-r-sm bg-current" />
        </div>
      </div>
    </header>
  );
}

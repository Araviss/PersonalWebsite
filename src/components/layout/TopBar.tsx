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
      className="flex h-14 w-full shrink-0 items-center justify-between px-5 text-on-surface-muted"
      role="banner"
    >
      {/* Left: user identity */}
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded-full bg-accent"
          aria-hidden="true"
          data-testid="avatar"
        />
        <span className="text-sm font-medium text-on-surface">Portfolio</span>
      </div>

      {/* Right: status indicators */}
      <div className="flex items-center gap-3 text-xs">
        <time dateTime={time} suppressHydrationWarning>
          {time}
        </time>
        {/* WiFi icon placeholder */}
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-label="WiFi connected"
          role="img"
        >
          <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3a4.237 4.237 0 00-6 0zm-4-4l2 2a7.074 7.074 0 0110 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
        </svg>
        {/* Battery placeholder */}
        <div className="flex items-center gap-1" aria-label="Battery full">
          <div className="h-3 w-5 rounded-sm border border-current p-px">
            <div className="h-full w-full rounded-[1px] bg-current" />
          </div>
        </div>
      </div>
    </header>
  );
}

export function RotatePrompt() {
  return (
    <div
      className="rotate-prompt fixed inset-0 z-50 flex-col items-center justify-center gap-6 bg-surface-deep text-on-surface"
      role="alert"
      aria-label="Rotate your device to landscape"
    >
      {/* Rotate icon */}
      <svg
        className="h-16 w-16 text-accent animate-pulse"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-.75m-6-6l3-3m0 0l3 3m-3-3v8.25M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p className="text-lg font-medium">Rotate your device</p>
      <p className="text-sm text-on-surface-muted">
        This experience is designed for landscape mode
      </p>
    </div>
  );
}

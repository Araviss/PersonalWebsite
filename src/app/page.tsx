export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 bg-surface p-5">
      {/* Top bar placeholder */}
      <header className="flex w-full items-center justify-between text-on-surface-muted text-sm">
        <span>12:00</span>
        <div className="flex gap-3">
          <span>WiFi</span>
          <span>100%</span>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="h-40 w-40 rounded-tile bg-surface-elevated border-4 border-accent flex items-center justify-center shadow-lg">
          <span className="text-accent text-lg font-semibold">P1</span>
        </div>
        <h2 className="text-on-surface text-xl font-medium">Project 1</h2>
        <p className="text-on-surface-muted text-sm">Switch OS Theme Preview</p>
      </main>

      {/* Bottom nav placeholder */}
      <nav className="flex w-full items-center justify-center gap-8 border-t border-on-surface/20 pt-3 text-on-surface-muted text-xs">
        <span className="text-accent">Home</span>
        <span>About</span>
        <span>Resume</span>
        <span>Contact</span>
        <span>Settings</span>
      </nav>
    </div>
  );
}

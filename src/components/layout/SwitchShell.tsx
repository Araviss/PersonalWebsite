import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { RotatePrompt } from './RotatePrompt';

interface SwitchShellProps {
  children: React.ReactNode;
}

export function SwitchShell({ children }: SwitchShellProps) {
  return (
    <>
      {/* Landscape content */}
      <div className="switch-content flex min-h-full flex-1 flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col px-5 py-3">{children}</main>
        <BottomNav />
      </div>

      {/* Portrait rotation gate (shown via CSS media query) */}
      <RotatePrompt />
    </>
  );
}

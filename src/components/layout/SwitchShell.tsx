import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { BottomBar } from './BottomBar';
import { RotatePrompt } from './RotatePrompt';
import { PageTransition } from './PageTransition';

interface SwitchShellProps {
  children: React.ReactNode;
}

export function SwitchShell({ children }: SwitchShellProps) {
  return (
    <>
      {/* Landscape content */}
      <div className="switch-content flex min-h-full flex-1 flex-col">
        <TopBar />
        {/* Main content - fills space between TopBar and BottomNav */}
        <main className="flex flex-1 flex-col justify-center px-5">
          <PageTransition>{children}</PageTransition>
        </main>
        <BottomNav />
        {/* Separator between nav and prompts */}
        <div className="border-t border-separator" />
        {/* Bottom bar with device mode + button prompts */}
        <BottomBar />
      </div>

      {/* Portrait rotation gate (shown via CSS media query) */}
      <RotatePrompt />
    </>
  );
}

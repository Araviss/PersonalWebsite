import { TopBar } from './TopBar';
import { BottomNav } from './BottomNav';
import { BottomBar } from './BottomBar';
import { PageTransition } from './PageTransition';

interface SwitchShellProps {
  children: React.ReactNode;
}

export function SwitchShell({ children }: SwitchShellProps) {
  return (
    <div className="switch-content flex min-h-full flex-1 flex-col">
      <TopBar />
      <main className="flex flex-1 flex-col justify-center px-5">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
      <div className="border-t border-separator" />
      <BottomBar />
    </div>
  );
}

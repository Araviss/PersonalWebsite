import { RotatePrompt } from '@/components/layout';

export default function FullscreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="switch-content flex min-h-full flex-1 flex-col">
        {children}
      </div>
      <RotatePrompt />
    </>
  );
}

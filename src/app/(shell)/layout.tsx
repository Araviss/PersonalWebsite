import { SwitchShell, RotatePrompt } from '@/components/layout';

export default function ShellLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SwitchShell>{children}</SwitchShell>
      <RotatePrompt />
    </>
  );
}

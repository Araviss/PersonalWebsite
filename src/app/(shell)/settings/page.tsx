import type { Metadata } from 'next';
import { SettingsSection } from '@/components/settings';

export const metadata: Metadata = {
  title: 'Settings — Switch OS',
};

export default function SettingsPage() {
  return <SettingsSection />;
}

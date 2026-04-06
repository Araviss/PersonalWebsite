import type { Metadata } from 'next';
import { AboutSection } from '@/components/about';

export const metadata: Metadata = {
  title: 'About — Switch OS',
};

export default function AboutPage() {
  return <AboutSection />;
}

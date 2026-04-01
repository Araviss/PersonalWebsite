import type { Metadata } from 'next';
import { ResumeSection } from '@/components/resume';

export const metadata: Metadata = {
  title: 'Resume — Switch OS',
};

export default function ResumePage() {
  return <ResumeSection />;
}

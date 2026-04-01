import type { Metadata } from 'next';
import { ContactSection } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact — Switch OS',
};

export default function ContactPage() {
  return <ContactSection />;
}

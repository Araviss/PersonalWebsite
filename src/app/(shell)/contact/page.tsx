import type { Metadata } from 'next';
import { ContactSection } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact — Switch OS',
};

export default function ContactPage() {
  // ContactSection is a full-screen component styled like Switch Controller Pairing
  // It has its own header/content/footer structure
  return <ContactSection />;
}

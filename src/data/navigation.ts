/** Navigation items for the bottom nav bar. */

export interface NavItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon name (will map to a component) */
  icon: string;
  /** Route path */
  href: string;
}

export const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: 'home', href: '/' },
  { id: 'about', label: 'About', icon: 'person', href: '/about' },
  { id: 'resume', label: 'Resume', icon: 'document', href: '/resume' },
  { id: 'contact', label: 'Contact', icon: 'mail', href: '/contact' },
  { id: 'settings', label: 'Settings', icon: 'gear', href: '/settings' },
];

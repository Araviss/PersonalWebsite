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
  { id: 'about', label: 'News', icon: 'news', href: '/about' },
  { id: 'resume', label: 'Resume', icon: 'shop', href: '/resume' },
  { id: 'settings', label: 'Settings', icon: 'gear', href: '/settings' },
];

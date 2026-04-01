import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BottomNav } from './BottomNav';
import { navItems } from '@/data/navigation';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('BottomNav', () => {
  it('renders navigation landmark', () => {
    render(<BottomNav />);
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders all nav items as links', () => {
    render(<BottomNav />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(navItems.length);
  });

  it('renders labels for all nav items', () => {
    render(<BottomNav />);
    for (const item of navItems) {
      expect(screen.getByText(item.label)).toBeInTheDocument();
    }
  });

  it('marks the active route with aria-current', () => {
    render(<BottomNav />);
    const homeLink = screen.getByRole('link', { name: /Home/i });
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark inactive routes with aria-current', () => {
    render(<BottomNav />);
    const aboutLink = screen.getByRole('link', { name: /About/i });
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('links to correct hrefs', () => {
    render(<BottomNav />);
    for (const item of navItems) {
      const link = screen.getByRole('link', { name: new RegExp(item.label, 'i') });
      expect(link).toHaveAttribute('href', item.href);
    }
  });
});

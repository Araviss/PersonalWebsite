import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

  it('renders nav items as links (except resume which is a button)', () => {
    render(<BottomNav />);
    const links = screen.getAllByRole('link');
    // Resume is a button, so 4 links
    expect(links).toHaveLength(navItems.length - 1);
  });

  it('renders resume as a download button', () => {
    render(<BottomNav />);
    const resumeButton = screen.getByRole('button', { name: /download resume/i });
    expect(resumeButton).toBeInTheDocument();
  });

  it('renders labels for all nav items', () => {
    render(<BottomNav />);
    // All labels should now be visible (active and inactive)
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('News')).toBeInTheDocument();
    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('marks the active route with aria-current', () => {
    render(<BottomNav />);
    // Home link at '/' is active — find by href since label may not be accessible name
    const links = screen.getAllByRole('link');
    const homeLink = links.find((l) => l.getAttribute('href') === '/');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('does not mark inactive routes with aria-current', () => {
    render(<BottomNav />);
    const links = screen.getAllByRole('link');
    const aboutLink = links.find((l) => l.getAttribute('href') === '/about');
    expect(aboutLink).not.toHaveAttribute('aria-current');
  });

  it('opens resume modal when resume button is clicked', () => {
    render(<BottomNav />);
    const resumeButton = screen.getByRole('button', { name: /download resume/i });
    fireEvent.click(resumeButton);
    // Modal should appear
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Download Jzon Livingston/)).toBeInTheDocument();
  });

  it('closes resume modal when cancel is clicked', async () => {
    render(<BottomNav />);
    const resumeButton = screen.getByRole('button', { name: /download resume/i });
    fireEvent.click(resumeButton);
    
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    fireEvent.click(cancelButton);
    
    // Modal should be closed (wait for animation)
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});

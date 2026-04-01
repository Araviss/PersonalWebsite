import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('renders the heading', () => {
    render(<ContactSection />);
    expect(screen.getByRole('heading', { level: 1, name: /contact/i })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<ContactSection />);
    expect(screen.getByText(/always open to interesting conversations/i)).toBeInTheDocument();
  });

  it('renders email link', () => {
    render(<ContactSection />);
    const emailLink = screen.getByRole('link', { name: /email/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('renders GitHub link with external attributes', () => {
    render(<ContactSection />);
    const ghLink = screen.getByRole('link', { name: /github/i });
    expect(ghLink).toHaveAttribute('href', 'https://github.com');
    expect(ghLink).toHaveAttribute('target', '_blank');
    expect(ghLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders LinkedIn link', () => {
    render(<ContactSection />);
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument();
  });

  it('renders availability status', () => {
    render(<ContactSection />);
    expect(screen.getByText(/currently open to new opportunities/i)).toBeInTheDocument();
  });
});

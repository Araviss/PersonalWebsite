import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ContactSection } from './ContactSection';

describe('ContactSection', () => {
  it('renders 4 contact slots', () => {
    render(<ContactSection />);
    const slots = screen.getAllByRole('button');
    expect(slots).toHaveLength(4);
  });

  it('renders LinkedIn slot', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/linkedin/i)).toBeInTheDocument();
  });

  it('renders GitHub slot', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  });

  it('renders Email slot', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it('renders X / Twitter slot', () => {
    render(<ContactSection />);
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
  });
});

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders the heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { level: 1, name: /about me/i })).toBeInTheDocument();
  });

  it('renders the role subtitle', () => {
    render(<AboutSection />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders the biography section', () => {
    render(<AboutSection />);
    expect(screen.getByLabelText(/biography/i)).toBeInTheDocument();
  });

  it('renders skills', () => {
    render(<AboutSection />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('renders interests', () => {
    render(<AboutSection />);
    expect(screen.getByText('Open Source')).toBeInTheDocument();
    expect(screen.getByText('AI/ML Tooling')).toBeInTheDocument();
  });

  it('renders the avatar initials', () => {
    render(<AboutSection />);
    expect(screen.getByText('NS')).toBeInTheDocument();
  });
});

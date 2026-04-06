import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResumeSection } from './ResumeSection';

describe('ResumeSection', () => {
  it('renders the profile name heading', () => {
    render(<ResumeSection />);
    expect(screen.getByRole('heading', { level: 1, name: /jzon livingston/i })).toBeInTheDocument();
  });

  it('renders filter tabs', () => {
    render(<ResumeSection />);
    expect(screen.getByRole('button', { name: 'All Activity' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Skills' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Education' })).toBeInTheDocument();
  });

  it('shows all entries on All Activity tab by default', () => {
    render(<ResumeSection />);
    // Check for experience and education entries
    expect(screen.getByText(/Liberty Mutual/)).toBeInTheDocument();
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
  });

  it('filters to Experience category', () => {
    render(<ResumeSection />);
    fireEvent.click(screen.getByRole('button', { name: 'Experience' }));
    expect(screen.getByText(/Liberty Mutual/)).toBeInTheDocument();
    expect(screen.getByText(/Epsilon Systems/)).toBeInTheDocument();
  });

  it('renders duration labels (play time style)', () => {
    render(<ResumeSection />);
    // Multiple entries have duration labels
    expect(screen.getAllByText(/\d\+? year/i).length).toBeGreaterThan(0);
  });

  it('renders company/subtitle info', () => {
    render(<ResumeSection />);
    expect(screen.getByText(/Liberty Mutual/)).toBeInTheDocument();
    expect(screen.getByText(/Florida International University/)).toBeInTheDocument();
  });
});

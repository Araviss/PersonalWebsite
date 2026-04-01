import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResumeSection } from './ResumeSection';

describe('ResumeSection', () => {
  it('renders the heading', () => {
    render(<ResumeSection />);
    expect(screen.getByRole('heading', { level: 1, name: /resume/i })).toBeInTheDocument();
  });

  it('renders the experience section', () => {
    render(<ResumeSection />);
    expect(screen.getByLabelText(/work experience/i)).toBeInTheDocument();
  });

  it('renders job roles', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders company names', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Acme Corp')).toBeInTheDocument();
    expect(screen.getByText('StartupCo')).toBeInTheDocument();
  });

  it('renders job highlights', () => {
    render(<ResumeSection />);
    expect(screen.getByText(/migration of monolith/i)).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(<ResumeSection />);
    expect(screen.getByLabelText(/education/i)).toBeInTheDocument();
    expect(screen.getByText('B.S. Computer Science')).toBeInTheDocument();
    expect(screen.getByText('University of Technology')).toBeInTheDocument();
  });

  it('renders time periods', () => {
    render(<ResumeSection />);
    expect(screen.getByText('2023 – Present')).toBeInTheDocument();
    expect(screen.getByText('2021 – 2023')).toBeInTheDocument();
  });
});

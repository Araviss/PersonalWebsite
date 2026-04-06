import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '@/data/projects';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

const mockProject: Project = {
  id: 'test-proj',
  title: 'Test Project',
  coverArt: '',
  description: 'A cool test project.',
  techStack: ['TypeScript', 'React', 'Next.js'],
  links: [
    { label: 'GitHub', url: 'https://github.com/example' },
    { label: 'Live Demo', url: 'https://example.com' },
  ],
};

describe('ProjectDetail', () => {
  it('renders the project title', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByRole('heading', { level: 1, name: 'Test Project' })).toBeInTheDocument();
  });

  it('renders the project description', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText('A cool test project.')).toBeInTheDocument();
  });

  it('renders all tech stack items', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
  });

  it('renders project links with correct attributes', () => {
    render(<ProjectDetail project={mockProject} />);
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders back button', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByLabelText('Back to home')).toBeInTheDocument();
  });

  it('renders controller button prompts for links', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText('A')).toBeInTheDocument();
    expect(screen.getByText('Y')).toBeInTheDocument();
  });

  it('renders article with project name in label', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByLabelText('Test Project project details')).toBeInTheDocument();
  });

  it('does not render action links when empty', () => {
    const noLinksProject = { ...mockProject, links: [] };
    render(<ProjectDetail project={noLinksProject} />);
    expect(screen.queryByText('A')).not.toBeInTheDocument();
  });

  it('renders role when provided', () => {
    const withRole = { ...mockProject, role: 'Lead Developer' };
    render(<ProjectDetail project={withRole} />);
    expect(screen.getByText('Lead Developer')).toBeInTheDocument();
  });

  it('falls back to Portfolio Project when no role', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByText('Portfolio Project')).toBeInTheDocument();
  });
});

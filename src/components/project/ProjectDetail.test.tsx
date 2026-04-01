import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectDetail } from './ProjectDetail';
import type { Project } from '@/data/projects';

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

  it('renders tech stack section with label', () => {
    render(<ProjectDetail project={mockProject} />);
    expect(screen.getByLabelText('Tech stack')).toBeInTheDocument();
  });

  it('renders project links', () => {
    render(<ProjectDetail project={mockProject} />);
    const githubLink = screen.getByText('GitHub ↗');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/example');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders home link', () => {
    render(<ProjectDetail project={mockProject} />);
    const homeLink = screen.getByLabelText('Return to home');
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('does not render links section when empty', () => {
    const noLinksProject = { ...mockProject, links: [] };
    render(<ProjectDetail project={noLinksProject} />);
    expect(screen.queryByLabelText('Project links')).not.toBeInTheDocument();
  });
});

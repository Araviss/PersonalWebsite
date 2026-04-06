import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameTile } from './GameTile';
import type { Project } from '@/data/projects';

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  coverArt: '/images/covers/test.png',
  description: 'A test project',
  techStack: ['TypeScript'],
  links: [{ label: 'GitHub', url: 'https://github.com' }],
};

describe('GameTile', () => {
  const defaultProps = {
    project: mockProject,
    isSelected: false,
    onSelect: vi.fn(),
    onLaunch: vi.fn(),
  };

  it('renders with project title as label', () => {
    render(<GameTile {...defaultProps} />);
    expect(screen.getByLabelText('Test Project')).toBeInTheDocument();
  });

  it('has accessible label with project title', () => {
    render(<GameTile {...defaultProps} />);
    // Title is shown at page level, but tile has aria-label for accessibility
    expect(screen.getByRole('button', { name: 'Test Project' })).toBeInTheDocument();
  });

  it('renders cover art image when provided', () => {
    render(<GameTile {...defaultProps} />);
    const img = document.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img?.getAttribute('src')).toContain('test.png');
  });

  it('renders tile cover when no cover art image', () => {
    const noCoverProject = { ...mockProject, coverArt: '' };
    render(<GameTile {...defaultProps} project={noCoverProject} />);
    // TileCover renders title + tech badge inside the tile
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('calls onSelect on click', () => {
    const onSelect = vi.fn();
    render(<GameTile {...defaultProps} onSelect={onSelect} />);
    fireEvent.click(screen.getByLabelText('Test Project'));
    expect(onSelect).toHaveBeenCalledOnce();
  });

  it('calls onLaunch on Enter key', () => {
    const onLaunch = vi.fn();
    render(<GameTile {...defaultProps} onLaunch={onLaunch} />);
    fireEvent.keyDown(screen.getByLabelText('Test Project'), { key: 'Enter' });
    expect(onLaunch).toHaveBeenCalledOnce();
  });

  it('includes selected in label when selected', () => {
    render(<GameTile {...defaultProps} isSelected />);
    expect(screen.getByLabelText('Test Project (selected)')).toBeInTheDocument();
  });

  it('has test id with project id', () => {
    render(<GameTile {...defaultProps} />);
    expect(screen.getByTestId('tile-test-project')).toBeInTheDocument();
  });
});

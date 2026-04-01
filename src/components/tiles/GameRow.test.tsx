import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameRow } from './GameRow';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Mock projects data
vi.mock('@/data/projects', () => ({
  projects: [
    {
      id: 'proj-a',
      title: 'Project A',
      coverArt: '',
      description: 'First',
      techStack: ['TS'],
      links: [],
    },
    {
      id: 'proj-b',
      title: 'Project B',
      coverArt: '',
      description: 'Second',
      techStack: ['TS'],
      links: [],
    },
    {
      id: 'proj-c',
      title: 'Project C',
      coverArt: '',
      description: 'Third',
      techStack: ['TS'],
      links: [],
    },
  ],
}));

describe('GameRow', () => {
  it('renders a listbox with Projects label', () => {
    render(<GameRow />);
    expect(screen.getByRole('listbox', { name: 'Projects' })).toBeInTheDocument();
  });

  it('renders all projects as options', () => {
    render(<GameRow />);
    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
  });

  it('selects first project by default', () => {
    render(<GameRow />);
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
    expect(options[1]).toHaveAttribute('aria-selected', 'false');
  });

  it('selects a project on click', () => {
    render(<GameRow />);
    fireEvent.click(screen.getByTestId('tile-proj-b'));
    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
    expect(options[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('navigates right with ArrowRight key', () => {
    render(<GameRow />);
    const listbox = screen.getByRole('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowRight' });
    const options = screen.getAllByRole('option');
    expect(options[1]).toHaveAttribute('aria-selected', 'true');
  });

  it('navigates left with ArrowLeft key', () => {
    render(<GameRow />);
    const listbox = screen.getByRole('listbox');
    // Go right first, then left
    fireEvent.keyDown(listbox, { key: 'ArrowRight' });
    fireEvent.keyDown(listbox, { key: 'ArrowLeft' });
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });

  it('does not go past the last project on ArrowRight', () => {
    render(<GameRow />);
    const listbox = screen.getByRole('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowRight' });
    fireEvent.keyDown(listbox, { key: 'ArrowRight' });
    fireEvent.keyDown(listbox, { key: 'ArrowRight' }); // past end
    const options = screen.getAllByRole('option');
    expect(options[2]).toHaveAttribute('aria-selected', 'true');
  });

  it('does not go before the first project on ArrowLeft', () => {
    render(<GameRow />);
    const listbox = screen.getByRole('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowLeft' }); // already at start
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveAttribute('aria-selected', 'true');
  });
});

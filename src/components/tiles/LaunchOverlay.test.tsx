import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { LaunchOverlay } from './LaunchOverlay';

beforeEach(() => {
  vi.useFakeTimers();
});

describe('LaunchOverlay', () => {
  it('does not render when inactive', () => {
    render(<LaunchOverlay isActive={false} projectTitle="Test" onComplete={vi.fn()} />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders overlay when active', () => {
    render(<LaunchOverlay isActive={true} projectTitle="Test" onComplete={vi.fn()} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has accessible label with project title', () => {
    render(<LaunchOverlay isActive={true} projectTitle="My Project" onComplete={vi.fn()} />);
    expect(screen.getByLabelText('Launching My Project')).toBeInTheDocument();
  });

  it('shows project title during logo phase', async () => {
    render(<LaunchOverlay isActive={true} projectTitle="My Project" onComplete={vi.fn()} />);
    await act(async () => {
      vi.advanceTimersByTime(350);
    });
    expect(screen.getByText('My Project')).toBeInTheDocument();
  });

  it('shows project initial during logo phase', async () => {
    render(<LaunchOverlay isActive={true} projectTitle="My Project" onComplete={vi.fn()} />);
    await act(async () => {
      vi.advanceTimersByTime(350);
    });
    expect(screen.getByText('M')).toBeInTheDocument();
  });

  it('calls onComplete after animation', async () => {
    const onComplete = vi.fn();
    render(<LaunchOverlay isActive={true} projectTitle="Test" onComplete={onComplete} />);
    await act(async () => {
      vi.advanceTimersByTime(900);
    });
    expect(onComplete).toHaveBeenCalledOnce();
  });
});

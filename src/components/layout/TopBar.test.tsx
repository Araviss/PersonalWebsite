import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopBar } from './TopBar';

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 3, 1, 14, 30));
});

describe('TopBar', () => {
  it('renders with banner role', () => {
    render(<TopBar />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the site name', () => {
    render(<TopBar />);
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  it('renders an avatar placeholder', () => {
    render(<TopBar />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders time element', () => {
    render(<TopBar />);
    const timeEl = document.querySelector('time');
    expect(timeEl).toBeInTheDocument();
  });

  it('renders wifi icon', () => {
    render(<TopBar />);
    expect(screen.getByLabelText('WiFi connected')).toBeInTheDocument();
  });

  it('renders battery indicator', () => {
    render(<TopBar />);
    expect(screen.getByLabelText('Battery full')).toBeInTheDocument();
  });
});

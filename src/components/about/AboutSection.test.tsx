import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AboutSection } from './AboutSection';

describe('AboutSection', () => {
  it('renders the News heading', () => {
    render(<AboutSection />);
    expect(screen.getByRole('heading', { level: 1, name: /news/i })).toBeInTheDocument();
  });

  it('renders a grid of news cards', () => {
    render(<AboutSection />);
    const buttons = screen.getAllByRole('button');
    // 8 card buttons + 1 back button (only when detail open) → just card buttons for now
    expect(buttons.length).toBeGreaterThanOrEqual(8);
  });

  it('renders article titles in the grid', () => {
    render(<AboutSection />);
    expect(screen.getByText(/console-quality design obsession/i)).toBeInTheDocument();
    expect(screen.getByText(/microservices migration/i)).toBeInTheDocument();
    expect(screen.getByText(/go-to stack/i)).toBeInTheDocument();
    expect(screen.getByText(/smash, keyboards, coffee/i)).toBeInTheDocument();
  });

  it('opens detail panel when a card is clicked', () => {
    render(<AboutSection />);
    const card = screen.getByLabelText(/console-quality design obsession/i);
    fireEvent.click(card);
    // Detail panel shows the body text
    expect(screen.getByText(/every animation, every transition/i)).toBeInTheDocument();
    // And a back button
    expect(screen.getByText(/back to news/i)).toBeInTheDocument();
  });

  it('closes detail panel when back button is clicked', async () => {
    render(<AboutSection />);
    const card = screen.getByLabelText(/console-quality design obsession/i);
    fireEvent.click(card);
    const back = screen.getByText(/back to news/i);
    fireEvent.click(back);
    // AnimatePresence exit animation may delay removal — wait for it
    await waitFor(() => {
      expect(screen.queryByText(/every animation, every transition/i)).not.toBeInTheDocument();
    });
  });

  it('renders overlay text on card thumbnails', () => {
    render(<AboutSection />);
    expect(screen.getByText('About Me')).toBeInTheDocument();
    expect(screen.getByText('Career')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });

  it('renders Find Channels button in the header', () => {
    render(<AboutSection />);
    expect(screen.getByText(/find channels/i)).toBeInTheDocument();
  });
});

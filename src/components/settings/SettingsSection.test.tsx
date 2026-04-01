import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsSection } from './SettingsSection';
import { ThemeProvider } from '@/components/shared/ThemeProvider';

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <SettingsSection />
    </ThemeProvider>,
  );
}

describe('SettingsSection', () => {
  beforeEach(() => {
    // Reset data-theme and localStorage
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.clear();
  });

  it('renders the heading', () => {
    renderWithTheme();
    expect(screen.getByRole('heading', { level: 1, name: /settings/i })).toBeInTheDocument();
  });

  it('renders the theme toggle', () => {
    renderWithTheme();
    expect(screen.getByRole('switch', { name: /toggle theme/i })).toBeInTheDocument();
  });

  it('shows current theme mode', () => {
    renderWithTheme();
    expect(screen.getByText('Dark mode')).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    renderWithTheme();
    const toggle = screen.getByRole('switch', { name: /toggle theme/i });
    expect(toggle).toHaveAttribute('aria-checked', 'false');

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText('Light mode')).toBeInTheDocument();
  });

  it('renders the disabled sound toggle', () => {
    renderWithTheme();
    const soundToggle = screen.getByRole('switch', { name: /toggle sound/i });
    expect(soundToggle).toHaveAttribute('aria-disabled', 'true');
  });

  it('renders version info', () => {
    renderWithTheme();
    expect(screen.getByText(/portfolio os v1\.0\.0/i)).toBeInTheDocument();
  });
});

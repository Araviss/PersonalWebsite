import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.clear();
  });

  it('renders the heading', () => {
    renderWithTheme();
    expect(screen.getByRole('heading', { level: 1, name: /system settings/i })).toBeInTheDocument();
  });

  it('renders sidebar categories', () => {
    renderWithTheme();
    expect(screen.getByRole('button', { name: 'Themes' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Internet' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'System' })).toBeInTheDocument();
  });

  it('shows theme options by default', () => {
    renderWithTheme();
    expect(screen.getByText('Basic White')).toBeInTheDocument();
    expect(screen.getByText('Basic Black')).toBeInTheDocument();
  });

  it('toggles to System content on click', async () => {
    renderWithTheme();
    fireEvent.click(screen.getByRole('button', { name: 'System' }));
    await waitFor(() => {
      expect(screen.getByText('System Update')).toBeInTheDocument();
    });
    expect(screen.getByText(/current system version/i)).toBeInTheDocument();
  });

  it('shows system info values', async () => {
    renderWithTheme();
    fireEvent.click(screen.getByRole('button', { name: 'System' }));
    await waitFor(() => {
      expect(screen.getByText('Portfolio OS')).toBeInTheDocument();
    });
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('switches theme when clicking Basic White', () => {
    renderWithTheme();
    fireEvent.click(screen.getByText('Basic White'));
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SwitchShell } from './SwitchShell';

// Mock next/navigation for BottomNav and BottomBar
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    back: vi.fn(),
    push: vi.fn(),
  }),
}));

describe('SwitchShell', () => {
  it('renders children inside main element', () => {
    render(
      <SwitchShell>
        <div data-testid="child">Content</div>
      </SwitchShell>,
    );
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders TopBar', () => {
    render(
      <SwitchShell>
        <div>Content</div>
      </SwitchShell>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders BottomNav', () => {
    render(
      <SwitchShell>
        <div>Content</div>
      </SwitchShell>,
    );
    expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
  });

  it('renders RotatePrompt', () => {
    render(
      <SwitchShell>
        <div>Content</div>
      </SwitchShell>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });
});

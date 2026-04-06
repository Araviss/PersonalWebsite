import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfilePage } from './ProfilePage';
import { profile } from '@/data/profile';

// Mock framer-motion to avoid animation complexity in tests
const MOTION_PROPS = new Set([
  'variants', 'initial', 'animate', 'whileHover', 'whileTap',
  'exit', 'transition', 'whileInView', 'viewport',
]);

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion');
  const React = await import('react');

  const handler: ProxyHandler<object> = {
    get(_target, prop: string) {
      return React.forwardRef(function MotionStub(
        props: Record<string, unknown>,
        ref: React.Ref<HTMLElement>,
      ) {
        const rest: Record<string, unknown> = {};
        for (const [k, v] of Object.entries(props)) {
          if (!MOTION_PROPS.has(k)) rest[k] = v;
        }
        return React.createElement(prop, { ...rest, ref });
      });
    },
  };

  return {
    ...actual,
    motion: new Proxy({}, handler),
  };
});

describe('ProfilePage', () => {
  it('renders the user name', () => {
    render(<ProfilePage />);
    expect(screen.getByText(profile.name)).toBeInTheDocument();
  });

  it('renders the tagline', () => {
    render(<ProfilePage />);
    expect(screen.getByText(profile.tagline)).toBeInTheDocument();
  });

  it('renders the bio', () => {
    render(<ProfilePage />);
    expect(screen.getByText(profile.bio)).toBeInTheDocument();
  });

  it('renders the availability status', () => {
    render(<ProfilePage />);
    expect(screen.getByText(profile.status)).toBeInTheDocument();
  });

  it('renders all skills', () => {
    render(<ProfilePage />);
    for (const skill of profile.skills) {
      expect(screen.getByText(skill.name)).toBeInTheDocument();
    }
  });

  it('renders skill proficiency labels', () => {
    render(<ProfilePage />);
    const uniqueLabels = [...new Set(profile.skills.map((s) => s.proficiency))];
    for (const label of uniqueLabels) {
      const count = profile.skills.filter((s) => s.proficiency === label).length;
      expect(screen.getAllByText(label)).toHaveLength(count);
    }
  });

  it('renders social links', () => {
    render(<ProfilePage />);
    for (const link of profile.socials) {
      const el = screen.getByText(link.label);
      expect(el.closest('a')).toHaveAttribute('href', link.url);
    }
  });

  it('renders section labels', () => {
    render(<ProfilePage />);
    expect(screen.getByText('Skill Activity')).toBeInTheDocument();
    expect(screen.getByText('Online')).toBeInTheDocument();
  });

  it('renders the fullbody video', () => {
    render(<ProfilePage />);
    const video = document.querySelector('video[src="/avatarFullbody.mp4"]');
    expect(video).toBeInTheDocument();
  });
});

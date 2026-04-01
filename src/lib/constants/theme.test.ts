import { describe, it, expect } from 'vitest';
import { colors, typography, animation } from './theme';

describe('Theme design tokens', () => {
  it('has dark theme colors defined', () => {
    expect(colors.dark.bgPrimary).toBe('#2D2D2D');
    expect(colors.dark.accent).toBe('#00C3E3');
    expect(colors.dark.white).toBe('#FFFFFF');
  });

  it('has light theme colors defined', () => {
    expect(colors.light.bgPrimary).toBe('#EBEBEB');
    expect(colors.light.accent).toBe('#00C3E3');
  });

  it('has typography scale defined', () => {
    expect(typography.sizes.base).toBe('1rem');
    expect(typography.weights.regular).toBe(400);
  });

  it('has animation durations defined', () => {
    expect(animation.duration.fast).toBeLessThan(animation.duration.normal);
    expect(animation.duration.launch).toBeGreaterThan(animation.duration.slow);
  });
});

import { describe, it, expect } from 'vitest';
import { colors, typography, animation, zIndex, breakpoints } from './theme';

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

  it('has z-index scale in ascending order', () => {
    expect(zIndex.base).toBeLessThan(zIndex.tiles);
    expect(zIndex.tiles).toBeLessThan(zIndex.nav);
    expect(zIndex.nav).toBeLessThan(zIndex.overlay);
    expect(zIndex.overlay).toBeLessThan(zIndex.modal);
    expect(zIndex.modal).toBeLessThan(zIndex.rotatePrompt);
  });

  it('has breakpoints in ascending order', () => {
    expect(breakpoints.sm).toBeLessThan(breakpoints.md);
    expect(breakpoints.md).toBeLessThan(breakpoints.lg);
    expect(breakpoints.lg).toBeLessThan(breakpoints.xl);
  });
});

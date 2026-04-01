import { describe, it, expect } from 'vitest';
import {
  tileVariants,
  launchOverlayVariants,
  pageVariants,
  wakeUpVariants,
  fadeVariants,
  staggerContainer,
  staggerItem,
  switchTransition,
  snappyTransition,
  launchTransition,
} from './animations';

describe('Animation variants', () => {
  it('tile variants have required states', () => {
    expect(tileVariants).toHaveProperty('idle');
    expect(tileVariants).toHaveProperty('hover');
    expect(tileVariants).toHaveProperty('tap');
    expect(tileVariants).toHaveProperty('selected');
  });

  it('tile hover scales up', () => {
    const hover = tileVariants.hover as Record<string, unknown>;
    expect(hover.scale).toBeGreaterThan(1);
  });

  it('tile tap scales down', () => {
    const tap = tileVariants.tap as Record<string, unknown>;
    expect(tap.scale).toBeLessThan(1);
  });

  it('launch overlay has hidden/visible/exit', () => {
    expect(launchOverlayVariants).toHaveProperty('hidden');
    expect(launchOverlayVariants).toHaveProperty('visible');
    expect(launchOverlayVariants).toHaveProperty('exit');
  });

  it('page variants have initial/enter/exit', () => {
    expect(pageVariants).toHaveProperty('initial');
    expect(pageVariants).toHaveProperty('enter');
    expect(pageVariants).toHaveProperty('exit');
  });

  it('wake-up variants have asleep/awake', () => {
    expect(wakeUpVariants).toHaveProperty('asleep');
    expect(wakeUpVariants).toHaveProperty('awake');
  });

  it('fade variants have hidden/visible', () => {
    expect(fadeVariants).toHaveProperty('hidden');
    expect(fadeVariants).toHaveProperty('visible');
  });

  it('stagger container configures staggerChildren', () => {
    const visible = staggerContainer.visible as Record<string, unknown>;
    const transition = visible.transition as Record<string, number>;
    expect(transition.staggerChildren).toBeGreaterThan(0);
  });

  it('stagger item animates opacity and y', () => {
    const hidden = staggerItem.hidden as Record<string, unknown>;
    expect(hidden.opacity).toBe(0);
    expect(hidden.y).toBeDefined();
  });

  it('shared transitions have valid durations', () => {
    expect(switchTransition.duration).toBe(0.2);
    expect(snappyTransition.duration).toBe(0.15);
    expect(launchTransition.duration).toBe(0.5);
  });
});

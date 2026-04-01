import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RotatePrompt } from './RotatePrompt';

describe('RotatePrompt', () => {
  it('renders with alert role', () => {
    render(<RotatePrompt />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('has accessible label', () => {
    render(<RotatePrompt />);
    expect(
      screen.getByLabelText('Rotate your device to landscape'),
    ).toBeInTheDocument();
  });

  it('displays rotate message', () => {
    render(<RotatePrompt />);
    expect(screen.getByText('Rotate your device')).toBeInTheDocument();
  });

  it('displays landscape explanation', () => {
    render(<RotatePrompt />);
    expect(
      screen.getByText('This experience is designed for landscape mode'),
    ).toBeInTheDocument();
  });
});

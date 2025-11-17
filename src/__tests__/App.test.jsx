import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Test passes if no error is thrown
    expect(true).toBe(true);
  });

  it('renders Pokemon app', () => {
    render(<App />);
    // Look for the main title
    expect(screen.getByText(/Pokédex Explorer/)).toBeInTheDocument();
  });
});
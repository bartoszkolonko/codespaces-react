import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Pokemon app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Pokédex Explorer/i);
  expect(titleElement).toBeDefined();
});

test('renders without crashing', () => {
  render(<App />);
  expect(true).toBe(true);
});

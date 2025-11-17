import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonApp from '../PokemonApp';

// Mock the API service
vi.mock('../../services/pokeApiService', () => ({
  default: {
    getPokemon: vi.fn(),
    getRandomPokemonId: vi.fn(() => 25),
  },
}));

describe('PokemonApp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<PokemonApp />);
    expect(true).toBe(true); // Test passes if no error is thrown
  });

  it('renders the main title', () => {
    render(<PokemonApp />);
    expect(screen.getByText(/Pokédex Explorer/)).toBeInTheDocument();
  });

  it('renders search interface', () => {
    render(<PokemonApp />);
    expect(screen.getByPlaceholderText(/Enter Pokemon name or ID/)).toBeInTheDocument();
    expect(screen.getByText(/Random Pokemon/)).toBeInTheDocument();
  });

  it('displays welcome message when no Pokemon is loaded', () => {
    render(<PokemonApp />);
    expect(screen.getByText('Welcome to the Pokédex!')).toBeInTheDocument();
  });
});
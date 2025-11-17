import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PokemonApp from '../PokemonApp';
import pokeApiService from '../../services/pokeApiService';

// Mock the API service
vi.mock('../../services/pokeApiService', () => ({
  default: {
    getPokemon: vi.fn(),
  },
}));

describe('PokemonApp', () => {
  it('renders the main title and search interface', () => {
    render(<PokemonApp />);
    
    expect(screen.getByText('🔍 Pokédex Explorer')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Pokemon name or ID/)).toBeInTheDocument();
    expect(screen.getByText('🎲 Random Pokemon')).toBeInTheDocument();
  });

  it('displays welcome message when no Pokemon is loaded', () => {
    render(<PokemonApp />);
    
    expect(screen.getByText('Welcome to the Pokédex!')).toBeInTheDocument();
    expect(screen.getByText('Search for any Pokemon by name or ID number to get started.')).toBeInTheDocument();
  });

  it('shows loading state when searching for Pokemon', async () => {
    // Mock a delayed API response
    pokeApiService.getPokemon.mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve({}), 100))
    );

    render(<PokemonApp />);
    
    const searchInput = screen.getByPlaceholderText(/Enter Pokemon name or ID/);
    const searchButton = screen.getByRole('button', { name: /🔍/ });
    
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });
    fireEvent.click(searchButton);
    
    expect(screen.getByText('Searching for Pokemon...')).toBeInTheDocument();
  });

  it('displays error message for invalid Pokemon', async () => {
    // Mock API error
    pokeApiService.getPokemon.mockRejectedValue(new Error('Pokemon not found'));

    render(<PokemonApp />);
    
    const searchInput = screen.getByPlaceholderText(/Enter Pokemon name or ID/);
    const searchButton = screen.getByRole('button', { name: /🔍/ });
    
    fireEvent.change(searchInput, { target: { value: 'invalidpokemon' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText(/Pokemon "invalidpokemon" not found/)).toBeInTheDocument();
    });
  });

  it('displays Pokemon data when search is successful', async () => {
    const mockPokemon = {
      id: 25,
      name: 'pikachu',
      sprites: {
        other: {
          'official-artwork': {
            front_default: 'https://example.com/pikachu.png'
          }
        }
      },
      types: [{ type: { name: 'electric' } }],
      height: 40,
      weight: 60,
      abilities: [{ ability: { name: 'static' } }]
    };

    pokeApiService.getPokemon.mockResolvedValue(mockPokemon);

    render(<PokemonApp />);
    
    const searchInput = screen.getByPlaceholderText(/Enter Pokemon name or ID/);
    const searchButton = screen.getByRole('button', { name: /🔍/ });
    
    fireEvent.change(searchInput, { target: { value: 'pikachu' } });
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('#025')).toBeInTheDocument();
      expect(screen.getByText('electric')).toBeInTheDocument();
    });
  });
});
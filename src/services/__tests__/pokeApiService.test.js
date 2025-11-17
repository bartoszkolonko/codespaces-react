import { describe, it, expect, vi } from 'vitest';
import pokeApiService from '../pokeApiService';

// Mock fetch globally
global.fetch = vi.fn();

describe('pokeApiService', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('getPokemon', () => {
    it('fetches Pokemon data successfully', async () => {
      const mockPokemon = {
        id: 25,
        name: 'pikachu',
        types: [{ type: { name: 'electric' } }]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemon,
      });

      const result = await pokeApiService.getPokemon('pikachu');

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/pikachu');
      expect(result).toEqual(mockPokemon);
    });

    it('throws error for non-existent Pokemon', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(pokeApiService.getPokemon('invalidpokemon')).rejects.toThrow(
        'Pokemon not found: invalidpokemon'
      );
    });

    it('handles network errors', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(pokeApiService.getPokemon('pikachu')).rejects.toThrow('Network error');
    });
  });

  describe('getPokemonList', () => {
    it('fetches Pokemon list with default parameters', async () => {
      const mockList = {
        count: 1010,
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }
        ]
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockList,
      });

      const result = await pokeApiService.getPokemonList();

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
      expect(result).toEqual(mockList);
    });

    it('fetches Pokemon list with custom parameters', async () => {
      const mockList = { count: 1010, results: [] };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockList,
      });

      await pokeApiService.getPokemonList(50, 100);

      expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=50&offset=100');
    });
  });

  describe('getRandomPokemonId', () => {
    it('returns a random ID between 1 and 1010', () => {
      // Mock Math.random to return a specific value
      const mockMath = Object.create(global.Math);
      mockMath.random = () => 0.5;
      global.Math = mockMath;

      const randomId = pokeApiService.getRandomPokemonId();

      expect(randomId).toBe(506); // (0.5 * 1010) + 1 = 506
      expect(randomId).toBeGreaterThanOrEqual(1);
      expect(randomId).toBeLessThanOrEqual(1010);
    });
  });
});
// PokeAPI service for fetching Pokemon data
const BASE_URL = 'https://pokeapi.co/api/v2';

class PokeApiService {
  /**
   * Fetch a Pokemon by name or ID
   * @param {string|number} nameOrId - Pokemon name or ID
   * @returns {Promise<Object>} Pokemon data
   */
  async getPokemon(nameOrId) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${nameOrId.toString().toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Pokemon not found: ${nameOrId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      throw error;
    }
  }

  /**
   * Fetch a list of Pokemon with pagination
   * @param {number} limit - Number of Pokemon to fetch (default: 20)
   * @param {number} offset - Number of Pokemon to skip (default: 0)
   * @returns {Promise<Object>} Pokemon list data
   */
  async getPokemonList(limit = 20, offset = 0) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Failed to fetch Pokemon list');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  /**
   * Fetch Pokemon species information
   * @param {string|number} nameOrId - Pokemon species name or ID
   * @returns {Promise<Object>} Pokemon species data
   */
  async getPokemonSpecies(nameOrId) {
    try {
      const response = await fetch(`${BASE_URL}/pokemon-species/${nameOrId.toString().toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Pokemon species not found: ${nameOrId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon species:', error);
      throw error;
    }
  }

  /**
   * Fetch Pokemon type information
   * @param {string|number} nameOrId - Type name or ID
   * @returns {Promise<Object>} Type data
   */
  async getPokemonType(nameOrId) {
    try {
      const response = await fetch(`${BASE_URL}/type/${nameOrId.toString().toLowerCase()}`);
      if (!response.ok) {
        throw new Error(`Pokemon type not found: ${nameOrId}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching Pokemon type:', error);
      throw error;
    }
  }

  /**
   * Get a random Pokemon ID between 1 and 1010 (current total)
   * @returns {number} Random Pokemon ID
   */
  getRandomPokemonId() {
    return Math.floor(Math.random() * 1010) + 1;
  }
}

export default new PokeApiService();
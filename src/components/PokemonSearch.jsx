import React, { useState } from 'react';
import './PokemonSearch.css';

const PokemonSearch = ({ onSearch, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchError, setSearchError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = searchTerm.trim();
    
    if (!term) {
      setSearchError('Please enter a Pokemon name or ID');
      return;
    }
    
    // Validate if it's a number, ensure it's within valid range
    if (!isNaN(term)) {
      const id = parseInt(term);
      if (id < 1 || id > 1010) {
        setSearchError('Pokemon ID must be between 1 and 1010');
        return;
      }
    }
    
    setSearchError('');
    onSearch(term);
  };

  const handleRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;
    setSearchTerm(randomId.toString());
    onSearch(randomId);
  };

  return (
    <div className="pokemon-search">
      <form onSubmit={handleSubmit} className="pokemon-search__form">
        <div className="pokemon-search__input-group">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter Pokemon name or ID (1-1010)..."
            className="pokemon-search__input"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="pokemon-search__button pokemon-search__button--search"
          >
            {isLoading ? (
              <span className="pokemon-search__spinner"></span>
            ) : (
              '🔍'
            )}
          </button>
        </div>
        
        <button
          type="button"
          onClick={handleRandomPokemon}
          disabled={isLoading}
          className="pokemon-search__button pokemon-search__button--random"
        >
          🎲 Random Pokemon
        </button>
      </form>
      
      {searchError && (
        <div className="pokemon-search__error">
          {searchError}
        </div>
      )}
      
      <div className="pokemon-search__suggestions">
        <p className="pokemon-search__hint">
          Try: "pikachu", "charizard", "25", or click Random!
        </p>
      </div>
    </div>
  );
};

export default PokemonSearch;
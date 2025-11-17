import React, { useState } from 'react';
import PokemonSearch from './PokemonSearch';
import PokemonCard from './PokemonCard';
import PokemonDetails from './PokemonDetails';
import pokeApiService from '../services/pokeApiService';
import './PokemonApp.css';

const PokemonApp = () => {
  const [pokemon, setPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError('');
    
    try {
      const pokemonData = await pokeApiService.getPokemon(searchTerm);
      setPokemon(pokemonData);
    } catch (err) {
      setError(`Pokemon "${searchTerm}" not found. Please try a different name or ID.`);
      setPokemon(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseDetails = () => {
    setSelectedPokemon(null);
  };

  return (
    <div className="pokemon-app">
      <div className="pokemon-app__header">
        <h1 className="pokemon-app__title">
          🔍 Pokédex Explorer
        </h1>
        <p className="pokemon-app__subtitle">
          Discover amazing Pokemon from the world of Pokémon!
        </p>
      </div>
      
      <PokemonSearch onSearch={handleSearch} isLoading={isLoading} />
      
      {error && (
        <div className="pokemon-app__error">
          <span className="pokemon-app__error-icon">⚠️</span>
          {error}
        </div>
      )}
      
      {isLoading && (
        <div className="pokemon-app__loading">
          <div className="pokemon-app__pokeball-loader">
            <div className="pokemon-app__pokeball-loader-inner"></div>
          </div>
          <p>Searching for Pokemon...</p>
        </div>
      )}
      
      {pokemon && !isLoading && (
        <div className="pokemon-app__result">
          <PokemonCard pokemon={pokemon} onClick={handleCardClick} />
        </div>
      )}
      
      {selectedPokemon && (
        <PokemonDetails 
          pokemon={selectedPokemon} 
          onClose={handleCloseDetails} 
        />
      )}
      
      {!pokemon && !isLoading && !error && (
        <div className="pokemon-app__welcome">
          <div className="pokemon-app__welcome-content">
            <h2>Welcome to the Pokédex!</h2>
            <p>Search for any Pokemon by name or ID number to get started.</p>
            <div className="pokemon-app__features">
              <div className="pokemon-app__feature">
                🔍 <span>Search by name or ID</span>
              </div>
              <div className="pokemon-app__feature">
                🎲 <span>Discover random Pokemon</span>
              </div>
              <div className="pokemon-app__feature">
                📊 <span>View detailed stats</span>
              </div>
              <div className="pokemon-app__feature">
                🖼️ <span>See official artwork</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemonApp;
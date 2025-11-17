import React from 'react';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, onClick }) => {
  if (!pokemon) return null;

  const pokemonId = pokemon.id.toString().padStart(3, '0');
  const primaryType = pokemon.types[0]?.type?.name || 'unknown';

  return (
    <div 
      className={`pokemon-card pokemon-card--${primaryType}`}
      onClick={() => onClick && onClick(pokemon)}
    >
      <div className="pokemon-card__header">
        <span className="pokemon-card__id">#{pokemonId}</span>
        <h3 className="pokemon-card__name">{pokemon.name}</h3>
      </div>
      
      <div className="pokemon-card__image-container">
        <img
          className="pokemon-card__image"
          src={pokemon.sprites?.other?.['official-artwork']?.front_default || 
               pokemon.sprites?.front_default || 
               '/pokemon-placeholder.png'}
          alt={pokemon.name}
          onError={(e) => {
            e.target.src = '/pokemon-placeholder.png';
          }}
        />
      </div>
      
      <div className="pokemon-card__info">
        <div className="pokemon-card__types">
          {pokemon.types?.map((type) => (
            <span 
              key={type.type.name}
              className={`pokemon-card__type pokemon-card__type--${type.type.name}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
        
        <div className="pokemon-card__stats">
          <div className="pokemon-card__stat">
            <span className="pokemon-card__stat-label">Height</span>
            <span className="pokemon-card__stat-value">{(pokemon.height / 10).toFixed(1)}m</span>
          </div>
          <div className="pokemon-card__stat">
            <span className="pokemon-card__stat-label">Weight</span>
            <span className="pokemon-card__stat-value">{(pokemon.weight / 10).toFixed(1)}kg</span>
          </div>
        </div>
        
        <div className="pokemon-card__abilities">
          <span className="pokemon-card__abilities-label">Abilities:</span>
          {pokemon.abilities?.slice(0, 2).map((ability, index) => (
            <span key={ability.ability.name} className="pokemon-card__ability">
              {ability.ability.name}
              {index < pokemon.abilities.slice(0, 2).length - 1 && ', '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
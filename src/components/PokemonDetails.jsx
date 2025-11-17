import React from 'react';
import './PokemonDetails.css';

const PokemonDetails = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const pokemonId = pokemon.id.toString().padStart(3, '0');

  return (
    <div className="pokemon-details-overlay" onClick={onClose}>
      <div className="pokemon-details" onClick={(e) => e.stopPropagation()}>
        <button className="pokemon-details__close" onClick={onClose}>
          ✕
        </button>
        
        <div className="pokemon-details__header">
          <h2 className="pokemon-details__name">{pokemon.name}</h2>
          <span className="pokemon-details__id">#{pokemonId}</span>
        </div>
        
        <div className="pokemon-details__content">
          <div className="pokemon-details__image-section">
            <img
              className="pokemon-details__image"
              src={pokemon.sprites?.other?.['official-artwork']?.front_default || 
                   pokemon.sprites?.front_default}
              alt={pokemon.name}
            />
            
            <div className="pokemon-details__sprites">
              <img src={pokemon.sprites?.front_default} alt={`${pokemon.name} front`} />
              <img src={pokemon.sprites?.back_default} alt={`${pokemon.name} back`} />
              {pokemon.sprites?.front_shiny && (
                <img src={pokemon.sprites?.front_shiny} alt={`${pokemon.name} shiny`} />
              )}
            </div>
          </div>
          
          <div className="pokemon-details__info-section">
            <div className="pokemon-details__basic-info">
              <div className="pokemon-details__types">
                {pokemon.types?.map((type) => (
                  <span 
                    key={type.type.name}
                    className={`pokemon-details__type pokemon-details__type--${type.type.name}`}
                  >
                    {type.type.name}
                  </span>
                ))}
              </div>
              
              <div className="pokemon-details__measurements">
                <div className="pokemon-details__measurement">
                  <span className="pokemon-details__measurement-label">Height</span>
                  <span className="pokemon-details__measurement-value">
                    {(pokemon.height / 10).toFixed(1)}m
                  </span>
                </div>
                <div className="pokemon-details__measurement">
                  <span className="pokemon-details__measurement-label">Weight</span>
                  <span className="pokemon-details__measurement-value">
                    {(pokemon.weight / 10).toFixed(1)}kg
                  </span>
                </div>
                <div className="pokemon-details__measurement">
                  <span className="pokemon-details__measurement-label">Base Experience</span>
                  <span className="pokemon-details__measurement-value">
                    {pokemon.base_experience}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="pokemon-details__abilities">
              <h3>Abilities</h3>
              <div className="pokemon-details__ability-list">
                {pokemon.abilities?.map((ability) => (
                  <div key={ability.ability.name} className="pokemon-details__ability">
                    <span className="pokemon-details__ability-name">
                      {ability.ability.name}
                    </span>
                    {ability.is_hidden && (
                      <span className="pokemon-details__ability-badge">Hidden</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pokemon-details__stats">
              <h3>Base Stats</h3>
              <div className="pokemon-details__stats-list">
                {pokemon.stats?.map((stat) => (
                  <div key={stat.stat.name} className="pokemon-details__stat">
                    <div className="pokemon-details__stat-info">
                      <span className="pokemon-details__stat-name">
                        {stat.stat.name.replace('-', ' ')}
                      </span>
                      <span className="pokemon-details__stat-value">
                        {stat.base_stat}
                      </span>
                    </div>
                    <div className="pokemon-details__stat-bar">
                      <div 
                        className="pokemon-details__stat-fill"
                        style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pokemon-details__moves">
              <h3>Sample Moves</h3>
              <div className="pokemon-details__move-list">
                {pokemon.moves?.slice(0, 6).map((move) => (
                  <span key={move.move.name} className="pokemon-details__move">
                    {move.move.name.replace('-', ' ')}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
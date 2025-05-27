import React, { useState, useEffect } from 'react';
import './PokemonDetail.css';

function PokemonDetail({ pokemon, onClose }) {
  const [isVisible, setIsVisible] = useState(false);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    fetchPokemonSpecies();
  }, [pokemon]);

  const fetchPokemonSpecies = async () => {
    try {
      const response = await fetch(pokemon.species.url);
      const data = await response.json();
      setPokemonSpecies(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Pokemon species:', error);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500); // Espera a animação terminar
  };

  const getEnglishFlavorText = () => {
    if (!pokemonSpecies) return '';
    const englishEntry = pokemonSpecies.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
  };

  const playPokemonCry = () => {
    const audio = new Audio(`https://play.pokemonshowdown.com/audio/cries/${pokemon.name}.mp3`);
    audio.play().catch(err => console.log('Error playing sound:', err));
  };

  return (
    <div className={`pokemon-detail-overlay ${isVisible ? 'visible' : ''}`}>
      <div className="pokemon-detail-modal">
        <div className="detail-header">
          <h2>#{pokemon.id.toString().padStart(3, '0')} {pokemon.name.toUpperCase()}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        
        <div className="detail-content">
          <div className="detail-left">
            <div className="pokemon-image-showcase">
              <img 
                src={pokemon.sprites.other['official-artwork'].front_default}
                alt={pokemon.name}
                className="pokemon-artwork"
              />
              <div className="sprite-container">
                <img 
                  src={pokemon.sprites.versions['generation-v']['black-white'].animated?.front_default || pokemon.sprites.front_default}
                  alt={`${pokemon.name} sprite`}
                  className="pokemon-sprite"
                />
              </div>
            </div>
            <button className="cry-button" onClick={playPokemonCry}>
              <span className="sound-icon">🔊</span> Play Cry
            </button>
          </div>

          <div className="detail-right">
            <div className="pokemon-types">
              {pokemon.types.map(type => (
                <span key={type.type.name} className={`type-badge large ${type.type.name}`}>
                  {type.type.name.toUpperCase()}
                </span>
              ))}
            </div>

            <div className="pokemon-stats">
              {pokemon.stats.map(stat => (
                <div key={stat.stat.name} className="stat-bar">
                  <span className="stat-name">
                    {stat.stat.name.toUpperCase().replace('-', ' ')}
                  </span>
                  <div className="stat-bar-container">
                    <div 
                      className="stat-bar-fill"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    >
                      {stat.base_stat}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pokemon-info">
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Height</span>
                  <span className="info-value">{pokemon.height / 10}m</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Weight</span>
                  <span className="info-value">{pokemon.weight / 10}kg</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Abilities</span>
                  <span className="info-value">
                    {pokemon.abilities.map(ability => 
                      ability.ability.name.replace('-', ' ')
                    ).join(', ')}
                  </span>
                </div>
              </div>
            </div>

            <div className="pokedex-entry">
              <h3>Pokédex Entry</h3>
              <p>{!loading && getEnglishFlavorText()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
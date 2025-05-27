import React, { useState } from 'react';
import './PokemonCard.css';
import PokemonDetail from './PokemonDetail';

function PokemonCard({ pokemon }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDetail, setShowDetail] = useState(false); // Novo estado para controlar o modal

  // Obter o sprite animado (frente) ou imagem estática
  const staticImage = pokemon.sprites.other['official-artwork'].front_default;
  const animatedSprite = pokemon.sprites.versions['generation-v']['black-white'].animated?.front_default || 
                        pokemon.sprites.front_default;

  // Função para lidar com o clique no card
  const handleClick = () => {
    const audio = new Audio('/select.mp3');
    audio.play().catch(err => console.log('Erro ao tocar o som:', err));
    setShowDetail(true);
  };

  return (
    <>
      <div 
        className="pokemon-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick} // Adicionado o evento de clique
      >
        <div className="pokemon-image-container">
          <img 
            src={staticImage}
            alt={pokemon.name}
            className={`pokemon-image static ${isHovered ? 'fade-out' : 'fade-in'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <img 
            src={animatedSprite}
            alt={`${pokemon.name} animated`}
            className={`pokemon-image animated ${isHovered ? 'fade-in' : 'fade-out'}`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        <div className="pokemon-info">
          <h3>#{pokemon.id.toString().padStart(3, '0')} {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
          <div className="pokemon-types">
            {pokemon.types.map(type => (
              <span 
                key={type.type.name}
                className={`type-badge ${type.type.name}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de detalhes do Pokémon */}
      {showDetail && (
        <PokemonDetail 
          pokemon={pokemon} 
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}

export default PokemonCard;
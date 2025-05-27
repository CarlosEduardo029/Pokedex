import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

function PokemonList({ pokemons }) {
  return (
    <div className="pokemon-list">
      {pokemons.map(pokemon => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
}

export default PokemonList;
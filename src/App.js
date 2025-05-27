import React, { useState, useEffect } from 'react';
import './App.css';
import PokemonList from './components/PokemonList';
import Filters from './components/Filters';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingFinished, setLoadingFinished] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const getGenerationRange = (generation) => {
    const ranges = {
      '1': { start: 1, end: 151 },
      '2': { start: 152, end: 251 },
      '3': { start: 252, end: 386 },
      '4': { start: 387, end: 493 },
      '5': { start: 494, end: 649 },
      '6': { start: 650, end: 721 },
      '7': { start: 722, end: 809 },
      '8': { start: 810, end: 898 },
      '9': { start: 899, end: 1008 }
    };
    return ranges[generation];
  };

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1008');
      const data = await response.json();
      
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return res.json();
        })
      );
      
      setPokemons(pokemonDetails);
      setFilteredPokemons(pokemonDetails);
      
      // Adiciona um pequeno delay antes de esconder a tela de loading
      setTimeout(() => {
        setLoadingFinished(true);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching Pokemon:', error);
      setLoadingFinished(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const handleFilter = (type, generation) => {
    let filtered = [...pokemons];
    
    // Filtrar por tipo
    if (type) {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(t => t.type.name === type)
      );
    }
    
    // Filtrar por geração
    if (generation) {
      const range = getGenerationRange(generation);
      filtered = filtered.filter(pokemon => 
        pokemon.id >= range.start && pokemon.id <= range.end
      );
    }
    
    setFilteredPokemons(filtered);
    setSelectedType(type);
    setSelectedGeneration(generation);
  };

  return (
    <div className="app">
      {loading && (
        <LoadingScreen finished={loadingFinished} />
      )}
      <div className={`pokedex ${loading ? 'hidden' : 'visible'}`}>
        <div className="pokedex-left">
          <div className="pokedex-left-top">
            <div className="light-container">
              <div className="light large"></div>
              <div className="lights-small">
                <div className="light small red"></div>
                <div className="light small yellow"></div>
                <div className="light small green"></div>
              </div>
            </div>
          </div>
          <div className="pokedex-screen-container">
            <div className="pokedex-screen">
              <PokemonList pokemons={filteredPokemons} />
            </div>
          </div>
          <div className="pokedex-left-bottom">
            <div className="d-pad">
              <button className="d-pad-btn up"></button>
              <button className="d-pad-btn right"></button>
              <button className="d-pad-btn down"></button>
              <button className="d-pad-btn left"></button>
              <div className="d-pad-center"></div>
            </div>
            <div className="control-buttons">
              <div className="control-button red"></div>
              <div className="control-button blue"></div>
            </div>
          </div>
        </div>
        <div className="pokedex-right">
          <div className="pokedex-right-top">
            <h1>Pokédex</h1>
          </div>
          <div className="filters-container">
            <Filters 
              onFilterChange={handleFilter}
              selectedType={selectedType}
              selectedGeneration={selectedGeneration}
            />
          </div>
          <div className="pokedex-info">
            <div className="info-screen">
              <p>Total Pokémon: {filteredPokemons.length}</p>
              {selectedType && <p>Type: {selectedType}</p>}
              {selectedGeneration && <p>Gen: {selectedGeneration}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
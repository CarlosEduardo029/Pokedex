import React from 'react';
import './Filters.css';

const types = [
  'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 
  'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 
  'steel', 'fairy'
];

const generations = [
  { id: '1', range: '1-151' },
  { id: '2', range: '152-251' },
  { id: '3', range: '252-386' },
  { id: '4', range: '387-493' },
  { id: '5', range: '494-649' },
  { id: '6', range: '650-721' },
  { id: '7', range: '722-809' },
  { id: '8', range: '810-898' },
  { id: '9', range: '899-1008' }
];

function Filters({ onFilterChange, selectedType, selectedGeneration }) {
  return (
    <div className="filters">
      <div className="filter-section">
        <label>Type:</label>
        <select 
          value={selectedType}
          onChange={(e) => onFilterChange(e.target.value, selectedGeneration)}
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-section">
        <label>Generation:</label>
        <select
          value={selectedGeneration}
          onChange={(e) => onFilterChange(selectedType, e.target.value)}
        >
          <option value="">All Generations</option>
          {generations.map(gen => (
            <option key={gen.id} value={gen.id}>
              Gen {gen.id} (#{gen.range})
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Filters;
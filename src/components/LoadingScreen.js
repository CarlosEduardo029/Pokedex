import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="pokeball">
        <div className="pokeball-top"></div>
        <div className="pokeball-middle">
          <div className="pokeball-button"></div>
        </div>
        <div className="pokeball-bottom"></div>
        <div className="shine"></div>
      </div>
      <div className="loading-text">Carregando Pokédex...</div>
    </div>
  );
}

export default LoadingScreen;
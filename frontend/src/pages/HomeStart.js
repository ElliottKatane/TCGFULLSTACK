import React from "react";
import "../CSS/HomeStart.css";

function HomeStart() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TCG</h1>
        <div className="buttons-container">
          <button className="button">Nouveau jeu</button>
          <button className="button">Continuer</button>
          <button className="button">Règles du jeu</button>
        </div>
      </header>
    </div>
  );
}

export default HomeStart;

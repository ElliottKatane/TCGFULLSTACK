// HomeStart.jsx
import React from "react";
import "../CSS/HomeStart.css";

const HomeStart = () => {
  return (
    <div className="homestart background-image">
      <header className="homestart-header">
        <h1>TCG</h1>
        <div className="homestart-buttons-container">
          <a
            href="https://frontend-tcg-eli.onrender.com/signup"
            className="homestart-button"
          >
            Nouveau jeu
          </a>
          <a
            href="https://frontend-tcg-eli.onrender.com/login"
            className="homestart-button"
          >
            Continuer
          </a>
          <a
            href="https://frontend-tcg-eli.onrender.com/rules"
            className="homestart-button"
          >
            Règles du jeu
          </a>
        </div>
      </header>
    </div>
  );
};

export default HomeStart;

import React from "react";
import "../CSS/HPBar.css"; // Assurez-vous de créer ce fichier CSS pour les styles de la barre

// La valeur de la barre de HP, entre 0 et 100
const HPBar = ({ value }) => {
  // Déterminez la largeur de la partie verte (hp restants) et la largeur de la partie rouge (hp faibles)
  let greenWidth = value;
  let redWidth = 0;

  // Si le pourcentage est < à 30, la partie verte est à 0 et la partie rouge prend la place
  if (value <= 30) {
    greenWidth = 0;
    redWidth = value;
  }

  return (
    // hpBarClass est une variable qui contient la classe CSS à utiliser
    <div className="hp-bar">
      <div
        className="hp-fill hp-green"
        style={{ width: `${greenWidth}%` }}
      ></div>
      <div className="hp-fill hp-red" style={{ width: `${redWidth}%` }}></div>^
      <p className="hp-number">{value}</p>
    </div>
  );
};

export default HPBar;

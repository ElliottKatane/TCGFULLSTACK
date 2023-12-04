import React from "react";
import "../CSS/StatsBar.css";

// La valeur de la barre de HP, entre 0 et 100
const StatsBar = ({ HPValue, currentMana, manaPool, isPlayer }) => {
  // largeur de la partie verte (hp restants) et la largeur de la partie rouge (hp faibles)
  let greenWidth = HPValue;
  let redWidth = 0;

  // Si le pourcentage est < à 30, la partie verte est à 0 et la partie rouge prend la place
  if (HPValue <= 30) {
    greenWidth = 0;
    redWidth = HPValue;
  }

  return (
    <div className="hp-bar">
      <div
        className="hp-fill hp-green"
        style={{ width: `${greenWidth}%` }}
      ></div>
      <div className="hp-fill hp-red" style={{ width: `${redWidth}%` }}></div>^
      <p className="hp-number">{HPValue}</p>
      {isPlayer ? (
        <div className="manadisplay">
         {currentMana}/{manaPool}
        </div>
      ) : null}
    </div>
  );
};

export default StatsBar;

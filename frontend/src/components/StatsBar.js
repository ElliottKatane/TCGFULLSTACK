import React from "react";
import { useState,useEffect } from "react";
import "../CSS/StatsBar.css";

// La valeur de la barre de HP, entre 0 et 100
const StatsBar = ({ HPValue, currentMana, manaPool, isPlayer }) => {

  const [initialHealth, setInitialHealth] = useState(null);

  // Use effect to set the initial health once when HPValue is available
  useEffect(() => {
    if (HPValue !== null && initialHealth === null) {
      setInitialHealth(HPValue);
    }
  }, [HPValue, initialHealth]);

  // If initialHealth is not yet set, return null or loading indicator
  if (initialHealth === null) {
    return <p>Loading...</p>;
  }

  // Calculate the percentage of HP remaining based on the constant MAXHP
  const MAXHP = initialHealth;
  const percentageRemaining = (HPValue / MAXHP) * 100;

  // largeur de la partie verte (hp restants) et la largeur de la partie rouge (hp faibles)
  let greenWidth = percentageRemaining;
  let redWidth = 0;

  // Si le pourcentage est < à 30, la partie verte est à 0 et la partie rouge prend la place
  if (percentageRemaining <= 30) {
    greenWidth = 0;
    redWidth = percentageRemaining;
  }

  return (
    <div className="hp-bar">
      <div
        className="hp-fill hp-green"
        style={{ width: `${greenWidth}%` }}
      ></div>
      <div className="hp-fill hp-red" style={{ width: `${redWidth}%` }}></div>
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

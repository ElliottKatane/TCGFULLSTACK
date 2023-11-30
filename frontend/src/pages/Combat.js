import { useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import Player from "../components/Player";
import CardBoard from "../components/CardBoard";
import Monster from "../components/Monster";
import TurnButton from "../components/TurnButton"; // Importez le nouveau composant
import "../CSS/Combat.css";
import "../CSS/Card.css";

//redux imports

const Combat = () => {
  // monster data through redux
  const { mapLevel } = useParams();

  return (
    <div
      className="combat-container"
      style={{
        backgroundImage: `url(/api/levels/${mapLevel}/backgroundImage)`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      {/* Composants Player and Monster */}
      <div className="container-player-monster">
        <Player />
        <Monster />
      </div>

      {/* Composant CardBoard */}
      <div className="cardboard-container">
        <div className="cardboard">
          <CardBoard />
        </div>
      </div>

      {/* Boutin fin du tour */}
      <div className="fintourbtn">
        <TurnButton />
      </div>
    </div>
  );
};

export default Combat;

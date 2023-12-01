import React from "react";
import Player from "../components/Player";
import CardBoard from "../components/CardBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Monster from "../components/Monster";
import "../CSS/Combat.css";
import "../CSS/Positions.css";
import "../CSS/Card.css";

//redux imports

const Combat = () => {
  // monster data through redux
  const { mapLevel } = useParams();
  const [currentlyPlaying, setCurrentlyPlaying] = useState("player");

  const [isDamagePopupVisible, setIsDamagePopupVisible] = useState(false);
  const [damageValue, setDamageValue] = useState(0);

  const handleFinTour = () => {
    if (currentlyPlaying === "player") {
      setCurrentlyPlaying("enemy");
      console.log("Tour de l'ennemi");
    } else {
      setCurrentlyPlaying("player");
    }
  };

  useEffect(() => {
    if (currentlyPlaying === "enemy") {
      console.log("Tour de l'ennemi");
    }
  }, [currentlyPlaying]);

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


      {/* Composant CardBoard */}
      <div className="cardboard-container">
        <div className="cardboard">
          <CardBoard />
        </div>
      </div>

            {/* Composants Player and Monster */}
            <div className="container-player-monster">
        <Player />
        <Monster />
      </div>

      {/* Boutin fin du tour */}
      {/* <div className="fintourbtn">
        <button onClick={handleFinTour}>
          End {currentlyPlaying === "player" ? "Player" : "Enemy"} Turn
        </button>
      </div> */}

      {/* <div className="damage-popup-container">
        {isDamagePopupVisible && (
          <div className="damage-popup">{damageValue}</div>
          )}</div> */}

          
    </div>
  );
};

export default Combat;

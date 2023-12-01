import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

import React from "react";
import Player from "../components/Player";
import CardBoard from "../components/CardBoard";
import Monster from "../components/Monster";
import SwitchTurnButton from "../components/SwitchTurnButton"; // Importez le nouveau composant
import "../CSS/Combat.css";
import "../CSS/Card.css";

//redux imports

const Combat = () => {
  const { user } = useAuthContext();
  const { mapLevel } = useParams();

  // Empêche l'utilisateur d'accéder par l'url à un niveau de carte > à son levelReached
  const userLevelReached = user ? user.levelReached : 1;
  const parsedMapLevel = parseInt(mapLevel, 10);
  if (!user || parsedMapLevel > userLevelReached) {
    // Redirect to the appropriate map level or login page
    return <Navigate to={user ? `/combat/${userLevelReached}` : "/login"} />;
  }

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
        <SwitchTurnButton />
      </div>
    </div>
  );
};

export default Combat;

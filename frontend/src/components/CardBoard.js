import React from "react";
// import CardATK from "./CardATK";
// import CardDEF from "./CardDEF";
import "../CSS/Cardboard.css";
import Card from "./Card";

const CardBoard = ({ attaquerLoup, currentMana, manaPool }) => {
  return (
    <div className="cardboard-container">
      <Card />
      {/* Card component from backend. Retrieves x random cards (determined in cardController) */}
      <div className="manadisplay">
        Mana: {currentMana}/{manaPool}
      </div>
    </div>
  );
};

export default CardBoard;

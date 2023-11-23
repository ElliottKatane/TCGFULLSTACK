import React from "react";
// import CardATK from "./CardATK";
// import CardDEF from "./CardDEF";
import "../CSS/Cardboard.css";
import Card from "./Card";

const CardBoard = ({ currentMana, manaPool }) => {
  return (
    <div className="cardboard-container">
      <div className="manadisplay">
        Mana: {currentMana}/{manaPool}
      </div>
      <Card />
      {/* Card component from backend. Retrieves x random cards (determined in cardController) */}
    </div>
  );
};

export default CardBoard;

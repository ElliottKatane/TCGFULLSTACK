import React from "react";
// import CardATK from "./CardATK";
// import CardDEF from "./CardDEF";
import "../CSS/Cardboard.css";
import Card from "./Card";

const CardBoard = ({ attaquerLoup, currentMana, manaPool }) => {
  // Function to decrease Enemy's HP
  const handleAttack = (ATKvalue) => {
    attaquerLoup(ATKvalue); // Decrease Loup's HP by ATKvalue
  };

  return (
    <div className="cardboard-container">
      <Card />
      <div className="manadisplay">
        Mana: {currentMana}/{manaPool}
      </div>
    </div>
  );
};

export default CardBoard;

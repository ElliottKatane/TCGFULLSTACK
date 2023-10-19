import React from "react";
// import CardATK from "./CardATK";
// import CardDEF from "./CardDEF";
import "../CSS/Cardboard.css";
import Card from "./Card";

const CardBoard = ({ attaquerLoup, currentMana, manaPool }) => {
  // Function to decrease Enemy's HP
  const handleAttack = (ATKvalue) => {
    const valeurAttaque = parseInt(ATKvalue);

    attaquerLoup(ATKvalue); // Decrease Loup's HP by ATKvalue
  };

  return (
    <div className="cardboard-container">
      {/* <CardATK ATKvalue={6} name="Strike" onAttaque={handleAttack} />
      <CardATK ATKvalue={8} name="Strike" onAttaque={handleAttack} />
      <CardATK ATKvalue={10} name="Strike" onAttaque={handleAttack} /> */}
      <Card /> {/* Card component from backend. Retrieves 5 random cards */}
      <div className="manadisplay">
        Mana: {currentMana}/{manaPool}
      </div>
    </div>
  );
};

export default CardBoard;

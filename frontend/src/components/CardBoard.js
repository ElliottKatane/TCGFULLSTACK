import React from "react";
import CardATK from "./CardATK";
import CardDEF from "./CardDEF";
import "../CSS/Cardboard.css";

const CardBoard = ({ attaquerLoup, currentMana, manaPool }) => {
  // Function to decrease Enemy's HP
  const handleAttack = (ATKvalue) => {
    const valeurAttaque = parseInt(ATKvalue);
    console.log(
      "handleAttack, valeurAttaque dans CardBoard.js: " + valeurAttaque
    );
    attaquerLoup(ATKvalue); // Decrease Loup's HP by ATKvalue
    console.log("handleAttack, attaquerLoup dans CardBoard.js: " + ATKvalue);
    // LE BUG DE MA LIFE. j'ai modifié le console.log ci-dessus qui contenait attaquerLoup(ATKvalue)
    // et je l'ai modifié par (ATKvalue) et ça a marché. Je ne comprends pas pourquoi.
    // apparemment le console.log permettait de trigger une fois de plus la fonction attaquerLoup.
    // Ce qui faisait que les points de vie du loup descendaient 2x plus vite.
    console.log("----");
  };

  return (
    <div className="cardboard-container">
      <CardATK ATKvalue={6} name="Strike" onAttaque={handleAttack} />
      <CardATK ATKvalue={6} name="Strike" onAttaque={handleAttack} />
      <CardATK ATKvalue={6} name="Strike" onAttaque={handleAttack} />
      <CardDEF />
      <CardDEF />
      <div className="manadisplay">
        Mana: {currentMana}/{manaPool}
      </div>
    </div>
  );
};

export default CardBoard;

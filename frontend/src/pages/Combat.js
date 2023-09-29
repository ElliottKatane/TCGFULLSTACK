import React from "react";
import Joueur from "../components/Joueur";
import "../CSS/Combat.css";
import Loup from "../components/Loup";
import { useState } from "react";

const Combat = () => {
  const [joueurHP, setJoueurHP] = useState(100); // Initial HP for Joueur
  const [loupHP, setLoupHP] = useState(100); // Initial HP for Loup

  // Function to decrease Joueur's HP
  const decreaseJoueurHP = () => {
    setJoueurHP((prevHP) => prevHP - 10); // Decrease Joueur's HP by 10 (adjust as needed)
  };

  // Function to decrease Loup's HP
  const decreaseLoupHP = () => {
    setLoupHP((prevHP) => prevHP - 10); // Decrease Loup's HP by 10 (adjust as needed)
  };

  return (
    <div className="combat-container">
      <div className="combat-section fighter">
        <Joueur hp={joueurHP} />
        <button onClick={decreaseJoueurHP}>Decrease Joueur HP</button>
      </div>
      <div className="combat-section wolf">
        <Loup hp={loupHP} />
        <button onClick={decreaseLoupHP}>Decrease Loup HP</button>
      </div>
    </div>
  );
};
export default Combat;

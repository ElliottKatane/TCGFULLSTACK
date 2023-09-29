import React from "react";
import image from "../assets/guerrier.png";
import HPBar from "./HPBar";

const Joueur = ({ hp }) => {
  return (
    <div>
      <h1>FIGHTER</h1>
      <img src={image} alt="copie" />
      <HPBar value={hp} />
      {/* <button onClick={attackTenHP}>Attaquer</button> */}
    </div>
  );
};

export default Joueur;

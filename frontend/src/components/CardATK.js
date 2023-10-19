import React from "react";
import imageATK from "../assets/rsz_strike_r.png";
// Type : attaque, défense, pouvoir
// valeur : +3atk, +3 def, +3pv jusqu'à la fin du combat
// image : image de la carte
// onAttaque : fonction qui permet d'attaquer
const CardATK = ({ ATKvalue, onAttaque }) => {
  // gère le click sur la carte : l'attribut "onAttaque" reçoit ATKvalue. ATKvalue est envoyé à la fonction attaquerLoup dans CardBoard.js
  const handleClick = () => {
    console.log("handleClick, ATKvalue dans CardATK.js: " + ATKvalue);
    onAttaque(ATKvalue);
  };

  // taille de la carte et son image
  const style = {
    width: "170px",
    height: "230px",
    backgroundImage: `url(${imageATK})`,
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="cardcomp" style={style} onClick={handleClick}>
      {/* <p className="card">Attaque</p>
      <p className="card">Valeur: {ATKvalue}</p>
      <p className="card">{name}</p> */}
    </div>
  );
};

export default CardATK;

import React from "react";
import imageATK from "../assets/carteatk.png";
// Type : attaque, défense, pouvoir
// valeur : +3atk, +3 def, +3pv jusqu'à la fin du combat
// image : image de la carte

//5 dégats : coup de poing
//10 dégats : coup d'épée

const CardATK = ({ ATKvalue, onAttaque, name }) => {
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
      <p>Attaque</p>
      <p>Valeur: {ATKvalue}</p>
      <p>{name}</p>
    </div>
  );
};

export default CardATK;

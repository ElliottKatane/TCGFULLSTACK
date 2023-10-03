import React from "react";
import imageDEF from "../assets/cartedef.png";
// Type : attaque, défense, pouvoir
// valeur : +3atk, +3 def, +3pv jusqu'à la fin du combat
// image : image de la carte

const CardDEF = ({ type, value }) => {
  const style = {
    width: "170px",
    height: "230px",
    backgroundImage: `url(${imageDEF})`,
    backgroundSize: "contain",
  };

  return (
    <div className="cardcomp" style={style}>
      <p>Type: {type}</p>
      <p>Valeur: {value}</p>
    </div>
  );
};

export default CardDEF;

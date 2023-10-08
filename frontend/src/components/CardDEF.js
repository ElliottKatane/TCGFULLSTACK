import React from "react";
import imageDEF from "../assets/rsz_defend_r.png";
// Type : attaque, défense, pouvoir
// valeur : +3atk, +3 def, +3pv jusqu'à la fin du combat
// image : image de la carte

const CardDEF = ({ type, value }) => {
  const style = {
    width: "170px",
    height: "230px",
    backgroundImage: `url(${imageDEF})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div className="cardcomp" style={style}>
      {/* <p className="card">Type: {type}</p>
      <p className="card">Valeur: {value}</p> */}
    </div>
  );
};

export default CardDEF;

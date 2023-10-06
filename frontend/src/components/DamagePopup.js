import React from "react";
import "../CSS/Combat.css";

const DamagePopup = ({ damage }) => {
  return <div className="damage-popup">-{damage}</div>;
};

export default DamagePopup;

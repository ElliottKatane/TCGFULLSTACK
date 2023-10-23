import React from "react";
import loupSprite from "../assets/loup.png";
import { useState, useEffect } from "react";
import HPBar from "./HPBar";
const Loup = ({ hp }) => {
  const [spritePosition, setSpritePosition] = useState("0%");

  useEffect(() => {
    // Calculate the sprite position based on HP whenever hp changes
    if (hp <= 0) {
      alert("Loup is dead");
    } else if (hp <= 25) {
      setSpritePosition("98%");
    } else if (hp <= 50) {
      setSpritePosition("65%");
    } else if (hp <= 75) {
      setSpritePosition("32%");
    } else {
      setSpritePosition("0%"); // Default position
    }
  }, [hp]);
  const style = {
    width: "250px",
    height: "196px",
    backgroundImage: `url(${loupSprite})`,
    backgroundPosition: `${spritePosition} 0`,
  };

  return (
    <div className="loup-container">
      <h1>WOLF</h1>
      <div className="loup-sprite" style={style}></div>
      <HPBar value={hp} />
    </div>
  );
};

export default Loup;

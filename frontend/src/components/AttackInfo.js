import React from "react";
import "../CSS/AttackInfo.css";
const AttackInfo = ({ type, value }) => {
  return (
    <div className={`attack-info ${type}`}>
      {type === "monsterArmor" && `Monster increases its defense by ${value}!`}
      {type === "monsterDamage" && `Monster attacks with ${value} damage!`}
    </div>
  );
};

export default AttackInfo;

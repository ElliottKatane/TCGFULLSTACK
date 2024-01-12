import React from "react";
import "../CSS/AttackInfo.css";

const AttackInfo = ({ attacker, type, value }) => {
  const isPlayer = attacker === "player";

  return (
    <div className={`attack-info ${isPlayer ? "player" : "monster"}`}>
      {isPlayer ? (
        <>
          {type === "playerArmor" && `Player gains ${value} armor!`}
          {type === "playerDamage" && `Player attacks with ${value} damage!`}
          {type === "playerVulnerability" &&
            `Player inflicts vulnerability with ${value} damage!`}
        </>
      ) : (
        <>
          {type === "monsterArmor" &&
            `Monster increases its defense by ${value}!`}
          {type === "monsterDamage" && `Monster attacks with ${value} damage!`}
        </>
      )}
    </div>
  );
};

export default AttackInfo;

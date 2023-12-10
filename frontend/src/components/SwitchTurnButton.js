import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  switchTurn,
  MonsterAttack,
  initializeCurrentMana,
  resetArmor,
} from "../redux/actions/player.action";
import enemyAttack from "../assets/enemy-attack.gif";
const SwitchTurnButton = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const currentTurn = useSelector((state) => state.player.currentTurn);
  const monsterInfo = useSelector((state) => state.monster.monsterInfo);
  const [showMonsterImage, setShowMonsterImage] = useState(false);

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));
    if (currentTurn === "player") {
      const numberOfAttacks = monsterInfo.attacks.length;
      // Generate a random index within the range of the attacks array
      const randomAttackIndex = Math.floor(Math.random() * numberOfAttacks);
      // Get the damage value of the randomly selected attack
      const monsterAttackValue = monsterInfo.attacks[randomAttackIndex].damage;

      // on devrait mette un set TimeOut pour qu'il y ait un délai entre le clic du bouton et l'attaque du monstre
      console.log("Monster attack value: (switch turn)", monsterAttackValue);
      setShowMonsterImage(true);

      setTimeout(() => {
        dispatch(MonsterAttack(monsterAttackValue));
        console.log(`Monster attacks with ${monsterAttackValue} damage!`);
        setShowMonsterImage(false);
      }, 1000);
      // réinitialise le mana du joueur après le tour du monstre
      dispatch(initializeCurrentMana(player.playerInfo.manaPool));
    } else {
      // Si c'est le tour du monstre, réinitialise l'armure du joueur à zéro
      dispatch(resetArmor());
    }
  };
  return (
    <div className="fintourbtn">
      <button onClick={handleEndTurn}>
        End {currentTurn === "player" ? "Player" : "Monster"} Turn
      </button>

      {showMonsterImage && (
        <div>
          <img
            src={enemyAttack}
            alt="Monster Attack"
            style={{
              position: "absolute",
              top: "70%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default SwitchTurnButton;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  switchTurn,
  MonsterAttack,
  initializeCurrentMana,
} from "../redux/actions/player.action";

const SwitchTurnButton = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const currentTurn = useSelector((state) => state.player.currentTurn);
  const monsterInfo = useSelector((state) => state.monster.monsterInfo);

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));
    if (currentTurn === "player") {
      // on devrait mette un set TimeOut pour qu'il y ait un délai entre le clic du bouton et l'attaque du monstre
      const monsterAttackValue = monsterInfo.attacks[1].damage; // [0] = Griffe, 10dmg, [1] = Morsure, 15 dmg
      console.log("Monster attack value: (switch turn)", monsterAttackValue);
      dispatch(MonsterAttack(monsterAttackValue));
      // réinitialise le mana du joueur après le tour du monstre
      dispatch(initializeCurrentMana(player.playerInfo.manaPool));
    }
  };
  return (
    <div className="fintourbtn">
      <button onClick={handleEndTurn}>
        End {currentTurn === "player" ? "Player" : "Monster"} Turn
      </button>
    </div>
  );
};

export default SwitchTurnButton;

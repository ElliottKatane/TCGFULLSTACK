import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  switchTurn,
  MonsterAttack,
  initializeCurrentMana,
  resetArmor,
  moveCardsToDefausse,
  fetch5CardsFromPioche,
  checkAndFetchCards,
} from "../redux/actions/player.action";
import enemyAttack from "../assets/enemy-attack.gif";
import { DegatsSubis } from "../redux/actions/monster.action";

const SwitchTurnButton = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const currentTurn = useSelector((state) => state.player.currentTurn);
  const monsterInfo = useSelector((state) => state.monster.monsterInfo);
  const [showMonsterImage, setShowMonsterImage] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleMonsterTurn = () => {
    // Refill/Reset des stats du joueur : armure et mana
    dispatch(initializeCurrentMana(player.playerInfo.manaPool));
    dispatch(resetArmor());
    // vérifier s'il y a encore assez de cartes dans la pioche, sinon transvaser les cartes de la défausse dans la pioche
    dispatch(checkAndFetchCards());
    // fetch de nouvelles cartes depuis la pioche
    dispatch(fetch5CardsFromPioche());

    // Automatically switch turn back to the player
    dispatch(switchTurn("player"));
  };

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));

    if (currentTurn === "player") {
      const numberOfAttacks = monsterInfo.attacks.length;
      const randomAttackIndex = Math.floor(Math.random() * numberOfAttacks);
      const monsterAttackValue = monsterInfo.attacks[randomAttackIndex].damage;

      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 3000);

      setTimeout(() => {
        console.log("Monster attack value: (switch turn)", monsterAttackValue);
        setShowMonsterImage(true);

        setTimeout(() => {
          dispatch(MonsterAttack(monsterAttackValue));
          console.log(`Monster attacks with ${monsterAttackValue} damage!`);
          setShowMonsterImage(false);

          // Introduce another 1-second delay before ending the monster's turn
          setTimeout(() => {
            handleMonsterTurn();
          }, 1000);
        }, 1450);
      }, 1000);

      if (player.combustionActivated) {
        const combustionDamageToPlayer = player.combustionPlayedCount * 1;
        const combustionDamageToMonster = player.combustionPlayedCount * 5;
        dispatch(MonsterAttack(combustionDamageToPlayer));
        dispatch(DegatsSubis(combustionDamageToMonster));
      }

      dispatch(moveCardsToDefausse(player.main));
    }
  };

  return (
    <div>
      <button
        className="fintourbtn"
        onClick={handleEndTurn}
        disabled={isButtonDisabled}
      >
        Fin Tour {currentTurn === "player" ? "Joueur" : "Monstre"}
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

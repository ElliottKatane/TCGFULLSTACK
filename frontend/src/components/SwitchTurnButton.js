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

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));
    // Quand on clique sur "End Player Turn" :
    if (currentTurn === "player") {
      const numberOfAttacks = monsterInfo.attacks.length;
      // Generate a random index within the range of the attacks array
      const randomAttackIndex = Math.floor(Math.random() * numberOfAttacks);
      // Get the damage value of the randomly selected attack
      const monsterAttackValue = monsterInfo.attacks[randomAttackIndex].damage;

      setIsButtonDisabled(true);
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 3000);

      // Introduce a 2-second delay before showing the monster image
      setTimeout(() => {
        console.log("Monster attack value: (switch turn)", monsterAttackValue);
        setShowMonsterImage(true);

        // Introduce another 1-second delay before processing the attack
        setTimeout(() => {
          dispatch(MonsterAttack(monsterAttackValue));
          console.log(`Monster attacks with ${monsterAttackValue} damage!`);
          setShowMonsterImage(false);

          // Introduce another delay before switching the turn back to the player
          setTimeout(() => {
            dispatch(switchTurn(currentTurn));
          }, 800);
        }, 1000);
      }, 2000);

      // Si combustionActivated est true (carte Combustion jouée), le joueur subit 1 dégât et le monstre subit 5 dégâts
      if (player.combustionActivated) {
        const combustionDamageToPlayer = player.combustionPlayedCount * 1;
        const combustionDamageToMonster = player.combustionPlayedCount * 5;
        dispatch(MonsterAttack(combustionDamageToPlayer));
        dispatch(DegatsSubis(combustionDamageToMonster));
      }
      // le reste des cartes de la main du joueur sont défaussées
      dispatch(moveCardsToDefausse(player.main));
    } else {
      // quand on clique sur "End Monster Turn:"
      // Refill/Reset des stats du joueur : armure et mana
      dispatch(initializeCurrentMana(player.playerInfo.manaPool));
      dispatch(resetArmor());
      // vérifier s'il y a encore assez de cartes dans la pioche, sinon transvaser les cartes de la défausse dans la pioche
      dispatch(checkAndFetchCards());
      // fetch de nouvelles cartes depuis la pioche
      dispatch(fetch5CardsFromPioche());
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
      {/* 
      <div className="fintourbtn">
  {currentTurn === "player" && (
    <button onClick={handleEndTurn}>
      End Player Turn
    </button>
  )} */}

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

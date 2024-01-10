import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  switchTurn,
  MonsterAttack,
  initializeCurrentMana,
  resetArmor,
  moveCardsToDefausse,
  fetch5CardsFromPioche,
  checkAndFetchCards,
  activateFaiblesseForPlayer,
  activateVulnerabiliteForPlayer,
  handleFaiblesseVulnerabiliteForPlayer,
} from "../redux/actions/player.action";

import enemyAttackArmor from "../assets/buff.gif";
import enemyAttack from "../assets/enemy-attack.gif";

import {
  DegatsSubis,
  updateMonsterArmor,
  resetMonsterArmor,
  handleFaiblesseVulnerabiliteForMonster,
} from "../redux/actions/monster.action";

const HandleTurn = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const currentTurn = useSelector((state) => state.player.currentTurn);
  const monsterInfo = useSelector((state) => state.monster.monsterInfo);
  const [showMonsterImage, setShowMonsterImage] = useState(false);
  const [isArmorAttackAnimation, setIsArmorAttackAnimation] = useState(false);

  const handlePlayerTurn = () => {
    dispatch(fetch5CardsFromPioche());

    setTimeout(() => {
      dispatch(initializeCurrentMana(player.playerInfo.manaPool));
      dispatch(resetArmor());
      // vérifier s'il y a encore assez de cartes dans la pioche, sinon transvaser les cartes de la défausse dans la pioche
      dispatch(checkAndFetchCards());
      // fetch de nouvelles cartes depuis la pioche
    }, 2000);
    // Si combustionActivated est true (carte Combustion jouée), le joueur subit 1 dégât et le monstre subit 5 dégâts
    if (player.combustionActivated) {
      const combustionDamageToPlayer = player.combustionPlayedCount * 1;
      const combustionDamageToMonster = player.combustionPlayedCount * 5;
      dispatch(MonsterAttack(combustionDamageToPlayer));
      dispatch(DegatsSubis(combustionDamageToMonster));
    }
    // le reste des cartes de la main du joueur sont défaussées
    // ajustement des stats de faiblesse et vulnérabilité du monstre
    dispatch(handleFaiblesseVulnerabiliteForMonster());
    // ajustement des stats de faiblesse et vulnérabilité du joueur
    dispatch(handleFaiblesseVulnerabiliteForPlayer());
  };

  const handleEnemyTurn = () => {
    dispatch(switchTurn("player"));
    dispatch(moveCardsToDefausse(player.main));
    dispatch(resetMonsterArmor());
    const numberOfAttacks = monsterInfo.attacks.length;
    const randomAttackIndex = Math.floor(Math.random() * numberOfAttacks);

    const selectedAttack = monsterInfo.attacks[randomAttackIndex];
    const isArmorAttack = selectedAttack.hasOwnProperty("armor"); // Check if it's an armor attack

    let monsterAttackValue;

    setTimeout(() => {
      setShowMonsterImage(true);

      if (isArmorAttack) {
        // If it's an armor attack, get the armor value
        monsterAttackValue = selectedAttack.armor;
        setIsArmorAttackAnimation(true);
        dispatch(updateMonsterArmor(monsterAttackValue));
        dispatch(activateFaiblesseForPlayer());
        dispatch(activateVulnerabiliteForPlayer());
        console.log(
          `Monster increases its defense by ${selectedAttack.armor}!`
        );
      } else {
        monsterAttackValue = selectedAttack.damage;
        dispatch(MonsterAttack(selectedAttack.damage));
        console.log(`Monster attacks with ${selectedAttack.damage} damage!`);
      }

      dispatch(activateFaiblesseForPlayer());
      dispatch(activateVulnerabiliteForPlayer());

      setTimeout(() => {
        setShowMonsterImage(false);
        setIsArmorAttackAnimation(false);

        setTimeout(() => {
          // This block will be executed after the animation and other logic is completed
          dispatch(switchTurn("monster"));
          handlePlayerTurn();
        }, 0); // Using 0ms timeout to schedule the code at the end of the current event loop
      }, 450); // Attack animation time
    }, 850); // Time before attack (after clicking "fin tour")
  };

  return (
    <div>
      {currentTurn === "player" && (
        <button className="fintourbtn" onClick={handleEnemyTurn}>
          Fin Tour
        </button>
      )}

      {showMonsterImage && (
        <div>
          <img
            src={isArmorAttackAnimation ? enemyAttackArmor : enemyAttack}
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

export default HandleTurn;

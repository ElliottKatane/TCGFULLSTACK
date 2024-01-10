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
const SwitchTurnButton = () => {
  const dispatch = useDispatch();
  const player = useSelector((state) => state.player);
  const currentTurn = useSelector((state) => state.player.currentTurn);
  const monsterInfo = useSelector((state) => state.monster.monsterInfo);
  const [showMonsterImage, setShowMonsterImage] = useState(false);
  const [isArmorAttackAnimation, setIsArmorAttackAnimation] = useState(false);

  const handleEndTurn = () => {
    dispatch(switchTurn(currentTurn));
    //Ending player turn
    if (currentTurn === "player") {
      dispatch(resetMonsterArmor());
      const numberOfAttacks = monsterInfo.attacks.length;
      const randomAttackIndex = Math.floor(Math.random() * numberOfAttacks);

      const selectedAttack = monsterInfo.attacks[randomAttackIndex];
      const isArmorAttack = selectedAttack.hasOwnProperty("armor"); // Check if it's an armor attack

      let monsterAttackValue;

      setTimeout(() => {
        console.log("Monster attack value: (switch turn)", monsterAttackValue);
        setShowMonsterImage(true);

        setTimeout(() => {
          if (isArmorAttack) {
            // If it's an armor attack, get the armor value
            monsterAttackValue = selectedAttack.armor;
            setIsArmorAttackAnimation(true);
            dispatch(updateMonsterArmor(monsterAttackValue));
            dispatch(activateFaiblesseForPlayer());
            dispatch(activateVulnerabiliteForPlayer());
            console.log(
              `Monster increases it's defence by ${selectedAttack.armor} !`
            );
          } else {
            monsterAttackValue = selectedAttack.damage;
            setIsArmorAttackAnimation(false);
            dispatch(MonsterAttack(selectedAttack.damage));
            console.log(
              `Monster attacks with ${selectedAttack.damage} damage!`
            );
          }
          dispatch(activateFaiblesseForPlayer());
          dispatch(activateVulnerabiliteForPlayer());
          console.log(`Monster attacks with ${monsterAttackValue} damage!`);
          setShowMonsterImage(false);
        }, 450); // Temps de l'animation d'attaque
      }, 1000); // Temps avant que le tour revien au joueur
      setTimeout(() => {
        dispatch(switchTurn("monster"));
        dispatch(initializeCurrentMana(player.playerInfo.manaPool));
        dispatch(resetArmor());
        // vérifier s'il y a encore assez de cartes dans la pioche, sinon transvaser les cartes de la défausse dans la pioche
        dispatch(checkAndFetchCards());
        // fetch de nouvelles cartes depuis la pioche
        dispatch(fetch5CardsFromPioche());
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
      // ajustement des stats de faiblesse et vulnérabilité du monstre
      dispatch(handleFaiblesseVulnerabiliteForMonster());
      // ajustement des stats de faiblesse et vulnérabilité du joueur
      dispatch(handleFaiblesseVulnerabiliteForPlayer());
    }
  };

  return (
    <div>
      {currentTurn === "player" && (
        <button className="fintourbtn" onClick={handleEndTurn}>
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

export default SwitchTurnButton;

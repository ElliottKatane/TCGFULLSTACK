// react & router dom
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { connect, useSelector } from "react-redux";
import { fetchMonster } from "../redux/actions/monster.action";
import {
  handleVictory,
  resetVictory,
  rewardPlayer,
} from "../redux/actions/game.action";
import { useAuthContext } from "../hooks/useAuthContext";
// components
import StatsBar from "./StatsBar";
import Modal from "./Modal";

const Monster = ({ monster, dispatch }) => {
  // useParams permet de récupérer les paramètres de l'URL
  const { mapLevel } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  // Utilisez useSelector pour extraire isOpen et cards du Redux store
  const modalIsOpen = useSelector((state) => state.card.modalIsOpen);
  const modalCards = useSelector((state) => state.card.rewardCards);
  const isVictory = useSelector((state) => state.game.isVictory);

  useEffect(() => {
    // Appelez l'action pour fetch les données du monstre et les mettre dans Redux
    dispatch(fetchMonster(mapLevel))
      .then((result) => {
        console.log("Fetch monster result:", result);
      })
      .catch((error) => {
        console.error("Fetch monster failed:", error);
      });
  }, [mapLevel, dispatch]);

  console.log("Monster state:", monster.monsterInfo);

  useEffect(() => {
    if (monster.monsterInfo && monster.currentHealth <= 0 && !isVictory) {
      console.log("Entering handleVictory effect");

      const userEmail = user.email;

      dispatch(handleVictory(userEmail, mapLevel));
      dispatch(rewardPlayer());
      dispatch(resetVictory());
      window.alert("Félicitations ! Vous avez remporté la victoire !");
      // navigate("/");
      // window.location.href = "/";
    }
  }, [
    monster.monsterInfo,
    monster.currentHealth,
    dispatch,
    navigate,
    mapLevel,
    user.email,
  ]);

  const levelClassName = `level${mapLevel}`;
  const enemyLevelClassName = `enemy-level${mapLevel}`;

  return (
    <div>
      {monster.monsterInfo ? (
        <div>
          <div className="monster-hp">
            <StatsBar
              HPValue={monster.monsterInfo.health}
              currentHealth={monster.currentHealth}
            />
          </div>
          <img
            src={`/assets/${monster.monsterInfo.image}`}
            alt={monster.monsterInfo.name}
            className={`enemy ${levelClassName} ${enemyLevelClassName}`}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {isVictory && <Modal isOpen={modalIsOpen} cards={modalCards} />}
    </div>
  );
};

const mapStateToProps = ({ monster, card }) => ({
  monster,
  modalIsOpen: card.modalIsOpen,
  modalCards: card.rewardCards,
});

export default connect(mapStateToProps)(Monster);

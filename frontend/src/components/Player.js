import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "../assets/guerrier.gif";
import attackImage from "../assets/guerrier_attack.gif";
import StatsBar from "./StatsBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { connect } from "react-redux";
import { handleDefeat, resetVictory } from "../redux/actions/game.action";
import "../CSS/Positions.css";

import {
  fetchPlayer,
  fetch5CardsFromPioche,
  initializeCurrentMana,
  initializeCurrentTurn,
  initializePlayerPioche,
  initializeCurrentPlayerHP,
  updateArmor,
  initializeCombustionCount,
} from "../redux/actions/player.action";
import flameIcon from "../assets/flame-icon.png";
import combustionIcon from "../assets/combustion-icon.png";
import buffIcon from "../assets/buff.gif";
const Player = ({
  player,
  dispatch,
  enflammerActivated,
  combustionActivated,
  isCardAnimationActive,
  isBuffAnimationActive,
}) => {
  // importer le contexte d'authentification
  const { user } = useAuthContext();
  const { mapLevel } = useParams();

  useEffect(() => {
    if (user) {
      const userEmail = user.email;
      dispatch(fetchPlayer(userEmail))
        .then((result) => {
          dispatch(initializeCurrentMana(result.manaPool));
          dispatch(initializeCurrentTurn(result.currentTurn));
          dispatch(initializePlayerPioche(result.DeckOfCards));
          dispatch(initializeCurrentPlayerHP(result.HP));
          // si le joueur avait de l'armure au combat précédent, on ajoute le même nombre mais en négatif pour avoir 0.
          dispatch(updateArmor(-player.armor));
          dispatch(initializeCombustionCount());
          dispatch(fetch5CardsFromPioche());
        })
        .catch((error) => {
          console.error("Fetch player failed:", error);
        });
    }
  }, [user, dispatch]);

  // initialisation de la manaPool et enregistrement dans une constante

  useEffect(() => {
    if (player.playerInfo && player.currentPlayerHealth <= 0) {
      dispatch(handleDefeat());
      dispatch(resetVictory());
      window.alert("Game Over...");
      window.location.href = "/map";
    }
  }, [player.playerInfo, player.currentPlayerHealth, dispatch]);

  const playerLevelClassName = `player-level${mapLevel} ${
    isBuffAnimationActive
      ? "buff-animation idle-animation"
      : isCardAnimationActive
      ? "attack-animation"
      : "idle-animation"
  }`;

  return (
    <div>
      {player.playerInfo ? (
        <div>
          <img
            src={
              isCardAnimationActive && !isBuffAnimationActive
                ? attackImage
                : image
            }
            alt="copie"
            className={`player ${playerLevelClassName}`}
          />
          <div className="power-icons">
            {enflammerActivated ? (
              <img
                src={flameIcon}
                alt="flame-icon"
                style={{ width: "30px", height: "30px" }}
              />
            ) : null}

            {combustionActivated ? (
              <img
                src={combustionIcon}
                alt="combustion-icon"
                style={{ width: "30px", height: "30px" }}
              />
            ) : null}

            {isBuffAnimationActive ? (
              <img src={buffIcon} alt="buff-icon" />
            ) : null}
          </div>

          <div className="player-hp">
            <StatsBar
              HPValue={player.playerInfo.HP}
              currentHealth={player.currentPlayerHealth}
              currentMana={player.currentMana}
              manaPool={player.playerInfo.manaPool}
              armor={player.armor}
              isPlayer={true}
            />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <div className="card-stacks">
        pioche: {player.pioche.length}
        <br />
        main: {player.main.length}
        <br />
        defausse: {player.defausse.length}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    player: state.player,
    enflammerActivated: state.player.enflammerActivated,
    combustionActivated: state.player.combustionActivated,
    isCardAnimationActive: state.player.cardAnimationActive,
    isBuffAnimationActive: state.player.buffAnimationActive,
  };
};
export default connect(mapStateToProps)(Player);

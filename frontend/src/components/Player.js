import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "../assets/guerrier.gif";
import StatsBar from "./StatsBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { connect } from "react-redux";
import { handleDefeat,resetVictory } from "../redux/actions/game.action";
import "../CSS/Positions.css";
import {
  fetchPlayer,
  initializeCurrentMana,
  initializeCurrentTurn,
  initializePlayerPioche,
  initializeCurrentPlayerHP,
} from "../redux/actions/player.action";
import flameIcon from "../assets/flame-icon.png";
import combustionIcon from "../assets/combustion-icon.png";

const Player = ({
  player,
  dispatch,
  enflammerActivated,
  combustionActivated,
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
          dispatch(initializeCurrentPlayerHP(result.HP))
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
  }, [player.playerInfo,player.currentPlayerHealth, dispatch]);

  const playerLevelClassName = `player-level${mapLevel}`;


  return (
    <div>
      {player.playerInfo ? (
        <div>
          {/* <h1>FIGHTER</h1> */}
          <img src={image} alt="copie"
          className={`player ${playerLevelClassName}`} />
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
          </div>
          <div className="player-hp">
          <StatsBar
            HPValue={player.playerInfo.HP}
            currentHealth={player.currentPlayerHealth}
            currentMana={player.currentMana}
            manaPool={player.playerInfo.manaPool}
            isPlayer={true}
          />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    player: state.player,
    enflammerActivated: state.player.enflammerActivated,
    combustionActivated: state.player.combustionActivated,
  };
};
export default connect(mapStateToProps)(Player);

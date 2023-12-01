import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "../assets/guerrier.gif";
import StatsBar from "./StatsBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { connect } from "react-redux";
import { handleDefeat } from "../redux/actions/game.action";

import {
  fetchPlayer,
  initializeCurrentMana,
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
          console.log("Fetch player result:", result);
          console.log("Mana pool:", result.manaPool);
          dispatch(initializeCurrentMana(result.manaPool));
        })
        .catch((error) => {
          console.error("Fetch player failed:", error);
        });
    }
  }, [user, dispatch]);

  console.log("Player state:", player.playerInfo);
  // initialisation de la manaPool et enregistrement dans une constante

  useEffect(() => {
    if (player.playerInfo && player.playerInfo.HP <= 0) {

      dispatch(handleDefeat());
      window.alert("Game Over...");
      window.location.href = "/map";
    }
 
      
  }, [player.playerInfo, dispatch]);

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
          <StatsBar
            HPValue={player.playerInfo.HP}
            currentMana={player.currentMana}
            manaPool={player.playerInfo.manaPool}
            isPlayer={true}
          />
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

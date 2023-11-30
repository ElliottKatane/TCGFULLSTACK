import React from "react";
import { useEffect } from "react";
import image from "../assets/guerrier.png";
import StatsBar from "./StatsBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { connect } from "react-redux";
import { fetchPlayer } from "../redux/actions/player.action";
import { handleDefeat } from "../redux/actions/game.action";
import { useNavigate } from "react-router-dom";


const Player = ({ player, dispatch }) => {
  // importer le contexte d'authentification
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userEmail = user.email;
      dispatch(fetchPlayer(userEmail))
        .then((result) => {
          console.log("Fetch player result:", result);
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
      alert("Defaite");
      navigate("/map");
    }
 
      
  }, [player.playerInfo, dispatch]);

  return (
    <div>
      {player.playerInfo ? (
        <div>
          <h1>FIGHTER</h1>
          <img src={image} alt="copie" />
          <StatsBar
            HPValue={player.playerInfo.HP}
            currentMana={player.playerInfo.manaPool}
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
  };
};
export default connect(mapStateToProps)(Player);

import React from "react";
import { useEffect } from "react";
import image from "../assets/guerrier.png";
import HPBar from "./HPBar";
import { useAuthContext } from "../hooks/useAuthContext";
import { connect } from "react-redux";
import { fetchPlayer } from "../redux/actions/player.action";

const Player = ({ player, dispatch }) => {
  // importer le contexte d'authentification
  const { user } = useAuthContext();

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

  return (
    <div>
      {player.playerInfo ? (
        <div>
          <h1>FIGHTER</h1>
          <img src={image} alt="copie" />
          <HPBar value={player.playerInfo.HP} />
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

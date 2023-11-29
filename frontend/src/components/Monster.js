import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import StatsBar from "./StatsBar";
import { fetchMonster } from "../redux/actions/monster.action";
import { handleVictory } from "../redux/actions/game.action";
import { useAuthContext } from "../hooks/useAuthContext";

const Monster = ({ monster, dispatch }) => {
  // useParams permet de récupérer les paramètres de l'URL
  const { mapLevel } = useParams();
  const { user } = useAuthContext();

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
    if (monster.monsterInfo && monster.monsterInfo.health <= 0) {
      const userEmail = user.email; 
      dispatch(handleVictory(userEmail,mapLevel));
    }
  }, [monster.monsterInfo, dispatch]);

  return (
    <div>
      {monster.monsterInfo ? (
        <div>
          <h2>{monster.monsterInfo.name}</h2>
          <StatsBar HPValue={monster.monsterInfo.health}  />
          <img
            src={`/assets/${monster.monsterInfo.image}`}
            alt={monster.monsterInfo.name}
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
    monster: state.monster,
  };
};

export default connect(mapStateToProps)(Monster);

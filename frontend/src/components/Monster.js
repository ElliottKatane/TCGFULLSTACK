import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import StatsBar from "./StatsBar";
import { fetchMonster } from "../redux/actions/monster.action";
import { handleVictory, resetVictory } from "../redux/actions/game.action";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Monster = ({ monster, dispatch }) => {
  // useParams permet de récupérer les paramètres de l'URL
  const { mapLevel } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

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

      dispatch(handleVictory(userEmail, mapLevel));
      dispatch(resetVictory());
      window.alert("Félicitations ! Vous avez remporté la victoire !");
      window.location.href = "/map";
    }
  }, [monster.monsterInfo, dispatch, navigate, mapLevel, user.email]);

  const levelClassName = `level${mapLevel}`;
  const enemyLevelClassName = `enemy-level${mapLevel}`;

  return (
    <div>
      {monster.monsterInfo ? (
        <div>
          <div className="monster-hp">
            <StatsBar HPValue={monster.monsterInfo.health} />
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
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    monster: state.monster,
  };
};

export default connect(mapStateToProps)(Monster);

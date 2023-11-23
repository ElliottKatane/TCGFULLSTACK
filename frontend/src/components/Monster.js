import { useEffect, React, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HPBar from "./HPBar";
import { initHPMonster, fetchMonster } from "../redux/actions/monster.action";

const Monster = () => {
  // useParams permet de récupérer les paramètres de l'URL
  const { mapLevel } = useParams();
  const dispatch = useDispatch(); // Initialisez useDispatch
  const monster = useSelector((state) => state.monster);

  useEffect(() => {
    // Appelez l'action pour fetch les données du monstre et les mettre dans Redux
    dispatch(fetchMonster(mapLevel))
      .then((result) => {
        console.log("Fetch monster result:", result);
      })
      .catch((error) => {
        console.error("Fetch monster failed:", error);
      }); // Appelez l'action pour fetch les données du monstre et les mettre dans Redux
    const result = dispatch(fetchMonster(mapLevel));
    console.log("Dispatch result:", result);
  }, [mapLevel, dispatch]);

  return (
    <div>
      {monster.monsterInfo ? (
        <div>
          <h2>{monster.monsterInfo.name}</h2>
          <HPBar value={monster.monsterInfo.health} />
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
export default Monster;

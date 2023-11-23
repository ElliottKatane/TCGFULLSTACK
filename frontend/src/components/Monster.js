import { useEffect, React, useState } from "react";
import { useParams } from "react-router-dom";
import HPBar from "./HPBar";

const Monster = () => {
  const { mapLevel } = useParams();
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    fetch(`/api/monsters/${mapLevel}`) //Fetch les monstres a partir du mapLevel
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched monster data:", data);
        setMonsters(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mapLevel]);

  return (
    <div>
      {monsters.map((monster, index) => {
        console.log("Monster image data:", monster.image);
        console.log("Constructed image source:", `/assets/${monster.image}`);

        return (
          <div key={index}>
            <h2>{monster.name}</h2>
            <HPBar value={monster.health} />
            <img src={`/assets/${monster.image}`} alt={monster.name} />
          </div>
        );
      })}
    </div>
  );
};
export default Monster;

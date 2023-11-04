import React from "react";
import Joueur from "../components/Joueur";
import Loup from "../components/Loup";
import CardBoard from "../components/CardBoard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../CSS/Combat.css";
import "../CSS/Card.css";

const Combat = () => {
  const [joueurHP, setJoueurHP] = useState(100);
  const [loupHP, setLoupHP] = useState(100);
  const [manaPool, setManaPool] = useState(3);
  const [currentMana, setCurrentMana] = useState(manaPool);
  const [cardsUsed, setCardsUsed] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("player");
  const { mapLevel } = useParams();
  const [levelData, setLevelData] = useState(null);
  const [monsters, setMonsters] = useState([]);

  const [isDamagePopupVisible, setIsDamagePopupVisible] = useState(false);
  const [damageValue, setDamageValue] = useState(0);

  const decreaseJoueurHP = () => {
    setJoueurHP((prevHP) => prevHP - 10);
  };

  const showDamage = (damage) => {
    setDamageValue(damage);
    if (!isDamagePopupVisible) {
      setIsDamagePopupVisible(true);
      const start = performance.now();
      function animate(time) {
        const progress = (time - start) / 1000;
        if (progress < 1.3) {
          requestAnimationFrame(animate);
        } else {
          setIsDamagePopupVisible(false);
        }
      }
      requestAnimationFrame(animate);
    }
  };

  const attaquerLoup = (ATKvalue) => {
    if (currentlyPlaying === "player" && manaPool > 0 && cardsUsed < 3) {
      setLoupHP((prevHP) => prevHP - ATKvalue);
      setCurrentMana(currentMana - 1);
      showDamage(ATKvalue);
      setCardsUsed(cardsUsed + 1);
    } else if (currentMana === 0) {
      alert("You have 0 mana, end turn");
    } else if (currentlyPlaying === "enemy") {
      alert("It's the enemy's turn, you can't play right now");
    }
  };

  const handleFinTour = () => {
    if (currentlyPlaying === "player") {
      setCurrentlyPlaying("enemy");
      console.log("Tour du loup");
      decreaseJoueurHP();
    } else {
      setCurrentlyPlaying("player");
    }
  };

  useEffect(() => {
    if (currentlyPlaying === "enemy") {
      setCurrentMana(manaPool);
      setCardsUsed(0);
      decreaseJoueurHP();
    }
  }, [currentlyPlaying]);

  useEffect(() => {
    fetch(`/api/levels/${mapLevel}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setLevelData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [mapLevel]);

  useEffect(() => {
    fetch(`/api/monstres/${mapLevel}/image`)
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
    <div
      className="combat-container"
      style={{
        backgroundImage: `url(/api/levels/${mapLevel}/backgroundImage)`,
      }}
    >
      <div className="container-fighter-wolf">
        <div className="fighter">
          <Joueur hp={joueurHP} />
        </div>

        <div className="monster">
  {monsters.map((monster, index) => {
    console.log("Monster image data:", monster.image);
    console.log("Constructed image source:", `/assets/${monster.image}`);
    return (
      <div key={index}>
        <h2>{monster.nom}</h2>
        <h2>{monster.HP}</h2>
        <img src={`/assets/${monster.image}`} alt={monster.nom} />
      </div>
    );
  })}
</div>


        {/* <Loup hp={loupHP} /> */}
      </div>
      <div className="cardboard-container">
        <div className="cardboard">
          <CardBoard
            attaquerLoup={attaquerLoup}
            currentMana={currentMana}
            manaPool={manaPool}
          />
        </div>
      </div>

      <div className="fintourbtn">
        <button onClick={handleFinTour}>
          End {currentlyPlaying === "player" ? "Player" : "Enemy"} Turn
        </button>
      </div>

      <div className="damage-popup-container">
        {isDamagePopupVisible && (
          <div className="damage-popup">{damageValue}</div>
        )}
      </div>
    </div>
  );
};

export default Combat;

import React from "react";
import Joueur from "../components/Joueur";
import "../CSS/Combat.css";
import Loup from "../components/Loup";
import CardBoard from "../components/CardBoard";
import { useState, useEffect } from "react";
import "../CSS/Card.css";
import LootScreen from "../components/LootScreen";

const Combat = () => {
  const [joueurHP, setJoueurHP] = useState(100); // Initial HP for Joueur
  const [loupHP, setLoupHP] = useState(100); // Initial HP for <Loup/>
  const [manaPool, setManaPool] = useState(3);
  const [currentMana, setCurrentMana] = useState(manaPool);
  const [cardsUsed, setCardsUsed] = useState(0);
  const [currentlyPlaying, setCurrentlyPlaying] = useState("player"); // Initialize with "player"
  const [showLootScreen, setShowLootScreen] = useState(false);

  //Animations de degats
  const [isDamagePopupVisible, setIsDamagePopupVisible] = useState(false);
  const [damageValue, setDamageValue] = useState(0);

  // Function to decrease Joueur's HP
  const decreaseJoueurHP = () => {
    setJoueurHP((prevHP) => prevHP - 10); // Decrease Joueur's HP by 10
  };

  /////////////////////////////////////////////////////////////////////////
  // Function to show the damage popup
  const showDamage = (damage) => {
    setDamageValue(damage);
    if (!isDamagePopupVisible) {
      // Check if the popup is not already visible
      setIsDamagePopupVisible(true);

      // Use requestAnimationFrame for smoother animations
      const start = performance.now();
      function animate(time) {
        const progress = (time - start) / 1000; // Calculate time progress in seconds
        if (progress < 1.3) {
          // Adjust the duration as needed
          requestAnimationFrame(animate);
        } else {
          setIsDamagePopupVisible(false);
        }
      }
      requestAnimationFrame(animate);
    }
  };

  ////////////////////////////////////////////////////////////////////////

  const attaquerLoup = (ATKvalue) => {
    if (currentlyPlaying === "player" && manaPool > 0 && cardsUsed < 3) {
      // Code to handle the attack and reduce the manaPool
      setLoupHP((prevHP) => prevHP - ATKvalue);
      setCurrentMana(currentMana - 1);
      showDamage(ATKvalue); // Corrected function name to showDamage
      // pour l'instant ça sert à rien CardsUsed, ça servira p-e plus tard quand on voudra les discard.
      setCardsUsed(cardsUsed + 1);
    } else if (currentMana === 0) {
      // Alert the user when they have 0 mana
      alert("You have 0 mana, end turn");
    } else if (currentlyPlaying === "enemy") {
      // Alert the player that it's the enemy's turn
      alert("It's the enemy's turn, you can't play right now");
    }
  };
  const handleFinTour = () => {
    if (currentlyPlaying === "player") {
      // If it's the player's turn, switch to the enemy's turn
      setCurrentlyPlaying("enemy");
      console.log("Tour du loup");

      // Example: Decrease joueur HP (simulate enemy attack) I could actually put it in the useEffect below, which I did
      // decreaseJoueurHP();
    } else {
      // If it's the enemy's turn, switch to the player's turn
      setCurrentlyPlaying("player");

      // Add code to simulate the player's turn or any other actions
    }
  };

  // permet d'observer un changement dans le state currentlyPlaying. Lorsqu'il y a changement, alors le code s'exécute
  useEffect(() => {
    // Code to execute when currentlyPlaying changes, i.e., when the turn changes.
    if (currentlyPlaying === "enemy") {
      setCurrentMana(manaPool); // Regenerate the manaPool to 3
      setCardsUsed(0); // Reset the number of cards used

      // Add code to simulate the enemy's turn or pass to the next player's turn
      // semble identique si j'écris decreaseJoueurHP() dans handleFinTour ou ici
      decreaseJoueurHP();
    }
  }, [currentlyPlaying]);

  // Check if either player (fighter) or wolf's HP is zero or less

  useEffect(() => {
    if (joueurHP <= 0 || loupHP <= 0) {
      // Set the state variable to show the LootScreen
      setShowLootScreen(true);
    }
  }, [joueurHP, loupHP]);

  return (
    <div className="combat-container">
      <div className="container-fighter-wolf">
        <div className="fighter">
          <Joueur hp={joueurHP} />
          {/* <button onClick={decreaseJoueurHP}>Decrease Joueur HP</button> */}
        </div>

        <div className="wolf">
          <Loup hp={loupHP} />
        </div>
      </div>

      <div className="cardboard-container">
        <CardBoard
          attaquerLoup={attaquerLoup}
          currentMana={currentMana}
          manaPool={manaPool}
          // je passe les props currentMana et manaPool à CardBoard.js
        />
      </div>

      <div className="fintourbtn">
        <button onClick={handleFinTour}>
          End {currentlyPlaying === "player" ? "Player" : "Enemy"} Turn
          {/* petite ternaire qui permet de changer le texte du bouton selon qui joue */}
        </button>
      </div>
      <div className="damage-popup-container">
        {isDamagePopupVisible && (
          <div className="damage-popup">{damageValue}</div>
        )}
      </div>
      {showLootScreen && <LootScreen />}
    </div>
  );
};
export default Combat;

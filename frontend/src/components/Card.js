import React, { useState, useEffect } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import {
  fetchRandomCards,
  infligerDegats,
  useFrappeCard,
} from "../redux/actions/card.action"; // Import the Card actions

const Card = () => {
  const randomCards = useSelector((state) => state.cartes.randomCards);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  useEffect(() => {
    dispatch(fetchRandomCards());
  }, [dispatch]);

  // Logique de clic sur les cartes : dégâts infligés, coût du mana, carte qui doit aller dans la défausse.

  const handleCardClick = (clickedCard) => {
    switch (clickedCard.name) {
      case "Frappe":
        console.log("clickedCard name clicked : ", clickedCard.name);
        console.log("clickedCard.value", clickedCard.value);
        dispatch(infligerDegats(6));
        // Autres actions spécifiques à la carte "Frappe" si nécessaire
        break;

      case "Conflit":
        console.log("clickedCard name clicked : ", clickedCard.name);
        console.log("clickedCard.value", clickedCard.value);
        const allAttackCards = randomCards.every(
          (card) => card.type === "Attaque"
        );
        if (allAttackCards) {
          console.log("Toutes les cartes sont des cartes d'attaque");
          dispatch(infligerDegats(8));
          // Autres actions spécifiques à la carte "Conflit" si nécessaire
        } else {
          console.log("Impossible de jouer la carte Conflit");
        }
        break;

      // Ajouter des cas pour d'autres cartes si nécessaire
      // case "AutreCarte":
      //   break;

      default:
        // Gérer le cas par défaut si le nom de la carte n'est pas reconnu
        console.log("Carte non reconnue : ", clickedCard.name);
    }
  };

  return (
    <div>
      {randomCards.map((card, index) => (
        <div className="card-align" key={index}>
          <div // Render each card as a div. bg color's card changes with type
            className={`card-container card-${card.type.toLowerCase()}`}
            onClick={() => handleCardClick(card)}
          >
            <h2 className="card-title">{card.name}</h2>
            <p className="card-description">{card.description}</p>
            <div className="card-details">
              <p>Rarity: {card.rarity}</p>
              <p>Type: {card.type}</p>
            </div>
            <div className="card-cost">{card.cost}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;

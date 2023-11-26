import React, { useEffect } from "react";
// redux imports
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch from react-redux
import { fetchRandomCards } from "../redux/actions/card.action"; // Import the Card actions
import { ManaCost } from "../redux/actions/player.action";
import { DegatsSubis } from "../redux/actions/monster.action";

const Card = () => {
  // state.card => regarder dans rootReducer pour la réf
  const randomCards = useSelector((state) => state.card.randomCards);
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
        // inflige les dégâts
        dispatch(DegatsSubis(clickedCard.value));
        // dépense le mana
        dispatch(ManaCost(clickedCard.cost));
        // devrait retirer la carte de la main et la mettre dans la défausse
        break;

      case "Conflit":
        console.log("clickedCard name clicked : ", clickedCard.name);
        console.log("clickedCard.value", clickedCard.value);
        //vérifie si toutes les cartes sont de type Attaque, condition pour jouer la carte Conflit
        const allAttackCards = randomCards.every(
          (card) => card.type === "Attack"
        );
        if (allAttackCards) {
          console.log("Toutes les cartes sont des cartes d'attaque");
          // inflige les dégâts (monster action/reducer)
          dispatch(DegatsSubis(clickedCard.value));
          // Autres actions spécifiques à la carte "Conflit" si nécessaire
        } else {
          console.log(
            "Impossible de jouer la carte Conflit. Toutes les cartes ne sont pas de type Attaque "
          );
        }
        break;

      // Ajouter des cas pour d'autres cartes si nécessaire
      // case "AutreCarte":
      //   break;

      default:
        // Gérer le cas par défaut si le nom de la carte n'est pas reconnu
        console.log("Carte non codée encore : ", clickedCard.name);
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

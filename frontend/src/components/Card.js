import React, { useEffect } from "react";
// redux imports
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import {
  addCardToDefausse,
  ManaCost,
  activateEnflammer,
  deactivateEnflammer,
  activateCombustion,
  deactivateCombustion,
} from "../redux/actions/player.action";
import { connect } from "react-redux";

import { DegatsSubis } from "../redux/actions/monster.action";

const Card = ({ player, enflammerActivated, combustionActivated }) => {
  // state.card => regarder dans rootReducer pour la réf
  useEffect(() => {
    console.log("état de la pioche (useEffect, Card.js): ", player.pioche);
    console.log("état de la defausse (useEffect, Card.js): ", player.defausse);
  }, [player.pioche, player.defausse]);
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  // Logique de clic sur les cartes : dégâts infligés, coût du mana, carte qui doit aller dans la défausse.

  const handleCardClick = (clickedCard) => {
    // Vérifie si le joueur a assez de mana pour jouer la carte
    if (player.currentMana >= clickedCard.cost) {
      switch (clickedCard.name) {
        case "Frappe":
          // inflige les dégâts
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.value)));
          // devrait retirer la carte de la main et la mettre dans la défausse
          break;

        case "Conflit": // 0 - Jouable si vous n'avez que des Attaque en main. Infligez 14 dégâts
          //vérifie si toutes les cartes sont de type Attaque, condition pour jouer la carte Conflit
          const allAttackCards = player.pioche.every(
            (card) => card.type === "Attack"
          );
          if (allAttackCards) {
            console.log("Toutes les cartes sont des cartes d'attaque");
            // inflige les dégâts (monster action/reducer)
            dispatch(DegatsSubis(calculateExtraDMG(clickedCard.value)));
            // Autres actions spécifiques à la carte "Conflit" si nécessaire
          } else {
            console.log(
              "Impossible de jouer la carte Conflit. Toutes les cartes ne sont pas de type Attaque "
            );
          }
          break;
        case "Frappe double":
          // inflige les dégâts
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.value)));
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.value)));
          // devrait retirer la carte de la main et la mettre dans la défausse
          break;

        case "Coup de tonnerre": // Infligez 4 dégâts et appliquez 1 de Vulnérabilité à tous les ennemis
          console.log("clickedCard name clicked : ", clickedCard.name);
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.value)));
          break;

        case "Enflammer": // 1 - Gagnez 2 de force.
          dispatch(activateEnflammer());
          break;

        case "Combustion": // 1 - Perdez 1HP et infligez 5 de dégâts à tous les ennemis à la fin de votre tour.
          // inflige les dégâts
          dispatch(activateCombustion());
          break;

        case "Défendre": // 1 - Gagnez 5 de blocage.
          break;

        case "Charge imprudente": // 1 - Infligez 7 dégâts. Ajoutez un Hébétement à votre pioche
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.value)));

          break;
        default:
          // Gérer le cas par défaut si le nom de la carte n'est pas reconnu
          console.log("Carte non codée encore : ", clickedCard.name);
          break;
      }
      // Déduit le mana une fois que la vérification est faite, sinon
      dispatch(ManaCost(clickedCard.cost));
      // méthode pour mettre la carte dans la défausse ici
      console.log("Before dispatch: état de la pioche", player.pioche);
      console.log("Before dispatch: état de la defausse", player.defausse);

      dispatch(addCardToDefausse(clickedCard));

      console.log("After dispatch: état de la pioche", player.pioche);
      console.log("After dispatch: état de la defausse", player.defausse);
    } else {
      // Sinon, on obtient une alerte
      alert("Not enough mana to play this card!");
    }
  };

  useEffect(() => {
    // Désactive l'effet Enflammer à la fin du combat
    dispatch(deactivateEnflammer());
    dispatch(deactivateCombustion());
  }, [dispatch]);

  // Fonction pour calculer les dégâts avec les effets spéciaux
  const calculateExtraDMG = (baseDamage) => {
    // Si l'effet Enflammer est activé, ajoute +2 aux dégâts
    return enflammerActivated ? baseDamage + 2 : baseDamage;
  };

  return (
    <div>
      {player.pioche.map((piocheItem, index) => (
        <div className="card-align" key={index}>
          <div // Render each card as a div. bg color's card changes with type
            className={`card-container card-${piocheItem.card.type.toLowerCase()}`}
            onClick={() => handleCardClick(piocheItem.card)}
          >
            {/* Afficher les détails de la carte dans la pioche */}
            <p className="card-title">{piocheItem.card.name}</p>
            <p className="card-description">
              Description : {piocheItem.card.description}
            </p>
            <div className="card-details">
              <p>Rarity: {piocheItem.card.rarity}</p>
              <p>Type: {piocheItem.card.type}</p>
            </div>
            <div className="card-cost">{piocheItem.card.cost}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    enflammerActivated: state.player.enflammerActivated,
    combustionActivated: state.player.combustionActivated,
  };
};
export default connect(mapStateToProps)(Card);

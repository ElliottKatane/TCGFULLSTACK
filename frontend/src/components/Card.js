import React, { useEffect } from "react";
// redux imports
import { useDispatch } from "react-redux"; // Import useDispatch from react-redux
import {
  addCardToDefausseAndRemoveFromMain,
  ManaCost,
  activateEnflammer,
  deactivateEnflammer,
  activateCombustion,
  deactivateCombustion,
  increaseCombustionCount,
  setCardAnimationActive,
  setBuffAnimationActive,
  updateArmor,
  addColereCopy,
  addCardHebetement,
  removeCardFromMain,
  fetchCardFromPioche,
} from "../redux/actions/player.action";
import { connect } from "react-redux";
import {
  DegatsSubis,
  activateVulnerabiliteForMonster,
} from "../redux/actions/monster.action";

const Card = ({
  player,
  enflammerActivated,
  monsterFaiblesseActivated,
  monsterVulnerabiliteActivated,
}) => {
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  // Au clic sur la carte :
  const handleCardClick = (clickedCard) => {
    // Vérifie si le joueur a assez de mana pour jouer la carte
    if (player.currentMana >= clickedCard.card.cost) {
      // Check if the clicked card is "Défense" or "Même pas mal"
      const isBuffCard = ["Défense", "Même pas mal"].includes(
        clickedCard.card.name
      );

      if (!isBuffCard) {
        // If it's not a buff card, set card animation active
        dispatch(setCardAnimationActive(true));
        // Set a timeout to reset cardAnimationActive to false after 1000 milliseconds (1 second)
        setTimeout(() => {
          dispatch(setCardAnimationActive(false));
        }, 1000);
      }

      switch (clickedCard.card.name) {
        case "Frappe":
          // inflige les dégâts
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
          break;

        case "Conflit": // 0 - Jouable si vous n'avez que des Attaque en main. Infligez 14 dégâts
          //vérifie si toutes les cartes sont de type Attaque, condition pour jouer la carte Conflit
          const allAttackCards = player.main.every(
            (card) => card.card.type === "Attack"
          );
          if (allAttackCards) {
            console.log("Toutes les cartes sont des cartes d'attaque");
            // inflige les dégâts (monster action/reducer)
            dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
            // Autres actions spécifiques à la carte "Conflit" si nécessaire
          } else {
            window.alert(
              "Impossible de jouer la carte Conflit. Toutes les cartes ne sont pas de type Attaque "
            );
            console.log(
              "Impossible de jouer la carte Conflit. Toutes les cartes ne sont pas de type Attaque "
            );
            break;
          }
          break;
        case "Frappe double":
          // inflige les dégâts
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
          break;

        case "Coup de tonnerre": // Infligez 4 dégâts et appliquez 1 de Vulnérabilité à tous les ennemis
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
          dispatch(activateVulnerabiliteForMonster());

          break;

        case "Enflammer": // 1 - Gagnez 2 de force.
          dispatch(activateEnflammer());
          break;

        case "Combustion": // 1 - Perdez 1HP et infligez 5 de dégâts à tous les ennemis à la fin de votre tour.
          // met à jour le compteur de Combustion
          dispatch(increaseCombustionCount());
          // active l'effet Combustion
          dispatch(activateCombustion());
          break;
        case "Colère":
          // inflige les dégâts
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
          // add colere copy to pioche
          dispatch(addColereCopy(clickedCard.id));
          break;
        case "Défense": // 1 - Gagnez 5 de blocage.
          dispatch(updateArmor(clickedCard.card.value));
          dispatch(setBuffAnimationActive(true));
          // Set a timeout to reset cardAnimationActive to false after 1000 milliseconds (1 second)
          setTimeout(() => {
            dispatch(setBuffAnimationActive(false));
          }, 850);
          break;
        case "Même pas mal": // 1 - 8 d'armure + piocher une carte
          dispatch(updateArmor(clickedCard.card.value));
          dispatch(setBuffAnimationActive(true));
          // Set a timeout to reset cardAnimationActive to false after 1000 milliseconds (1 second)
          setTimeout(() => {
            dispatch(setBuffAnimationActive(false));
          }, 850);
          // méthode pour piocher une carte
          dispatch(fetchCardFromPioche());

          break;
        case "Charge imprudente": // 1 - Infligez 7 dégâts. Ajoutez un Hébétement à votre pioche
          dispatch(DegatsSubis(calculateExtraDMG(clickedCard.card.value)));
          dispatch(addCardHebetement("Hébétement"));
          break;
        case "Hébétement":
          // carte sans effet. Occupe une place dans la main. cliquez pour la faire disparaître
          dispatch(removeCardFromMain(clickedCard.id));
          break;
        default:
          // Gérer le cas par défaut si le nom de la carte n'est pas reconnu
          console.log("Carte non codée encore : ", clickedCard.card.name);
          break;
      }
      // Déduit le mana une fois que la vérification est faite, sinon
      dispatch(ManaCost(clickedCard.card.cost));
      // Ajoute la carte à la défausse et la retire de la main
      dispatch(
        addCardToDefausseAndRemoveFromMain(clickedCard.card, clickedCard.id)
      );
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
    let modifiedDamage = baseDamage;
    // Si l'effet Enflammer est activé, ajoute +2 aux dégâts
    if (enflammerActivated) {
      modifiedDamage += 2;
    }
    // Si l'effet Faiblesse est activé, réduit les dégâts de 30% (arrondi à l'entier supérieur)
    if (monsterFaiblesseActivated) {
      const weaknessReduction = Math.ceil(baseDamage * 0.3);
      modifiedDamage -= weaknessReduction;
    }
    // Si l'effet Vulnérabilité est activé, ajoute 30% aux dégâts
    if (monsterVulnerabiliteActivated) {
      const vulnerabilityBonus = Math.ceil(baseDamage * 0.3);
      modifiedDamage += vulnerabilityBonus;
    }

    return modifiedDamage;
  };

  return (
    <div>
      <div className="pioche">
        {player.pioche.map((piocheItem, index) => (
          <div className="card-align" key={index}>
            <div // Render each card as a div. bg color's card changes with type
              className={`card-container card-${piocheItem.card.type.toLowerCase()}`}
              onClick={() => handleCardClick(piocheItem)}
            >
              <img
                src={piocheItem.card.imageURL}
                alt={piocheItem.card.name}
                className="card-image"
              />
            </div>
          </div>
        ))}
      </div>
      {/* mapping de la main */}
      <div>
        {player.main.map((mainItem, index) => (
          <div className="card-align" key={index}>
            <div
              className={`card-container card-${mainItem.card.type.toLowerCase()}`}
              onClick={() => handleCardClick(mainItem)}
            >
              <img
                src={mainItem.card.imageURL}
                alt={mainItem.card.name}
                className="card-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    player: state.player,
    enflammerActivated: state.player.enflammerActivated,
    faiblesseActivated: state.player.faiblesseActivated,
    vulnerabiliteActivated: state.player.vulnerabiliteActivated,
    combustionActivated: state.player.combustionActivated,
    monsterVulnerabiliteActivated: state.monster.monsterVulnerabiliteActivated,
    monsterFaiblesseActivated: state.monster.monsterFaiblesseActivated,
  };
};
export default connect(mapStateToProps)(Card);

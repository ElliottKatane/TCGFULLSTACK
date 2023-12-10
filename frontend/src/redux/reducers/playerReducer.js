import {
  FETCH_PLAYER_INFO_FAILURE,
  FETCH_PLAYER_INFO_SUCCESS,
  MANA_COST,
  MONSTER_ATTACK,
  INITIALIZE_CURRENT_MANA,
  INITIALIZE_CURRENT_TURN,
  INITIALIZE_PLAYER_PIOCHE,
  ACTIVATE_ENFLAMMER,
  DEACTIVATE_ENFLAMMER,
  ACTIVATE_COMBUSTION,
  DEACTIVATE_COMBUSTION,
  END_PLAYER_TURN,
  END_MONSTER_TURN,
  INITIALIZE_CURRENT_PLAYER_HP,
  ADD_CARD_TO_DEFAUSSE_AND_REMOVE_FROM_PIOCHE,
  SET_CARD_ANIMATION_ACTIVE,
  UPDATE_ARMOR,
  RESET_ARMOR,
} from "../actions/player.action";

const initialState = {
  // stats
  playerInfo: null,
  currentMana: 0,
  currentPlayerHealth: 100,
  armor: 0,
  currentTurn: "player",
  // pouvoirs
  enflammerActivated: false,
  combustionActivated: false,
  // cartes
  pioche: [],
  main: [],
  defausse: [],
  //animation
  cardAnimationActive: false,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    // Initialisation du tour et gestion de fins de tour
    case INITIALIZE_CURRENT_TURN:
      return {
        ...state,
        currentTurn: "player",
      };
    case END_PLAYER_TURN:
      return {
        ...state,
        currentTurn: "monster",
      };
    case END_MONSTER_TURN:
      return { ...state, currentTurn: "player" };
    // carte Combustion
    case ACTIVATE_COMBUSTION:
      return {
        ...state,
        combustionActivated: true,
      };
    case DEACTIVATE_COMBUSTION:
      return {
        ...state,
        combustionActivated: false,
      };
    // carte Enflammer
    case ACTIVATE_ENFLAMMER:
      return {
        ...state,
        enflammerActivated: true,
      };
    case DEACTIVATE_ENFLAMMER:
      return {
        ...state,
        enflammerActivated: false,
      };
    // fetch des infos du joueur
    case FETCH_PLAYER_INFO_SUCCESS:
      return {
        ...state,
        playerInfo: action.payload,
      };
    case FETCH_PLAYER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    // Coûts en mana et initialisation de la manaPool
    case INITIALIZE_CURRENT_MANA:
      return {
        ...state,
        currentMana: action.payload.manaPool,
      };
    case INITIALIZE_PLAYER_PIOCHE:
      return {
        ...state,
        pioche: action.payload.pioche,
        defausse: [],
      };
    case INITIALIZE_CURRENT_PLAYER_HP:
      return {
        ...state,
        currentPlayerHealth: action.payload.HP,
      };
    case MANA_COST:
      return {
        ...state,
        currentMana: state.currentMana - action.payload.mana,
      };
    // attaque du monstre et calcul des dégâts en tenant compte de l'armure
    case MONSTER_ATTACK:
      // Vérifier s'il y a de l'armure
      if (state.armor > 0) {
        // S'il y a de l'armure, réduire d'abord l'armure
        const remainingArmor = state.armor - action.payload.damageValue;

        // Si l'armure ne suffit pas à absorber toute l'attaque
        if (remainingArmor < 0) {
          const remainingHealth = state.currentPlayerHealth + remainingArmor;
          return {
            ...state,
            armor: 0,
            // ternaire qui permet de ne pas avoir de points de vie négatifs
            currentPlayerHealth: remainingHealth < 0 ? 0 : remainingHealth,
          };
        } else {
          // Si l'armure suffit à absorber l'attaque, mettre à jour l'armure
          return {
            ...state,
            armor: remainingArmor,
          };
        }
      } else {
        // S'il n'y a pas d'armure, réduire directement les points de vie
        const remainingHealth =
          state.currentPlayerHealth - action.payload.damageValue;
        return {
          ...state,
          currentPlayerHealth: remainingHealth < 0 ? 0 : remainingHealth,
          currentArmor: 0,
        };
      }
    // gestion de l'armure
    case RESET_ARMOR:
      return {
        ...state,
        armor: 0,
      };
    case UPDATE_ARMOR:
      return {
        ...state,
        armor: state.armor + action.payload.armorValue,
      };
    // gestion des cartes
    case ADD_CARD_TO_DEFAUSSE_AND_REMOVE_FROM_PIOCHE:
      console.log(
        "Reducer: ADD_CARD_TO_DEFAUSSE_AND_REMOVE_FROM_PIOCHE action received"
      );
      console.log("Payload:", action.payload.id);
      console.log("Pioche before update:", state.pioche);

      const updatedPioche = state.pioche.map((piocheItem) => {
        if (piocheItem.id === action.payload.id) {
          console.log("Updating piocheItem:", piocheItem);
          return { ...piocheItem, quantity: piocheItem.quantity - 1 };
        }
        return piocheItem;
      });

      console.log("Updated pioche:", updatedPioche);

      return {
        ...state,
        defausse: [
          ...state.defausse,
          { card: action.payload.card, id: action.payload.id, quantity: 1 },
        ],
        pioche: updatedPioche.filter((piocheItem) => piocheItem.quantity !== 0),
      };

    case SET_CARD_ANIMATION_ACTIVE:
      return {
        ...state,
        cardAnimationActive: action.payload,
      };
    // default
    default:
      return state;
  }
};

export default playerReducer;

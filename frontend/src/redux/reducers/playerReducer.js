import {
  FETCH_PLAYER_INFO_FAILURE,
  FETCH_PLAYER_INFO_SUCCESS,
  MANA_COST,
  INITIALIZE_CURRENT_MANA,
  ACTIVATE_ENFLAMMER,
  DEACTIVATE_ENFLAMMER,
} from "../actions/player.action";

const initialState = {
  playerInfo: null,
  currentMana: 0,
  enflammerActivated: false,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
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
    case FETCH_PLAYER_INFO_SUCCESS:
      return {
        ...state,
        playerInfo: action.payload, // Stockez les informations du monstre, 1er élément du tableau
      };
    case FETCH_PLAYER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case INITIALIZE_CURRENT_MANA:
      return {
        ...state,
        currentMana: action.payload.manaPool,
      };
    case MANA_COST:
      return {
        ...state,
        currentMana: state.currentMana - action.payload.mana,
      };
    default:
      return state;
  }
};

export default playerReducer;

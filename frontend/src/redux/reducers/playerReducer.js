import {
  FETCH_PLAYER_INFO_FAILURE,
  FETCH_PLAYER_INFO_SUCCESS,
  MANA_COST,
} from "../actions/player.action";

const initialState = {
  playerInfo: null,
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYER_INFO_SUCCESS:
      console.log("Player info from action (reducer)", action.payload[0]);

      return {
        ...state,
        playerInfo: action.payload, // Stockez les informations du monstre, 1er élément du tableau
      };
    case FETCH_PLAYER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case MANA_COST:
      return {
        ...state,
        currentMana: state.mana - action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;

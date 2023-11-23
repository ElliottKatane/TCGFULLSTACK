import {
  USE_FRAPPE_CARD,
  FETCH_RANDOM_CARDS_SUCCESS,
} from "../actions/card.action"; // Importez l'action type

// État initial de votre reducer
const initialState = {
  damage: 0, // Initial damage value
  randomCards: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case USE_FRAPPE_CARD:
      // Vous pouvez définir la logique pour mettre à jour l'état en fonction de l'action
      // Par exemple, ajouter la valeur de dommages à l'état actuel
      return {
        ...state,
        damage: state.damage + action.payload,
      };
    case FETCH_RANDOM_CARDS_SUCCESS:
      return {
        ...state,
        randomCards: action.payload,
      };
    // Vous pouvez ajouter d'autres cas pour d'autres types d'action ici
    default:
      return state;
  }
};

export default cardReducer;

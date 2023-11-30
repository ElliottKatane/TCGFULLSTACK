import { FETCH_RANDOM_CARDS_SUCCESS } from "../actions/card.action"; // Importez l'action type

// État initial de votre reducer
const initialState = {
  damage: 0, // Initial damage value
  randomCards: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
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

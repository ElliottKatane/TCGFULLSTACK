import { FETCH_RANDOM_CARDS_SUCCESS } from "../actions/card.action"; // Importez l'action type

// État initial de votre reducer
const initialState = {
  damage: 0, // Initial damage value
  randomCards: [],
};

const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RANDOM_CARDS_SUCCESS:
      const updatedCards = action.payload.map((card) => ({
        ...card,
        imageURL: `/assets/${card.name.toLowerCase()}.png`,
      }));
      console.log("Updated Cards:", updatedCards);

      return {
        ...state,
        randomCards: updatedCards,
      };

    // Vous pouvez ajouter d'autres cas pour d'autres types d'action ici
    default:
      return state;
  }
};

export default cardReducer;

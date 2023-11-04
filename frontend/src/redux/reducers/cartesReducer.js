const initialState = {
  cards: [],
};

const cartesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.payload],
      };
    case "REMOVE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartesReducer;

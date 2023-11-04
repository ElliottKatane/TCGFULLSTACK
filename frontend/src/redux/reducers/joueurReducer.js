const initialState = {
  health: 100,
  mana: 3,
};

const joueurReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PLAYER_ATTACK":
      return {
        ...state,
        health: state.health - action.payload,
      };
    case "PLAYER_REGENERATE_MANA":
      return {
        ...state,
        mana: state.mana + action.payload,
      };
    default:
      return state;
  }
};

export default joueurReducer;

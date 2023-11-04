const initialState = {
  health: 100,
};

const ennemiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ENEMY_ATTACK":
      return {
        ...state,
        health: state.health - action.payload,
      };
    case "ENEMY_DEFEND":
      return state; // Placeholder for defend action
    default:
      return state;
  }
};

export default ennemiReducer;

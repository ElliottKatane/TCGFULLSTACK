// reducers/monstersReducer.js

import {
  FETCH_MONSTER_INFO,
  UPDATE_MONSTER_HP,
} from "../actions/monstresActions";

const initialState = {
  monsterInfo: null, // Informations du monstre
  health: 0, // init des PV du monstre. On met 0 pour éviter d'avoir à gérer une erreur "undefined"
};

const monstresReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONSTER_INFO:
      return {
        ...state,
        monsterInfo: action.payload, // Stockez les informations du monstre
      };
    case UPDATE_MONSTER_HP:
      return {
        ...state,
        health: action.payload, // Mettez à jour les points de vie du monstre
      };
    default:
      return state;
  }
};

export default monstresReducer;

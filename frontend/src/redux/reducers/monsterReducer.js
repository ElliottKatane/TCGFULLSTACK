// reducers/monstersReducer.js

import {
  FETCH_MONSTER_INFO_SUCCESS,
  UPDATE_MONSTER_HP,
  DEGATS_SUBIS,
} from "../actions/monster.action";

const initialState = {
  monsterInfo: null, // Informations du monstre
  health: null, // Pas besoin d'initialiser à 0 ici
};

const monstresReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONSTER_INFO_SUCCESS:
      return {
        ...state,
        monsterInfo: action.payload[0], // Stockez les informations du monstre, 1er élément du tableau
      };
    case UPDATE_MONSTER_HP:
      return {
        ...state,
        health: action.payload, // Mettez à jour les points de vie du monstre
      };
    case DEGATS_SUBIS:
      return {
        ...state,
        health: state.health - action.payload.damageValue, // Mettez à jour les points de vie du monstre
      };
    default:
      return state;
  }
};

export default monstresReducer;

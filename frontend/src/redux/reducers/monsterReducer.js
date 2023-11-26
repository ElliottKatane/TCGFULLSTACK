import {
  FETCH_MONSTER_INFO_SUCCESS,
  FETCH_MONSTER_INFO_FAILURE,
  UPDATE_MONSTER_HP,
  DEGATS_SUBIS,
} from "../actions/monster.action";

const initialState = {
  monsterInfo: null, // Informations du monstre
};

const monsterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MONSTER_INFO_SUCCESS:
      return {
        ...state,
        monsterInfo: action.payload[0], // Stockez les informations du monstre, 1er élément du tableau
      };
    case FETCH_MONSTER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case UPDATE_MONSTER_HP:
      return {
        ...state,
        health: action.payload, // Mettez à jour les points de vie du monstre
      };
    case DEGATS_SUBIS:
      console.log("Reducing damage. Current health:", state.monsterInfo.health);
      console.log("Damage value:", action.payload.damageValue);
      console.log("HP after dmg", state.monsterInfo.health);
      return {
        ...state,
        monsterInfo: {
          ...state.monsterInfo,
          health: state.monsterInfo.health - action.payload.damageValue,
        },
      };
    default:
      return state;
  }
};

export default monsterReducer;

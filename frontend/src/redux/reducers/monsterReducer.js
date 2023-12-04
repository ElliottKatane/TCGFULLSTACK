import {
  FETCH_MONSTER_INFO_SUCCESS,
  FETCH_MONSTER_INFO_FAILURE,
  DEGATS_SUBIS,
} from "../actions/monster.action";

const initialState = {
  monsterInfo: null, // Informations du monstre
};

const monsterReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch des infos du monstre
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

    case DEGATS_SUBIS:
      console.log("Reducing damage. Current health:", state.monsterInfo.health);
      console.log("Damage value:", action.payload.damageValue);
      const newHP = state.monsterInfo.health - action.payload.damageValue; //J'ai modifier le log (ligne 28) pour montrer la vie courante. Avant ca afficher la vie avant l'attaque
      console.log("HP after dmg", newHP);
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

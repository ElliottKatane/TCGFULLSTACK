import {
  FETCH_MONSTER_INFO_SUCCESS,
  FETCH_MONSTER_INFO_FAILURE,
  DEGATS_SUBIS,
  INITIALIZE_CURRENT_HP,
  UPDATE_MONSTER_ARMOR,
  RESET_MONSTER_ARMOR,
} from "../actions/monster.action";

const initialState = {
  monsterInfo: null, // Informations du monstre
  currentHealth: 0,
  armor: 0,
};

const monsterReducer = (state = initialState, action) => {
  switch (action.type) {
    // fetch des infos du monstre
    case FETCH_MONSTER_INFO_SUCCESS:
      return {
        ...state,
        monsterInfo: action.payload, // Stockez les informations du monstre, 1er élément du tableau
      };
    case FETCH_MONSTER_INFO_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case INITIALIZE_CURRENT_HP:
      return {
        ...state,
        currentHealth: action.payload.health,
      };

    case UPDATE_MONSTER_ARMOR:
      return {
        ...state,
        armor: state.armor + action.payload.armorValue,
      };
    case RESET_MONSTER_ARMOR:
      return {
        ...state,
        armor: 0,
      };

    case DEGATS_SUBIS:
      console.log("Reducing damage. Current health:", state.currentHealth);
      console.log("Damage value:", action.payload.damageValue);
      const effectiveDamage = Math.max(
        action.payload.damageValue - state.armor,
        0
      );
      const newHP = state.currentHealth - effectiveDamage;
      console.log("HP after dmg", newHP);
      return {
        ...state,
        currentHealth: newHP,
      };

    default:
      return state;
  }
};

export default monsterReducer;

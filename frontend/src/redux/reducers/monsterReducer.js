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
      console.log("Monster Info received:", action.payload);
      return {
        ...state,
        monsterInfo: action.payload,
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
        armor: Math.max(state.armor + action.payload.armorValue, 0),
      };

    case RESET_MONSTER_ARMOR:
      return {
        ...state,
        armor: 0,
      };

    case DEGATS_SUBIS:
      console.log("Reducing damage. Current health:", state.currentHealth);
      console.log("Damage value:", action.payload.damageValue);
      console.log("Armor:", state.armor);

      // Ensure damageValue and armor are valid numbers
      const damageValue = Number(action.payload.damageValue);
      const armor = Number(state.armor);

      console.log("Converted Damage value:", damageValue);
      console.log("Converted Armor:", armor);

      if (isNaN(damageValue) || isNaN(armor)) {
        console.error("Invalid damageValue or armor:", damageValue, armor);
        return state;
      }

      // If conversion to number fails, default to 0
      const effectiveDamage = Math.max(damageValue - armor, 0);

      console.log("Effective damage after armor:", effectiveDamage);

      // Ensure currentHealth is a valid number
      const newHP = Math.max(Number(state.currentHealth) - effectiveDamage, 0);

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

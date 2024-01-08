import {
  FETCH_MONSTER_INFO_SUCCESS,
  FETCH_MONSTER_INFO_FAILURE,
  DEGATS_SUBIS,
  INITIALIZE_CURRENT_HP,
  ACTIVATE_VULNERABILITE,
  DEACTIVATE_VULNERABILITE,
  ACTIVATE_FAIBLESSE,
  DEACTIVATE_FAIBLESSE,
  HANDLE_FAIBLESSE_VULNERABILITE,
} from "../actions/monster.action";

const initialState = {
  monsterInfo: null, // Informations du monstre
  faiblesseActivated: false,
  vulnerabiliteActivated: false,
  faiblesseCount: 0,
  vulnerabiliteCount: 0,
  currentHealth: 0,
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

    case DEGATS_SUBIS:
      console.log("Reducing damage. Current health:", state.currentHealth);
      console.log("Damage value:", action.payload.damageValue);
      const newHP = state.currentHealth - action.payload.damageValue; //J'ai modifier le log (ligne 28) pour montrer la vie courante. Avant ca afficher la vie avant l'attaque
      console.log("HP after dmg", newHP);
      return {
        ...state,
        currentHealth: newHP,
      };
    // Etats Vulnerabilite et Faiblesse
    case ACTIVATE_VULNERABILITE:
      return {
        ...state,
        vulnerabiliteActivated: true,
      };
    case DEACTIVATE_VULNERABILITE:
      return {
        ...state,
        vulnerabiliteActivated: false,
      };
    case ACTIVATE_FAIBLESSE:
      return {
        ...state,
        faiblesseActivated: true,
      };
    case DEACTIVATE_FAIBLESSE:
      return {
        ...state,
        faiblesseActivated: false,
      };
    case HANDLE_FAIBLESSE_VULNERABILITE:
      if (state.faiblesseActivated) {
        return {
          ...state,
          faiblesseCount:
            state.faiblesseCount > 0 ? state.faiblesseCount - 1 : 0,
        };
      } else if (state.vulnerabiliteActivated) {
        return {
          ...state,
          vulnerabiliteCount:
            state.vulnerabiliteCount > 0 ? state.vulnerabiliteCount - 1 : 0,
        };
      }
      return state;
    default:
      return state;
  }
};

export default monsterReducer;

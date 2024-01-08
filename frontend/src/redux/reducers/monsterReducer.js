import {
  FETCH_MONSTER_INFO_SUCCESS,
  FETCH_MONSTER_INFO_FAILURE,
  DEGATS_SUBIS,
  INITIALIZE_CURRENT_HP,
  HANDLE_FAIBLESSE_VULNERABILITE_MONSTER,
  ACTIVATE_VULNERABILITE_FOR_MONSTER,
  DEACTIVATE_VULNERABILITE_FOR_MONSTER,
  ACTIVATE_FAIBLESSE_FOR_MONSTER,
  DEACTIVATE_FAIBLESSE_FOR_MONSTER,
} from "../actions/monster.action";

const initialState = {
  monsterInfo: null, // Informations du monstre
  monsterFaiblesseActivated: false,
  monsterVulnerabiliteActivated: false,
  monsterFaiblesseCount: 0,
  monsterVulnerabiliteCount: 0,
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
    case ACTIVATE_VULNERABILITE_FOR_MONSTER:
      return {
        ...state,
        monsterVulnerabiliteActivated: true,
      };
    case DEACTIVATE_VULNERABILITE_FOR_MONSTER:
      return {
        ...state,
        monsterVulnerabiliteActivated: false,
      };
    case ACTIVATE_FAIBLESSE_FOR_MONSTER:
      return {
        ...state,
        monsterFaiblesseActivated: true,
      };
    case DEACTIVATE_FAIBLESSE_FOR_MONSTER:
      return {
        ...state,
        monsterFaiblesseActivated: false,
      };
    case HANDLE_FAIBLESSE_VULNERABILITE_MONSTER:
      if (state.monsterFaiblesseActivated) {
        return {
          ...state,
          monsterFaiblesseCount:
            state.monsterFaiblesseCount > 0
              ? state.monsterFaiblesseCount - 1
              : 0,
        };
      } else if (state.monsterVulnerabiliteActivated) {
        return {
          ...state,
          monsterVulnerabiliteCount:
            state.monsterVulnerabiliteCount > 0
              ? state.monsterVulnerabiliteCount - 1
              : 0,
        };
      }
      return state;
    default:
      return state;
  }
};

export default monsterReducer;

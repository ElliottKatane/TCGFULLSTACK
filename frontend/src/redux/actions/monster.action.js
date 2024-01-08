export const FETCH_MONSTER_INFO_SUCCESS = "FETCH_MONSTER_INFO_SUCCESS";
export const FETCH_MONSTER_INFO_FAILURE = "FETCH_MONSTER_INFO_FAILURE";
export const DEGATS_SUBIS = "DEGATS_SUBIS";
export const INITIALIZE_CURRENT_HP = "INITIALIZE_CURRENT_HP";
// Etats Vulnerabilite et Faiblesse
export const ACTIVATE_VULNERABILITE = "ACTIVATE_VULNERABILITE";
export const DEACTIVATE_VULNERABILITE = "DEACTIVATE_VULNERABILITE";
export const ACTIVATE_FAIBLESSE = "ACTIVATE_FAIBLESSE";
export const DEACTIVATE_FAIBLESSE = "DEACTIVATE_FAIBLESSE";
export const HANDLE_FAIBLESSE_VULNERABILITE = "HANDLE_FAIBLESSE_VULNERABILITE";

export const fetchMonsterInfoSuccess = (monsterInfo) => ({
  type: FETCH_MONSTER_INFO_SUCCESS,
  payload: monsterInfo,
});

export const fetchMonsterInfoFailure = (error) => ({
  type: FETCH_MONSTER_INFO_FAILURE,
  payload: error,
});

export const fetchMonster = (mapLevel) => async (dispatch) => {
  try {
    const response = await fetch(
      `https://tcg-backend-eli.onrender.com/api/monsters/${mapLevel}`
    );
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }
    const monsterInfo = await response.json();
    dispatch(fetchMonsterInfoSuccess(monsterInfo));
    dispatch(InitializeMonsterHP(monsterInfo.health));
  } catch (error) {
    dispatch(fetchMonsterInfoFailure(error.message));
    throw error;
  }
};

// Action pour infliger les dégâts
export const DegatsSubis = (damageValue) => {
  return {
    type: DEGATS_SUBIS,
    payload: {
      damageValue,
    },
  };
};

export const InitializeMonsterHP = (health) => {
  return {
    type: INITIALIZE_CURRENT_HP,
    payload: {
      health,
    },
  };
};
// Etats Vulnerabilite et Faiblesse
export const activateVulnerabilite = () => ({
  type: ACTIVATE_VULNERABILITE,
});
export const deactivateVulnerabilite = () => ({
  type: DEACTIVATE_VULNERABILITE,
});
export const activateFaiblesse = () => ({
  type: ACTIVATE_FAIBLESSE,
});
export const deactivateFaiblesse = () => ({
  type: DEACTIVATE_FAIBLESSE,
});
export const handleFaiblesseVulnerabilite = () => ({
  type: HANDLE_FAIBLESSE_VULNERABILITE,
});

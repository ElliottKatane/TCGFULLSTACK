export const FETCH_MONSTER_INFO_SUCCESS = "FETCH_MONSTER_INFO_SUCCESS";
export const FETCH_MONSTER_INFO_FAILURE = "FETCH_MONSTER_INFO_FAILURE";
export const DEGATS_SUBIS = "DEGATS_SUBIS";
export const INITIALIZE_CURRENT_HP = "INITIALIZE_CURRENT_HP";
export const UPDATE_MONSTER_ARMOR = "UPDATE_MONSTER_ARMOR";
export const RESET_MONSTER_ARMOR = "RESET_MONSTER_ARMOR";

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

export const updateMonsterArmor = (armorValue) => ({
  type: UPDATE_MONSTER_ARMOR,
  payload: { armorValue },
});

export const resetMonsterArmor = () => ({
  type: RESET_MONSTER_ARMOR,
});

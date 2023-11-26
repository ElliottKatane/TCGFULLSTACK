export const FETCH_MONSTER_INFO_SUCCESS = "FETCH_MONSTER_INFO_SUCCESS";
export const FETCH_MONSTER_INFO_FAILURE = "FETCH_MONSTER_INFO_FAILURE";
export const UPDATE_MONSTER_HP = "UPDATE_MONSTER_HP";
export const DEGATS_SUBIS = "DEGATS_SUBIS";
export const INIT_HP_MONSTER = "INIT_HP_MONSTER";

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
    const response = await fetch(`/api/monsters/${mapLevel}`);
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }
    const monsterInfo = await response.json();
    // Log the monsterInfo to the console
    console.log("Monster Info (redux):", monsterInfo);
    dispatch(fetchMonsterInfoSuccess(monsterInfo));
  } catch (error) {
    dispatch(fetchMonsterInfoFailure(error.message));
  }
};

// initialiser les points de vie du monstre
export const initHPMonster = (health) => {
  return {
    type: INIT_HP_MONSTER,
    payload: health,
  };
};

export const updateMonsterHP = (newHP) => {
  return {
    type: UPDATE_MONSTER_HP,
    payload: newHP,
  };
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

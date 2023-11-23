export const FETCH_MONSTER_INFO = "FETCH_MONSTER_INFO";
export const UPDATE_MONSTER_HP = "UPDATE_MONSTER_HP";

const fetchMonsterInfoFromDatabase = async (monsterName) => {
  try {
    const response = await fetch(`/api/monsters/${monsterName}`);
    if (!response.ok) {
      throw new Error("La requête a échoué");
    }

    const data = await response.json();
    return data; // Supposons que la réponse contient les informations du monstre
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations du monstre :",
      error
    );
    return null; // Gérez les erreurs de manière appropriée
  }
};
export const fetchMonsterInfo = (monsterName) => {
  return async (dispatch) => {
    try {
      const monsterInfo = await fetchMonsterInfoFromDatabase(monsterName);
      if (monsterInfo) {
        dispatch({ type: FETCH_MONSTER_INFO, payload: monsterInfo });
      }
    } catch (error) {
      // Gérez les erreurs de manière appropriée
    }
  };
};
export const updateMonsterHP = (newHP) => {
  return {
    type: UPDATE_MONSTER_HP,
    payload: newHP,
  };
};

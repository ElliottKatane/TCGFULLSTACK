export const FETCH_PLAYER_INFO_SUCCESS = "FETCH_PLAYER_INFO_SUCCESS";
export const FETCH_PLAYER_INFO_FAILURE = "FETCH_PLAYER_INFO_FAILURE";
export const MANA_COST = "MANA_COST";

export const fetchPlayerInfoSuccess = (playerInfo) => ({
  type: FETCH_PLAYER_INFO_SUCCESS,
  payload: playerInfo,
});

export const fetchPlayerInfoFailure = (error) => ({
  type: FETCH_PLAYER_INFO_FAILURE,
  payload: error,
});

// Action pour réduire le coût du mana selon la carte jouée
export const ManaCost = (mana) => {
  return {
    type: MANA_COST,
    payload: {
      mana,
    },
  };
};
// structure différente (et moins lisible selon GPT) de fetchMonster mais qui fonctionne aussi (.then et.catch au lieu de try/catch)
export const fetchPlayer = (userEmail) => async (dispatch) => {
  try {
    const response = await fetch(`/api/player/profile/${userEmail}`);
    if (!response.ok) {
      throw new Error("La requête a échoué (fetchPlayer, Redux)");
    }
    const playerInfo = await response.json();
    dispatch(fetchPlayerInfoSuccess(playerInfo));
    console.log("Player Info de Redux:", playerInfo);
    return playerInfo; // Ajoutez cette ligne pour retourner les données
  } catch (error) {
    dispatch(fetchPlayerInfoFailure(error.message));
    throw error; // Vous pouvez choisir de relancer l'erreur ou de la gérer ici
  }
};

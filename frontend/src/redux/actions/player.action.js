// fetches
export const FETCH_PLAYER_INFO_SUCCESS = "FETCH_PLAYER_INFO_SUCCESS";
export const FETCH_PLAYER_INFO_FAILURE = "FETCH_PLAYER_INFO_FAILURE";
// mana
export const MANA_COST = "MANA_COST";
export const INITIALIZE_CURRENT_MANA = "INITIALIZE_CURRENT_MANA";
// carte Enflammer et Combustion
export const ACTIVATE_ENFLAMMER = "ACTIVATE_ENFLAMMER";
export const DEACTIVATE_ENFLAMMER = "DEACTIVATE_ENFLAMMER";
export const ACTIVATE_COMBUSTION = "ACTIVATE_COMBUSTION";
export const DEACTIVATE_COMBUSTION = "DEACTIVATE_COMBUSTION";

export const fetchPlayerInfoSuccess = (playerInfo) => ({
  type: FETCH_PLAYER_INFO_SUCCESS,
  payload: playerInfo,
});

export const fetchPlayerInfoFailure = (error) => ({
  type: FETCH_PLAYER_INFO_FAILURE,
  payload: error,
});

export const activateCombustion = () => ({
  type: ACTIVATE_COMBUSTION,
});

export const deactivateCombustion = () => ({
  type: DEACTIVATE_COMBUSTION,
});
// carte Enflammer
export const activateEnflammer = () => ({
  type: ACTIVATE_ENFLAMMER,
});

export const deactivateEnflammer = () => ({
  type: DEACTIVATE_ENFLAMMER,
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
export const initializeCurrentMana = (manaPool) => {
  return {
    type: INITIALIZE_CURRENT_MANA,
    payload: {
      manaPool,
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

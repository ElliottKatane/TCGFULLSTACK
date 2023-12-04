// fetches
export const FETCH_PLAYER_INFO_SUCCESS = "FETCH_PLAYER_INFO_SUCCESS";
export const FETCH_PLAYER_INFO_FAILURE = "FETCH_PLAYER_INFO_FAILURE";

// mana
export const MANA_COST = "MANA_COST";
export const MONSTER_ATTACK = "MONSTER_ATTACK";
// initialisation
export const INITIALIZE_CURRENT_MANA = "INITIALIZE_CURRENT_MANA";
export const INITIALIZE_CURRENT_TURN = "INIZIALIZE_CURRENT_TURN";
export const INITIALIZE_PLAYER_PIOCHE = "INITIALIZE_PLAYER_PIOCHE";
// carte Enflammer et Combustion
export const ACTIVATE_ENFLAMMER = "ACTIVATE_ENFLAMMER";
export const DEACTIVATE_ENFLAMMER = "DEACTIVATE_ENFLAMMER";
export const ACTIVATE_COMBUSTION = "ACTIVATE_COMBUSTION";
export const DEACTIVATE_COMBUSTION = "DEACTIVATE_COMBUSTION";
// fin de tour
export const END_PLAYER_TURN = "END_PLAYER_TURN";
export const END_MONSTER_TURN = "END_MONSTER_TURN";

export const switchTurn = (currentTurn) => (dispatch) => {
  if (currentTurn === "player") {
    dispatch(endPlayerTurn());
  } else if (currentTurn === "monster") {
    dispatch(endMonsterTurn());
    // probablement qu'il faudra rajouter :
    // vérifier si la pioche est vide. si oui, il faut aller transvaser les cartes de la défausse dans la pioche
    // la logique pour fetch de nouvelles cartes depuis la pioche
    // le reset de currentMana
  }
};

export const endPlayerTurn = () => ({
  type: END_PLAYER_TURN,
});
export const endMonsterTurn = () => ({
  type: END_MONSTER_TURN,
});

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
// Action pour infliger les dégâts
export const MonsterAttack = (damageValue) => {
  return {
    type: MONSTER_ATTACK,
    payload: {
      damageValue,
    },
  };
};

export const initializeCurrentTurn = (currentTurn) => {
  return {
    type: INITIALIZE_CURRENT_TURN,
    payload: {
      currentTurn,
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
export const initializePlayerPioche = (pioche) => {
  return { type: INITIALIZE_PLAYER_PIOCHE, payload: { pioche } };
};

export const fetchPlayer = (userEmail) => async (dispatch) => {
  try {
    const response = await fetch(`/api/player/profile/${userEmail}`);
    if (!response.ok) {
      throw new Error("La requête a échoué (fetchPlayer, Redux)");
    }
    const playerInfo = await response.json();

    // Mettez à jour pour inclure le traitement des cartes du deck
    dispatch(fetchPlayerInfoSuccess(playerInfo));

    console.log("Player Info de fetchPlayer Redux:", playerInfo);
    return playerInfo;
  } catch (error) {
    dispatch(fetchPlayerInfoFailure(error.message));
    throw error;
  }
};

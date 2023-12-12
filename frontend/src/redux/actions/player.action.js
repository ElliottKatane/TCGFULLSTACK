// import unique id generator
import { v4 as uuidv4 } from "uuid";

// fetches
export const FETCH_PLAYER_INFO_SUCCESS = "FETCH_PLAYER_INFO_SUCCESS";
export const FETCH_PLAYER_INFO_FAILURE = "FETCH_PLAYER_INFO_FAILURE";
// mana, défense et dégats infligés par le monstre
export const MANA_COST = "MANA_COST";
export const MONSTER_ATTACK = "MONSTER_ATTACK";
export const UPDATE_ARMOR = "UPDATE_ARMOR";
export const RESET_ARMOR = "RESET_ARMOR";
// initialisation
export const INITIALIZE_CURRENT_MANA = "INITIALIZE_CURRENT_MANA";
export const INITIALIZE_CURRENT_PLAYER_HP = "INITIALIZE_CURRENT_PLAYER_HP";
export const INITIALIZE_CURRENT_TURN = "INIZIALIZE_CURRENT_TURN";
export const INITIALIZE_PLAYER_PIOCHE = "INITIALIZE_PLAYER_PIOCHE";
export const INITIALIZE_COMBUSTION_COUNT = "INITIALIZE_COMBUSTION_COUNT";
// carte Enflammer et Combustion
export const ACTIVATE_ENFLAMMER = "ACTIVATE_ENFLAMMER";
export const DEACTIVATE_ENFLAMMER = "DEACTIVATE_ENFLAMMER";
export const ACTIVATE_COMBUSTION = "ACTIVATE_COMBUSTION";
export const DEACTIVATE_COMBUSTION = "DEACTIVATE_COMBUSTION";
export const INCREASE_COMBUSTION_COUNT = "INCREASE_COMBUSTION_COUNT";
// carte Colère
export const ADD_COLERE_COPY = "ADD_COLERE_COPY";
// fin de tour
export const END_PLAYER_TURN = "END_PLAYER_TURN";
export const END_MONSTER_TURN = "END_MONSTER_TURN";
// carte dans la défausse
export const ADD_CARD_TO_DEFAUSSE_AND_REMOVE_FROM_PIOCHE =
  "ADD_CARD_TO_DEFAUSSE_AND_REMOVE_FROM_PIOCHE";
// carte de la pioche vers la main
export const FETCH_5CARDS_FROM_PIOCHE = "FETCH_5CARDS_FROM_PIOCHE";

// animation
export const SET_CARD_ANIMATION_ACTIVE = "SET_CARD_ANIMATION_ACTIVE";

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

// gestion des tours
export const endPlayerTurn = () => ({
  type: END_PLAYER_TURN,
});
export const endMonsterTurn = () => ({
  type: END_MONSTER_TURN,
});

// fetch des infos du joueur
export const fetchPlayerInfoSuccess = (playerInfo) => ({
  type: FETCH_PLAYER_INFO_SUCCESS,
  payload: playerInfo,
});
export const fetchPlayerInfoFailure = (error) => ({
  type: FETCH_PLAYER_INFO_FAILURE,
  payload: error,
});

export const fetchPlayer = (userEmail) => async (dispatch) => {
  try {
    const response = await fetch(`/api/player/profile/${userEmail}`);
    if (!response.ok) {
      throw new Error("La requête a échoué (fetchPlayer, Redux)");
    }
    const playerInfo = await response.json();

    // Mettez à jour pour inclure le traitement des cartes du deck
    dispatch(fetchPlayerInfoSuccess(playerInfo));
    return playerInfo;
  } catch (error) {
    dispatch(fetchPlayerInfoFailure(error.message));
    throw error;
  }
};

// cartes Pouvoir
export const activateCombustion = () => ({
  type: ACTIVATE_COMBUSTION,
});
export const deactivateCombustion = () => ({
  type: DEACTIVATE_COMBUSTION,
});
export const activateEnflammer = () => ({
  type: ACTIVATE_ENFLAMMER,
});
export const deactivateEnflammer = () => ({
  type: DEACTIVATE_ENFLAMMER,
});
export const increaseCombustionCount = (combustionPlayedCount) => {
  return {
    type: INCREASE_COMBUSTION_COUNT,
    payload: { combustionPlayedCount },
  };
};
// carte Colère (création d'une copie)
export const addColereCopy = (id) => ({
  type: ADD_COLERE_COPY,
  payload: { id },
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
// Action pour mettre à jour l'armure
export const updateArmor = (armorValue) => {
  console.log("Action dispatched with payload:", armorValue);

  return {
    type: UPDATE_ARMOR,
    payload: { armorValue },
  };
};
export const resetArmor = () => {
  return {
    type: RESET_ARMOR,
  };
};
// Initialisations (tour, mana, pioche, HP, Combustion)
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

export const initializeCurrentPlayerHP = (HP) => {
  return {
    type: INITIALIZE_CURRENT_PLAYER_HP,
    payload: {
      HP,
    },
  };
};
export const initializeCombustionCount = (count) => {
  return {
    type: INITIALIZE_COMBUSTION_COUNT,
    payload: {
      count,
    },
  };
};

export const initializePlayerPioche = (pioche) => {
  // Initialise la pioche en ajoutant un identifiant unique à chaque carte au moment de l'initialisation
  const piocheWithUniqueId = pioche.map((piocheItem) => ({
    ...piocheItem,
    id: uuidv4(), // Utilisez un identifiant unique pour chaque carte dans la pioche
  }));

  // Prend en compte la quantité de chaque carte
  const piocheWithQuantity = piocheWithUniqueId.reduce((acc, card) => {
    for (let i = 0; i < card.quantity; i++) {
      acc.push({ card: card.card, id: uuidv4(), quantity: 1 });
    }
    return acc;
  }, []);

  return {
    type: INITIALIZE_PLAYER_PIOCHE,
    payload: { pioche: piocheWithQuantity },
  };
};

// Action pour ajouter une carte à la défausse et la retirer de la pioche
export const addCardToDefausseAndRemoveFromPioche = (card, id) => ({
  type: ADD_CARD_TO_DEFAUSSE_AND_REMOVE_FROM_PIOCHE,
  payload: { card, id, quantity: 1 },
});

// Action pour fetch 5 cartes depuis la pioche
export const fetch5CardsFromPioche = () => ({
  type: FETCH_5CARDS_FROM_PIOCHE,
});
export const setCardAnimationActive = (isActive) => ({
  type: SET_CARD_ANIMATION_ACTIVE,
  payload: isActive,
});

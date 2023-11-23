// Action des cartes
export const USE_FRAPPE_CARD = "USE_FRAPPE_CARD";
export const USE_COUPDEBOULE_CARD = "USE_COUPDEBOULE_CARD";
export const USE_CONFLIT_CARD = "USE_CONFLIT_CARD";
export const USE_COLERE_CARD = "USE_COLERE_CARD";
// Fetch des cartes
export const FETCH_RANDOM_CARDS_SUCCESS = "FETCH_RANDOM_CARDS_SUCCESS";
export const FETCH_ALL_CARDS_SUCCESS = "FETCH_ALL_CARDS_SUCCESS";
export const CREATE_CARD = "CREATE_CARD";
export const FETCH_CARDS = "FETCH_CARDS";
export const INFLIGER_DEGATS = "INFLIGER_DEGATS";

//Action creator for CardForm
export const createCard = (formData) => {
  return {
    type: CREATE_CARD,
    payload: formData,
  };
};
// Action creator for fetching cards
export const fetchCards = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/card-form/getcards");
      if (!response.ok) {
        throw new Error("La requête a échoué (cards introuvables)");
      }

      const data = await response.json();
      dispatch({ type: FETCH_CARDS, payload: data.cards });
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes:", error);
    }
  };
};

export const fetchAllCardsSuccess = (cards) => ({
  type: FETCH_ALL_CARDS_SUCCESS,
  payload: cards,
});

export const fetchRandomCards = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/card-form/getRandomCards");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: FETCH_RANDOM_CARDS_SUCCESS, payload: data });
      } else {
        // Handle the error, dispatch an error action, etc.
      }
    } catch (error) {
      // Handle the error, dispatch an error action, etc.
    }
  };
};
// Thunk action to fetch all cards
export const fetchAllCards = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/card-form/getAllCards");
      const data = await response.json();
      dispatch(fetchAllCardsSuccess(data.cards));
    } catch (error) {
      // Handle the error, dispatch an error action, etc.
    }
  };
};

export const infligerDegats = (montant) => {
  return {
    type: INFLIGER_DEGATS,
    payload: {
      montant,
    },
  };
};

export const useFrappeCard = (damageValue) => {
  return {
    type: USE_FRAPPE_CARD,
    payload: damageValue, // Include the damage value as payload
  };
};
export const useColereCard = (damageValue) => {
  return {
    type: USE_COLERE_CARD,
    payload: damageValue, // Include the damage value as payload
  };
};
export const useConflitCard = (damageValue) => {
  return {
    type: USE_CONFLIT_CARD,
    payload: damageValue, // Include the damage value as payload
  };
};
export const useCoupDeBouleCard = (damageValue) => {
  return {
    type: USE_COUPDEBOULE_CARD,
    payload: damageValue, // Include the damage value as payload
  };
};

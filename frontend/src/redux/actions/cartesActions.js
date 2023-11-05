// cartesActions.js

// Action type for all the cards
export const USE_FRAPPE_CARD = "USE_FRAPPE_CARD";
export const FETCH_RANDOM_CARDS_SUCCESS = "FETCH_RANDOM_CARDS_SUCCESS";

/* La convention "ACTION_TYPE_SUCCESS" indique clairement que l'action est déclenchée après que l'opération a réussi. 
Cela peut être utile pour différencier les actions qui représentent des réussites des actions qui gèrent des erreurs, 
par exemple, "FETCH_RANDOM_CARDS_FAILURE" pour gérer les erreurs de récupération de données. */

// Action creator for using the "Frappe" card
export const useFrappeCard = (damageValue) => {
  return {
    type: USE_FRAPPE_CARD,
    payload: damageValue, // Include the damage value as payload
  };
};

// Action creator for fetchRandomCardsSuccess
export const fetchRandomCardsSuccess = (cards) => ({
  type: FETCH_RANDOM_CARDS_SUCCESS,
  payload: cards,
});
// Thunk action to fetch random cards
export const fetchRandomCards = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/api/card-form/getRandomCards");
      const data = await response.json();
      dispatch(fetchRandomCardsSuccess(data));
    } catch (error) {
      // Handle the error, dispatch an error action, etc.
    }
  };
};

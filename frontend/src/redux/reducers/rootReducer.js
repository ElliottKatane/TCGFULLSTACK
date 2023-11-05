import { combineReducers } from "redux";

// Import your reducers here
import monstresReducer from "./monstresReducer";
import joueurReducer from "./joueurReducer";
import cartesReducer from "./cartesReducer";

const rootReducer = combineReducers({
  monstres: monstresReducer,
  joueur: joueurReducer,
  cartes: cartesReducer,
});

export default rootReducer;

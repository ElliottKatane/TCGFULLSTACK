import { combineReducers } from "redux";

// Import your reducers here
import ennemiReducer from "./ennemiReducer";
import joueurReducer from "./joueurReducer";
import cartesReducer from "./cartesReducer";

const rootReducer = combineReducers({
  ennemi: ennemiReducer,
  joueur: joueurReducer,
  cartes: cartesReducer,
});

export default rootReducer;

import { combineReducers } from "redux";

// Import your reducers here
import monsterReducer from "./monsterReducer";
import playerReducer from "./playerReducer";
import cardReducer from "./cardReducer";

const rootReducer = combineReducers({
  monster: monsterReducer,
  player: playerReducer,
  card: cardReducer,
});

export default rootReducer;

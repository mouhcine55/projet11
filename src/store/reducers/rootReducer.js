import { combineReducers } from "redux";

import userReducer from "./userReducers";

// Utiliser combineReducers pour combiner tous vos reducers en un seul
export default combineReducers({
    user: userReducer,
});

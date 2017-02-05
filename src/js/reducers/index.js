import { combineReducers } from "redux";

import destinations from "./destinations.reducer"

export default combineReducers({
    destinations: destinations
})
import { combineReducers } from "redux";

import multipleDestinations from "./multipleDestinations.reducer"
import place from "./place.reducer";

export default combineReducers({
    multipleDestinations: multipleDestinations,
    place: place
})
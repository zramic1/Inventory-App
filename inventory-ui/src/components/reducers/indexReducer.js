import { combineReducers } from "redux";
import LoginReducer from "./loginReducer";

const allReducers = combineReducers({
    logovani: LoginReducer
});

export default allReducers;
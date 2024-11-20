import { combineReducers } from "redux";
import bugetRedu from "./reduserBudget";

const creatRoot = combineReducers({
    bdeta:bugetRedu
})

export default creatRoot
import { combineReducers } from "redux";
import passwords from './passwords'
import auth from './auth'

export default combineReducers({
    passwords,
    auth
})
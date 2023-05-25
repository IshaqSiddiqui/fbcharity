import {combineReducers,configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/user";

const reducer = combineReducers({
    userInfo: userReducer,
})

export default configureStore({
    reducer,
})
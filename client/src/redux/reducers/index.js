import {persistReducer} from 'redux-persist'
import Asy from 'redux-persist/lib/storage' // defaults to localStorage for web
import {combineReducers} from 'redux';
import dish from './dish';
import blog from './blog';
import store from './store';
import cart from './cart';
import user from './user';
import {LOGOUT_USER} from "../constants/user";
import initialState from "./initialState";

const userPersistConfig = {
  key: 'user',
  storage: Asy,
  whitelist: ['currentUser']
}
const combinedReducer = combineReducers({
  dish,
  store,
  blog,
  cart,
  user: persistReducer(userPersistConfig, user),
});

const reducers = (state, action) => combinedReducer(action.type === LOGOUT_USER ? initialState : state, action);
export default reducers;

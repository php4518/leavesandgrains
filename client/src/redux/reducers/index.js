import {combineReducers} from 'redux';
import home from './home';
import dish from './dish';

const reducers = combineReducers({
  home,
  dish
});

export default reducers;

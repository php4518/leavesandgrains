import { all } from 'redux-saga/effects';
import dish from './dish';
import cart from './cart';
import user from './user';
import blog from './blog';
import store from './store';

export default function* rootSaga(getState) {
  yield all([
    dish(),
    cart(),
    user(),
    blog(),
    store()
  ]);
}

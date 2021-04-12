import {all} from 'redux-saga/effects';
import home from './home';
import dish from './dish';

export default function* rootSaga(getState) {
  yield all([
    home(),
    dish(),
  ]);
}

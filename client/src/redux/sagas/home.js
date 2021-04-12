import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {GET_FUNDS,} from 'redux/constants/home';
import {setFunds, showFundsMessage,} from 'redux/actions/home';

import homeService from 'services/homeService';

export function* getFundsAsync() {
  yield takeLatest(GET_FUNDS, function* ({ params } = {}) {
    try {
      const funds = yield call(homeService.getFunds, params);
      yield put(setFunds(funds));
    } catch (err) {
      yield put(showFundsMessage(err));
    }
  });
}

export default function* homeSaga() {
  yield all([
    fork(getFundsAsync),
  ]);
}

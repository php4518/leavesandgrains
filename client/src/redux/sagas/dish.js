import {all, call, fork, put, takeLatest} from 'redux-saga/effects';
import {GET_DISHES,} from 'redux/constants/dish';
import {setDishes, showDishesLoading, showDishesMessage} from 'redux/actions/dish';

import dishService from 'services/dishService';

export function* getAllDishesAsync() {
  yield takeLatest(GET_DISHES, function* ({ params } = {}) {
    try {
      yield put(showDishesLoading(true));
      const dishes = yield call(dishService.getAllDishes, params);
      yield put(setDishes(dishes));
    } catch (err) {
      console.log(err)
      yield put(showDishesMessage(err));
    } finally {
      yield put(showDishesLoading(false));
    }
  });
}

export default function* dishSaga() {
  yield all([
    fork(getAllDishesAsync),
  ]);
}

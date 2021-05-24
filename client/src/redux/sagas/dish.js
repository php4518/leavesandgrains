import {all, call, delay, fork, put, takeLatest} from 'redux-saga/effects';
import {GET_DISHES, GET_MEALS,} from 'redux/constants/dish';
import {setDishes, setMeals, setDishesStatus} from 'redux/actions/dish';

import dishService from 'services/dishService';
import {STATUS} from "../../helpers/constants";

export function* getAllDishesAsync() {
  yield takeLatest(GET_DISHES, function* ({params} = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const dishes = yield call(dishService.getAllDishes, params);
      yield put(setDishes(dishes));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export function* getMealsAsync() {
  yield takeLatest(GET_MEALS, function* ({params} = {}) {
    try {
      yield put(setDishesStatus({ status: STATUS.LOADING }));
      const meals = yield call(dishService.getAllMeals, params);
      yield put(setMeals(meals));
      yield put(setDishesStatus({ status: STATUS.SUCCESS }));
    } catch (err) {
      console.log(err)
      yield put(setDishesStatus({ status: STATUS.ERROR, message: err.data.message }));
    }
  });
}

export default function* dishSaga() {
  yield all([
    fork(getAllDishesAsync),
    fork(getMealsAsync),
  ]);
}

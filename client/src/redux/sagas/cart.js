import {all, fork, put, select, takeLatest} from 'redux-saga/effects';
import {ADD_INDIVIDUAL_MEAL_TO_CART, ADD_MEAL_PLAN_TO_CART} from 'redux/constants/cart';
import history from "../../helpers/history";
import {setIndividualMeals, setMealPlans} from 'redux/actions/cart';
import {getMealPlanTotal} from "../../helpers/utils";

export function* addIndividualToCartAsync() {
  yield takeLatest(ADD_INDIVIDUAL_MEAL_TO_CART, function* ({item} = {}) {
    try {
      const {cart: {individualMeals}} = yield select();
      if (item.quantity === 0) {
        delete individualMeals[item._id];
      } else {
        individualMeals[item._id] = item;
      }
      yield put(setIndividualMeals(individualMeals));
    } catch (err) {
      console.log(err)
    }
  });
}

export function* addMealPlansToCartAsync() {
  yield takeLatest(ADD_MEAL_PLAN_TO_CART, function* ({plan} = {}) {
    try {
      const {cart: {mealPlans}} = yield select();
      if (plan) {
        Object.keys(plan).forEach(key => {
          plan[key] = plan[key].filter(m => m.mealObj);
        });
        mealPlans.push({total: getMealPlanTotal(plan), plan});
        yield put(setMealPlans(mealPlans));
        history.push('/cart');
      }
    } catch (err) {
      console.log(err)
    }
  });
}

export default function* dishSaga() {
  yield all([
    fork(addIndividualToCartAsync),
    fork(addMealPlansToCartAsync),
  ]);
}

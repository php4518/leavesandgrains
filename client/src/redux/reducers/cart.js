import {
  SET_INDIVIDUAL_MEALS,
  SET_MEAL_PLANS,
  RESET_CART,
  REMOVE_INDIVIDUAL_MEAL_FROM_CART,
  REMOVE_MEAL_PLAN_FROM_CART
} from '../constants/cart';
import initialState from "./initialState";

const cart = (state = initialState.cart, action) => {
  switch (action.type) {
    case SET_INDIVIDUAL_MEALS: {
      return {
        ...state,
        individualMeals: action.items,
      }
    }
    case SET_MEAL_PLANS: {
      return {
        ...state,
        mealPlans: action.items,
      }
    }

    case REMOVE_INDIVIDUAL_MEAL_FROM_CART: {
      delete state.individualMeals[action.id];
      return { ...state }
    }

    case REMOVE_MEAL_PLAN_FROM_CART: {
      state.mealPlans.splice(action.index, 1);
      return { ...state }
    }

    case RESET_CART: {
      return initialState.cart;
    }
    default:
      return state;
  }
};

export default cart;

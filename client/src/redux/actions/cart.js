import {
  ADD_INDIVIDUAL_MEAL_TO_CART,
  REMOVE_INDIVIDUAL_MEAL_FROM_CART,
  ADD_MEAL_PLAN_TO_CART,
  REMOVE_MEAL_PLAN_FROM_CART,
  SET_INDIVIDUAL_MEALS,
  SET_MEAL_PLANS,
  RESET_CART
} from '../constants/cart';

export const addIndividualMealToCart = (item = null) => {
  return {type: ADD_INDIVIDUAL_MEAL_TO_CART, item};
};

export const removeIndividualMealFromCart = (id) => {
  return {type: REMOVE_INDIVIDUAL_MEAL_FROM_CART, id};
};

export const addMealPlanToCart = (plan = null) => {
  return {type: ADD_MEAL_PLAN_TO_CART, plan};
};

export const removeMealPlanFromCart = (index) => {
  return {type: REMOVE_MEAL_PLAN_FROM_CART, index};
};

export const setIndividualMeals = (items = null) => {
  return {type: SET_INDIVIDUAL_MEALS, items};
};

export const setMealPlans = (items = null) => {
  return {type: SET_MEAL_PLANS, items};
};

export const resetCart = () => {
  return {type: RESET_CART};
};

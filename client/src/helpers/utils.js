import {IMAGE_BASE_URL} from "./config";
import React from "react";

export const dateFormat = 'DD MMMM YYYY';
const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%,.}{)(^<>&*])[a-zA-Z0-9!@#,.}{)($<>%^&*]{6,}$/;

export const validatePhoneNumber = (phone) => !phone.match(phoneRegex);
export const validatePassword = (password) => !password.match(passwordRegex);

export const getImageUrl = (image) => {
  if (image) {
    return `${IMAGE_BASE_URL}${image}`
  }
  return require("assets/img/no-image.png").default
}

export const getMealPlanTotal = (mealPlans) => {
  return Object.values(mealPlans).reduce((allTotal, days) => {
    const sum = days.reduce((total, meal) => {
      const price = (meal.mealObj ? meal.mealObj.price : 0);
      return total + price;
    }, 0);
    return allTotal + sum;
  }, 0);
};

export const getCartTotal = ({mealPlans = [], individualMeals = {}}) => {
  const customMealTotal = mealPlans.reduce((total, meal) => total + meal.total, 0);
  const individualMealTotal = Object.values(individualMeals).reduce((total, meal) => total + meal.price * meal.quantity, 0);
  return customMealTotal + individualMealTotal;
};

export const formatAddress = (address) =>
  [address.addressLine1, address.addressLine2, address.city, address.pincode, address.state].filter(Boolean).join(', ')

export const getPrice = (price = 0.0) => `Rs. ${parseFloat(price).toFixed(2)}`

export const getServingWeight = (weight = 0) => `${weight}g`

export const getGainDetails = (gain = 0, term) => <p className="gain-details px-1 d-flex">{gain}<b
  className="ml-1 text-uppercase">{term}</b></p>;

export const allGainDetails = (dish) =>
  <React.Fragment>
    {getGainDetails(dish.calories, 'cal')}
    {getGainDetails(dish.protein, 'p')}
    {getGainDetails(dish.carbs, 'c')}
    {getGainDetails(dish.fats, 'f')}
  </React.Fragment>

import {IMAGE_BASE_URL} from "./config";
import React from "react";

export const getImageUrl = (image) => {
  if (image) {
    return `${IMAGE_BASE_URL}${image}`
  }
  return require("assets/img/no-image.png").default
}

export const getPrice = (price = 0.0) => `$${parseFloat(price).toFixed(2)}`

export const getServingWeight = (weight = 0) => `${weight}g`

export const getGainDetails = (gain = 0, term) => <p className="px-1 d-flex">{gain}<b className="ml-1 text-uppercase">{term}</b></p>;

export const allGainDetails = (dish) =>
  <React.Fragment>
    {getGainDetails(dish.calories, 'cal')}
    {getGainDetails(dish.protein, 'p')}
    {getGainDetails(dish.carbs, 'c')}
    {getGainDetails(dish.fats, 'f')}
  </React.Fragment>

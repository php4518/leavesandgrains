export const MEALS_ENUM = {
  MEALS: 'MEALS',
  PLUS: 'PLUS',
  BREAKFAST: 'BREAKFAST',
  SNACKS: 'SNACKS',
  DRINKS: 'DRINKS'
}

export const BLOGS_ENUM = {
  NUTRITION: 'NUTRITION',
  TRAINING: 'TRAINING',
  TRANSFORMATION: 'TRANSFORMATION',
  WELLBEING: 'WELLBEING',
  WELLNESS: 'WELLNESS',
  NEWS: 'NEWS'
}

export const MEAL_TYPES = Object.values(MEALS_ENUM);
export const BLOG_TYPES = Object.values(BLOGS_ENUM);
export const PROTEIN_TYPES = ['LAMB', 'VEGAN', 'VEGETARIAN'];
export const CALORIES_TYPES = ['< 200g', '200g-400g', '> 400g'];
export const CARBS_TYPES = ['< 20g', '20g-40g', '> 40g'];
export const FAT_TYPES = ['< 20g', '20g-40g', '> 40g'];
export const SORT_TYPES = ['NEW', 'Name A-Z', 'Calories (Low to High)'];

export const CATEGOR = ['NEW', 'Name A-Z', 'Calories (Low to High)'];

export const DISH_DETAILS_TAB = ['Nutritional', 'Ingredients', 'Instructions'];
export const GENDER_TYPE = ["Male", "Female"];
export const WORKOUTS_TYPE = [
  {
    title: "1 to 3 times",
    times: 6,
  },
  {
    title: "4 or more times",
    times: 7,
  },
];
export const MEALS_PLANS = [
  {
    day: 5,
  },
  {
    day: 6,
  },
  {
    day: 7,
  },
];

export const STATUS = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  LOADING: 'LOADING'
}

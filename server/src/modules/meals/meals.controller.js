const {cloneDeep} = require('lodash');
const Dish = require('../dish/dish.model');
const {MEALS_ENUM} = require('../../utils/constants');

/**
 * Get dish data.
 * @returns {DishObject}
 */
async function getMealData(req, res, next) {
  try {
    // [{
    //   start: '15 may',
    //   end: '19 may',
    //   meals: [
    //     {
    //       date: '15 may',
    //       breakfast: {
    //         id: 'dfdsfdsf',
    //         title: 'dfdsfsdfsdfsdfdfs'
    //       },
    //     },
    //     {
    //       date: '16 may',
    //       breakfast: {
    //         id: 'dfdsfdsf',
    //         title: 'dfdsfsdfsdfsdfdfs'
    //       }
    //     }
    //   ]
    // }]
    let defaultMealStructure = [
      {
        label: 'Breakfast',
        mealType: [MEALS_ENUM.BREAKFAST],
        defaultTitle: 'Choose a Breakfast Meal',
        allowNull: true,
      },
      {
        label: 'Meal-1',
        mealType: [MEALS_ENUM.MEALS],
        defaultTitle: '',
        allowNull: false,
      },
      {
        label: 'Snack-1',
        mealType: [MEALS_ENUM.SNACKS, MEALS_ENUM.DRINKS],
        defaultTitle: 'Choose a Snack or Drink',
        allowNull: true,
      },
      {
        label: 'Meal-2',
        mealType: [MEALS_ENUM.MEALS],
        defaultTitle: '',
        allowNull: false,
      },
      {
        label: 'Snack-2',
        mealType: [MEALS_ENUM.SNACKS, MEALS_ENUM.DRINKS],
        defaultTitle: 'Choose a Snack or Drink',
        allowNull: true,
      },
      {
        label: 'Meal-3',
        mealType: [MEALS_ENUM.MEALS],
        defaultTitle: '',
        allowNull: false,
      },
      {
        label: 'Meal-4',
        mealType: [MEALS_ENUM.MEALS],
        defaultTitle: '',
        allowNull: false,
      }
    ];

    let data = {};
    for (let i = 1; i < 8; i++) {
      const mealStructure = cloneDeep(defaultMealStructure);
      for await (const meal of mealStructure) {
        const dish = await Dish.fetch([
          {$match: {category: {$in: meal.mealType}, isActive: true}},
          {$sample: {size: 1}}
        ]);
        meal.mealObj = dish[0];
      }
      data[`Day ${i}`] = mealStructure;
    }
    return res.json({...data});
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMealData
};

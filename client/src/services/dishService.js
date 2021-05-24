import axios from './index';

const getAllDishes = (params) => axios({url: '/dishes', params});
const getAllMeals = (params) => axios({url: '/meals/get-all', params});

const dishService = {
  getAllDishes,
  getAllMeals
};
export default dishService;

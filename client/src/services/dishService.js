import axios from './index';

const getAllDishes = (params) => axios({ url: '/dishes', params });

const dishService = {
  getAllDishes
};
 export default dishService;

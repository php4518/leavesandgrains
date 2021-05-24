import axios from './index';

const getAllDishes = (params) => axios({url: '/dishes', params});

const cartService = {
  getAllDishes
};
export default cartService;

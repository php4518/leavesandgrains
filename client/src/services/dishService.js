import axios from './index';

const getAllDishes = (params) => axios({ url: '/dishes', params });
const getAllMeals = (params) => axios({ url: '/meals/get-all', params });
const postNewDishes = (params) => axios.post('/dishes', params);
const updateDishes = (params) => axios.put(`/dishes/${params._id}`, params);
const deleteDishes = (id) => axios.delete(`/dishes/${id}`);
const deleteDisheImg = (id) => axios.delete(`/dishes/removeSingleImg/${id}`);

const dishService = {
  getAllDishes,
  getAllMeals,
  postNewDishes,
  updateDishes,
  deleteDishes,
  deleteDisheImg
};
export default dishService;

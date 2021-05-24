import axios from './index';

const updateUser = (id, params) => axios.put(`/users/${id}`, params);
const addAddress = (params) => axios.post('/address', params);
const getAddress = (id) => axios(`/address/owner/${id}`);
const updateAddress = (params) => axios.put(`/address/${params._id}`, params);
const deleteAddress = (id) => axios.delete(`/address/${id}`);
const getPaymentDetails = (params) => axios.post(`/users/make-payment`, params);
const placeOrder = (params) => axios.post('/order', params);
const myOrders = (id) => axios.get(`/order/${id}`);
const contactSupport = (params) => axios.post('/support', params);

const userService = {
  addAddress,
  updateAddress,
  deleteAddress,
  getAddress,
  placeOrder,
  getPaymentDetails,
  updateUser,
  myOrders,
  contactSupport
};

export default userService;

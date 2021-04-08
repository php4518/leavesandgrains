import axios from 'axios';
import { BASE_URL } from '../constants';

const instance = axios.create({
  baseURL: BASE_URL
});

instance.interceptors.request.use(request => {
  const token = localStorage.getItem('token');
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

const successHandler = (response) => {
  return response.data;
}
const errorHandler = (error) => {
  if (error.response && error.response.data && error.response.data.message === 'jwt expired') {
    localStorage.clear();
    window.location.reload();
    return;
  }
  throw error && error.response && error.response.data || error;
}
instance.interceptors.response.use(successHandler, errorHandler);

export default instance;

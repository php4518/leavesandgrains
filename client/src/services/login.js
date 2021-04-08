import Axios from './axios';

export const Register = data => {
  return Axios.post('/auth/register', data);
};



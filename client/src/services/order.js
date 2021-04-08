import Axios from './axios';

export const CreateOrder = data => {
	return Axios.post('/order', data);
};

export const GetList = () => {
	return Axios.get('/order');
};



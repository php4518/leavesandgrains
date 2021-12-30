import axios from './index';

const getAllStore = (params) => axios({ url: '/store', params });
const postStore = (params) => axios.post('/store', params);
const updateStore = (id, params) => axios.put(`/store/${id}`, params);
const deleteStore = (id) => axios.delete(`/store/${id}`);

const storeService = {
    getAllStore,
    postStore,
    updateStore,
    deleteStore,
};
export default storeService;

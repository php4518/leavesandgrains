import axios from './index';

const getFunds = (params) => axios({
  url: '/funds',
  method: 'get',
  params,
})

const homeService = {
  getFunds
};

export default homeService;

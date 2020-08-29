import { API } from './'

export const postDeposit = data => {
  return API.post('/user/investment', data, 'compound')
};

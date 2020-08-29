import { API } from './'

export const getDepth = market => {
  return API.get(`/public/markets/${market}/depth`,'peatio')
    .then(response => response.data);
};
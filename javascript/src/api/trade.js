import { API } from './';

export const getMarkets = () => {
  return API.get('/public/markets', 'peatio')
    .then(response => response.data)
};

export const getBalances = () => {
  return API.get('/account/balances', 'peatio')
    .then(response => response.data);
};

export const getTickers = (market) => {
  return API.get(`/public/markets/${market}/tickers`, 'peatio')
    .then(response => response.data);
};

export const createTrade = (ord_type, volume, side, market) => {
  return API.post('/market/orders', {
    ord_type, volume, market, side
  }, 'peatio').then(response => response.data)
};

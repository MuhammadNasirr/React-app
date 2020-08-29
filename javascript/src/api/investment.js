import { API } from './';

export const getInvestmentHistory = () => {
  return API.get(`/user/transactions?symbol=dai&limit=2&nameof=TRX_INVESTMENT`, 'compound')
    .then(response => response.data);
};

export const getWithdrawHistory = () => {
  return API.get(`/user/transactions?symbol=dai&limit=2&nameof=TRX_WITHDRAWAL`, 'compound')
    .then(response => response.data);
};
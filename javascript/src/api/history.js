import { API } from './'


export const getDepositHistory = id => {
  return API.get(`/account/deposits?currency=${id}&limit=2&page=1`, 'peatio')
    .then(response => response.data);
};

export const getWithdrawHistory = id => {
  return API.get(`/account/withdraws?currency=${id}&limit=2&page=1`, 'peatio')
    .then(response => response.data);
};

export const getWithdrawHistoryMXN = () => {
  return API.get(`/account/withdraws?limit=2&page=1`, 'fiatlogic')
    .then(response => response.data);
};

export const getDepositHistoryMXN = () => {
  return API.get(`/account/deposits?limit=2&page=1`, 'fiatlogic')
    .then(response => response.data);
};

export const getHistory = async id => {
  return await Promise.all([getDepositHistory(id), getWithdrawHistory(id)]);
};

export const getAllDeposits = (page, limit) => {
  return API.get(`/account/deposits?page=${page}&limit=${limit}`, 'peatio')
};

export const getAllWithdraws = (page, limit) => {
  return API.get(`/account/withdraws?page=${page}&limit=${limit}`, 'peatio')
};

export const getAllTrades = (page, limit) => {
  return API.get(`/market/trades?page=${page}&limit=${limit}`, 'peatio')
};

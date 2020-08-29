import { API } from './';

export const getWalletAddress = id => {
  return API.get(`/account/deposit_address/${id}`, 'peatio')
    .then(response => response.data);
};

const getBalances = () => {
  return API.get('/account/balances', 'peatio')
    .then(response => response.data);
};

const getCurrencies = () => {
  return API.get('/public/currencies', 'peatio')
    .then(response => response.data);
};

export const getMxn = () => {
  return API.get('/public/rate/dai-mxn', 'fiatlogic')
    .then(response => response.data);
};

export const getBankAccount = () => {
  return API.get('/public/bank_account', 'fiatlogic')
    .then(response => response.data);
};

export const getWalletData = async () => {
  return await Promise.all([getBalances(), getCurrencies()]);
};

const getAccounts = () => {
  return API.get('/user/accounts', 'compound')
    .then(response => response.data);
};

const getInvestment = () => {
  return API.get('/user/transactions?symbol=dai&nameof=TRX_INVESTMENT', 'compound')
    .then(response => response.data);
};

const getExchangeRate = () => {
  return API.get('/public/rate', 'compound')
    .then(response => response.data);
};


const getAnnualPercent = () => {
  return API.get('/public/apy', 'compound')
    .then(response => response.data);
};

export const getCompoundData = async () => {
  return await Promise.all([getAccounts(), getInvestment(), getExchangeRate(), getAnnualPercent()]);
};
import {
  FETCH_WALLET_DATA,
  SUCCESS_WALLET_DATA,
  FAIL_WALLET_DATA,
  FETCH_COMPOUND_DATA,
  SUCCESS_COMPOUND_DATA,
  FAIL_COMPOUND_DATA,
  SET_ACTIVE_WALLET,
  FETCH_WALLET_ADDRESS,
  FAIL_WALLET_ADDRESS,
  SUCCESS_WALLET_ADDRESS,
  FILTER_COINS,
  FETCH_MXN_CURRENCY,
  FAIL_MXN_CURRENCY,
  SUCCESS_MXN_CURRENCY
} from '../constants/actions';

export const fetchCompoundData = () => {
  return { type: FETCH_COMPOUND_DATA };
};

export const successCompoundData = data => {
  return { type: SUCCESS_COMPOUND_DATA, payload: { data } };
};

export const failCompoundData = () => {
  return { type: FAIL_COMPOUND_DATA };
};

export const fetchWalletData = () => {
  return { type: FETCH_WALLET_DATA };
};

export const successWalletData = data => {
  return { type: SUCCESS_WALLET_DATA, payload: { data } };
};

export const failWalletData = () => {
  return { type: FAIL_WALLET_DATA };
};

export const setActiveWallet = id => {
  return { type: SET_ACTIVE_WALLET, payload: { id } };
};

export const fetchWalletAddress = id => {
  return { type: FETCH_WALLET_ADDRESS, payload: { id } };
};

export const successWalletAddress = list => {
  return { type: SUCCESS_WALLET_ADDRESS, payload: { list } };
};

export const failWalletAddress = list => {
  return { type: FAIL_WALLET_ADDRESS, payload: { list } };
};

export const filterCoins = (payload) => {
  return { type: FILTER_COINS, payload };
};

export const fetchCurrencyMxn = () => {
  return { type: FETCH_MXN_CURRENCY };
};

export const successCurrencyMxn = (payload) => {
  return { type: SUCCESS_MXN_CURRENCY, payload };
};

export const failCurrencyMxn = () => {
  return { type: FAIL_MXN_CURRENCY };
};
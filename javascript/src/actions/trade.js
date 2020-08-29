import {
  TRADE_PRICE,
  TRADE_MARKET,
  TRADE_EXCHANGE,
  TRADE_AMOUNT,
  TRADE_TYPE,
  FETCH_MARKETS,
  SUCCESS_MARKETS,
  FAIL_MARKETS,
  FETCH_BALANCES,
  SUCCESS_BALANCES,
  FAIL_BALANCES,
  TRADE_BASE,
  FAIL_TICKERS,
  SUCCESS_TICKERS,
  FETCH_TICKERS,
  CREATE_ORDER,
  SUCCESS_ORDER,
  FAIL_ORDER,
  CLOSE_MODAL,
  TRADE_FEE,
  TRADE_PRECISION
} from '../constants/actions';

export const fetchMarkets = () => {
  return { type: FETCH_MARKETS };
};

export const successMarket = data => {
  return { type: SUCCESS_MARKETS, payload: { data } };
};

export const failMarket = () => {
  return { type: FAIL_MARKETS };
};

export const fetchBalances = () => {
  return { type: FETCH_BALANCES };
};

export const successBalances = data => {
  return { type: SUCCESS_BALANCES, payload: { data } };
};

export const failBalances = () => {
  return { type: FAIL_BALANCES };
};

export const fetchTickers = (market) => {
  return { type: FETCH_TICKERS, payload: { market } };
};

export const successTickers = data => {
  return { type: SUCCESS_TICKERS, payload: { data } };
};

export const failTickers = () => {
  return { type: FAIL_TICKERS };
};

export const createOrder = data => {
  return { type: CREATE_ORDER, payload: { data } };
};

export const successOrder = data => {
  return { type: SUCCESS_ORDER, payload: { data } };
};

export const failOrder = (data) => {
  return { type: FAIL_ORDER, payload: { data } };
};

export const closeModal = () => {
  return { type: CLOSE_MODAL };
};

export const marketSelection = (market) => {
  return { type: TRADE_MARKET, payload: { market } };
};

export const marketPrice = (price) => {
  return { type: TRADE_PRICE, payload: { price } };
};

export const amountInput = (amount, asks, bids) => {
  return { type: TRADE_AMOUNT, payload: { amount, asks, bids } };
};

export const exchangeInput = (exchange, asks, bids) => {
  return { type: TRADE_EXCHANGE, payload: { exchange, asks, bids } };
};

export const orderType = (type) => {
  return { type: TRADE_TYPE, payload: { type } };
};

export const setBase = (base) => {
  return { type: TRADE_BASE, payload: { base } };
};

export const setFee = (ask_fee, bid_fee) => {
  return { type: TRADE_FEE, payload: { ask_fee, bid_fee } };
};

export const setPrecision = (amount_precision, price_precision) => {
  return { type: TRADE_PRECISION, payload: { amount_precision, price_precision } };
};
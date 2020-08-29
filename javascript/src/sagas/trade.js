import { select, call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../constants/actions';
import * as actions from '../actions/trade';
import { createTrade, getMarkets, getTickers } from '../api/trade';
import { getWalletData } from '../api/wallet';
import { alertPush } from '../actions/alert'

function* createOrder(action) {
  try {
    const exchange = action.payload.data;
    const state = yield select();
    const exchangeValue = parseFloat(exchange).toFixed(state.trade.amount_precision)
    const volume = parseFloat(exchangeValue);
    const order = yield call(createTrade,
      'market',
      volume,
      state.trade.type,
      state.trade.market + state.trade.base
    );
    if (order) {
      yield put(actions.successOrder(order));
      yield put(actions.fetchBalances())                          // fetching balances after successfull order create
      yield put(alertPush({ message: ['success.order.created'], type: 'success', open: true }));
    }
  } catch (error) {
    yield put(actions.failOrder(error.message));
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* createTradeSaga() {
  yield takeEvery(types.CREATE_ORDER, createOrder);
}

export function* fetchMarkets() {
  try {
    const markets = yield call(getMarkets);
    yield put(actions.successMarket(markets));
  } catch (error) {
    yield put(actions.failMarket());
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* fetchMarketsSaga() {
  yield takeEvery(types.FETCH_MARKETS, fetchMarkets);
}

export function* fetchBalances() {
  try {
    const [balances, currencies] = yield call(getWalletData);
    const walletData = balances.reduce((prev, { currency: id, balance, locked }) => {
      const currency = currencies.find(item => id === item.id);
      if (!currency) {
        return prev;
      }
      return {
        ...prev,
        [id]: {
          ...currency,
          withdraw_fee: parseFloat(currency.withdraw_fee),
          balance: +balance,
          locked: +locked,
          address: null,
        }
      };
    }, {});
    yield put(actions.successBalances(walletData));
  } catch (error) {
    yield put(actions.failBalances());
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* fetchBalancesSaga() {
  yield takeEvery(types.FETCH_BALANCES, fetchBalances);
}

export function* fetchTickers(action) {
  try {
    const { market } = action.payload;
    const tickers = yield call(getTickers, market);
    yield put(actions.successTickers(tickers));
  } catch (error) {
    yield put(actions.failTickers());
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* fetchTickersSaga() {
  yield takeEvery(types.FETCH_TICKERS, fetchTickers);
}

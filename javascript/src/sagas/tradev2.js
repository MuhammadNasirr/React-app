import { call, put, takeEvery, select } from 'redux-saga/effects';
import {
    successOrderBook,
    failOrderBook,
    successTradeHistory,
    failTradeHistory,
    successOpenOrder,
    failOpenOrder,
    successOrderHistory,
    failOrderHistory,
    successAllTickers,
    failAllTickers,
    successCancelOrder,
    failCancelOrder,
    successLimitOrder,
    failLimitOrder,
    successKline,
    failKline,
    successDepth,
    errorDepth
} from '../actions/tradeV2';
import * as types from '../constants/actions';
import {
    getOrderBook,
    getTradeHistory,
    getOrder,
    getOrderHistory,
    getAllTickers,
    cancelOrder,
    createOrder,
    getKline
} from '../api/tradeV2';
import { getDepth } from '../api/depth';
import * as actions from '../actions/tradeV2';
import { fetchWalletData } from '../actions/wallet';
import { alertPush } from '../actions/alert'

export function* fetchOrderBook(action) {
    try {
        const market = action.payload;
        const orderBook = yield call(getOrderBook, market);
        yield put(successOrderBook(orderBook));
    }
    catch (error) {
        yield put(failOrderBook(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchOrderBookSaga() {
    yield takeEvery(types.FETCH_ORDER_BOOK, fetchOrderBook);
}


export function* fetchTradeHistory(action) {
    try {
        const market = action.payload;
        const tradeHistory = yield call(getTradeHistory, market);
        yield put(successTradeHistory(tradeHistory));
    }
    catch (error) {
        yield put(failTradeHistory(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchTradeHistorySaga() {
    yield takeEvery(types.FETCH_TRADE_HISTORY, fetchTradeHistory);
}

export function* fetchOpenOrder(action) {
    try {
        const market = action.payload;
        const openOrder = yield call(getOrder, market, 'wait');
        yield put(successOpenOrder(openOrder));
    }
    catch (error) {
        yield put(failOpenOrder(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchOpenOrderSaga() {
    yield takeEvery(types.FETCH_OPEN_ORDER, fetchOpenOrder);
}

export function* fetchOrderHistory(action) {
    try {
        const market = action.payload;
        const [cancelledOrders, completedOrders] = yield call(getOrderHistory, market);
        const orderHistory = cancelledOrders.concat(completedOrders)
        yield put(successOrderHistory(orderHistory));
    }
    catch (error) {
        yield put(failOrderHistory(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchOrderHistorySaga() {
    yield takeEvery(types.FETCH_ORDER_HISTORY, fetchOrderHistory);
}

export function* fetchAllTickers() {
    try {
        const allTickers = yield call(getAllTickers);
        yield put(successAllTickers(allTickers));
    }
    catch (error) {
        yield put(failAllTickers(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchAllTickersSaga() {
    yield takeEvery(types.FETCH_ALL_TICKERS, fetchAllTickers);
}

export function* fetchCancelOrder(action) {
    try {
        const id = action.payload;
        const order = yield call(cancelOrder, id);
        if (order) {
            yield put(successCancelOrder(order));
            const state = yield select();
            const openOrders = state.tradev2.openOrder.list;
            const index = openOrders.findIndex(obj => obj.id === id);
            const newOrders = [
                ...openOrders.slice(0, index),
                ...openOrders.slice(index + 1)
            ]
            yield put(actions.successOpenOrder(newOrders))
            yield put(alertPush({ message: ['success.order.canceled'], type: 'success', open: true }));
        }
    }
    catch (error) {
        yield put(failCancelOrder(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchCancelOrderSaga() {
    yield takeEvery(types.CANCEL_ORDER, fetchCancelOrder);
}

export function* fetchCreateOrder(action) {
    try {
        const data = action.payload;
        const { market, side, volume, price, ord_type } = data;
        const order = yield call(createOrder, market, side, volume, ord_type, price);
        if (order) {
            yield put(successLimitOrder(order));
            yield put(fetchWalletData())                          // fetching balances after successfull order create
            yield put(alertPush({ message: ['success.order.created'], type: 'success', open: true }));
        }
    }
    catch (error) {
        yield put(failLimitOrder(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchCreateOrderSaga() {
    yield takeEvery(types.CREATE_LIMIT_ORDER, fetchCreateOrder);
}

export function* fetchkline(action) {
    try {
        const market = action.payload;
        const kline = yield call(getKline, market);
        yield put(successKline(kline));
    }
    catch (error) {
        yield put(failKline(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchklineSaga() {
    yield takeEvery(types.FETCH_KLINE, fetchkline);
}

export function* fetchDepth(action) {
    try {
        const market = action.payload;
        const depth = yield call(getDepth, market);
        yield put(successDepth(depth));
    }
    catch (error) {
        yield put(errorDepth(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* fetchDepthsSaga() {
    yield takeEvery(types.FETCH_DEPTH, fetchDepth);
}
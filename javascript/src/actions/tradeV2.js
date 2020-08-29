import {
    FETCH_ORDER_BOOK,
    SUCCESS_ORDER_BOOK,
    FAIL_ORDER_BOOK,
    FETCH_TRADE_HISTORY,
    SUCCESS_TRADE_HISTORY,
    FAIL_TRADE_HISTORY,
    FETCH_OPEN_ORDER,
    SUCCESS_OPEN_ORDER,
    FAIL_OPEN_ORDER,
    FETCH_ORDER_HISTORY,
    SUCCESS_ORDER_HISTORY,
    FAIL_ORDER_HISTORY,
    FETCH_ALL_TICKERS,
    SUCCESS_ALL_TICKERS,
    FAIL_ALL_TICKERS,
    SET_MARKET,
    CANCEL_ORDER,
    SUCCESS_CANCEL_ORDER,
    FAIL_CANCEL_ORDER,
    CREATE_LIMIT_ORDER,
    SUCCESS_LIMIT_ORDER,
    FAIL_LIMIT_ORDER,
    CLOSE_MESSAGE,
    FETCH_KLINE,
    SUCCESS_KLINE,
    FAIL_KLINE,
    FETCH_DEPTH,
    SUCCESS_DEPTH,
    ERROR_DEPTH,
    CHANGE_ASK_PRICE,
    CHANGE_ASK_AMOUNT,
    CHANGE_BID_PRICE,
    CHANGE_BID_AMOUNT,
    KLINE_PUSH,
    KLINE_FETCH,
    KLINE_DATA,
    OPEN_ORDERS_UPDATE,
    ORDERS_HISTORY_RANGER_DATA
} from '../constants/actions';


export const fetchOrderBook = (payload) => {
    return { type: FETCH_ORDER_BOOK, payload };
};

export const successOrderBook = data => {
    return { type: SUCCESS_ORDER_BOOK, payload: { data } };
};

export const failOrderBook = error => {
    return { type: FAIL_ORDER_BOOK, payload: { error } };
};

export const fetchTradeHistory = (payload) => {
    return { type: FETCH_TRADE_HISTORY, payload };
};

export const successTradeHistory = data => {
    return { type: SUCCESS_TRADE_HISTORY, payload: { data } };
};

export const failTradeHistory = (error) => {
    return { type: FAIL_TRADE_HISTORY, payload: { error } };
};

export const fetchOpenOrder = (payload) => {
    return { type: FETCH_OPEN_ORDER, payload };
};

export const successOpenOrder = data => {
    return { type: SUCCESS_OPEN_ORDER, payload: { data } };
};

export const failOpenOrder = (error) => {
    return { type: FAIL_OPEN_ORDER, payload: { error } };
};

export const userOpenOrdersUpdate = (payload) => ({
    type: OPEN_ORDERS_UPDATE,
    payload,
});

export const fetchOrderHistory = (payload) => {
    return { type: FETCH_ORDER_HISTORY, payload };
};

export const successOrderHistory = data => {
    return { type: SUCCESS_ORDER_HISTORY, payload: { data } };
};

export const failOrderHistory = (error) => {
    return { type: FAIL_ORDER_HISTORY, payload: { error } };
};

export const userOrdersHistoryRangerData = (payload) => ({
    type: ORDERS_HISTORY_RANGER_DATA,
    payload,
});

export const fetchAllTickers = () => {
    return { type: FETCH_ALL_TICKERS };
};

export const successAllTickers = data => {
    return { type: SUCCESS_ALL_TICKERS, payload: { data } };
};

export const failAllTickers = (error) => {
    return { type: FAIL_ALL_TICKERS, payload: { error } };
};

export const setMarket = (payload) => {
    return { type: SET_MARKET, payload };
};

export const cancelOrder = (payload) => {
    return { type: CANCEL_ORDER, payload };
};

export const successCancelOrder = data => {
    return { type: SUCCESS_CANCEL_ORDER, payload: { data } };
};

export const failCancelOrder = (error) => {
    return { type: FAIL_CANCEL_ORDER, payload: { error } };
};

export const createLimitOrder = (payload) => {
    return { type: CREATE_LIMIT_ORDER, payload };
};

export const successLimitOrder = data => {
    return { type: SUCCESS_LIMIT_ORDER, payload: { data } };
};

export const failLimitOrder = error => {
    return { type: FAIL_LIMIT_ORDER, payload: { error } };
};

export const closeSnackbar = () => {
    return { type: CLOSE_MESSAGE };
}

export const fetchKline = (payload) => {
    return { type: FETCH_KLINE, payload };
};

export const successKline = data => {
    return { type: SUCCESS_KLINE, payload: { data } };
};

export const failKline = () => {
    return { type: FAIL_KLINE };
};

export const klinePush = (payload) => ({
    type: KLINE_PUSH,
    payload,
});
export const klineFetch = (payload) => ({
    type: KLINE_FETCH,
    payload,
});
export const klineData = (payload) => ({
    type: KLINE_DATA,
    payload,
});

export const fetchDepth = (payload) => ({
    type: FETCH_DEPTH,
    payload,
});
export const successDepth = (data) => ({
    type: SUCCESS_DEPTH,
    payload: { data },
});
export const errorDepth = (error) => ({
    type: ERROR_DEPTH,
    error,
});

export const changeAskPrice = (payload) => ({
    type: CHANGE_ASK_PRICE,
    payload
});

export const changeAskAmount = (payload) => ({
    type: CHANGE_ASK_AMOUNT,
    payload
});

export const changeBidPrice = (payload) => ({
    type: CHANGE_BID_PRICE,
    payload
});

export const changeBidAmount = (payload) => ({
    type: CHANGE_BID_AMOUNT,
    payload
})
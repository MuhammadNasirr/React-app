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
    FETCH_DEPTH,
    SUCCESS_DEPTH,
    ERROR_DEPTH,
    CHANGE_ASK_AMOUNT,
    CHANGE_BID_PRICE,
    CHANGE_BID_AMOUNT,
    CHANGE_ASK_PRICE,
    OPEN_ORDERS_UPDATE,
    ORDERS_HISTORY_RANGER_DATA
} from '../constants/actions';
import { insertOrUpdate, convertOrderEvent, insertOrUpdateHistory } from '../utils/orderUpdate'

const initState = {
    open: false,
    variant: '',
    message: '',
    market: '',
    orderBook: { data: [], loading: false, error: false },
    depth: { data: [], loading: false, error: false },
    tradeHistory: { list: [], loading: false, error: false },
    openOrder: { list: [], loading: false, error: false },
    orderHistory: { list: [], loading: false, error: false },
    allTickers: { list: {}, loading: false, error: false },
    cancelOrder: { data: {}, loading: false, error: false, open: false, message: '', variant: '' },
    order: {
        data: {},
        askPrice: '',
        askAmount: '',
        bidPrice: '',
        bidAmount: '',
        loading: false,
        error: false
    },
}

function tradeV2Reducer(state = initState, action) {
    switch (action.type) {

        case FETCH_DEPTH: {
            return { ...state, depth: { data: [], loading: true } };
        }
        case SUCCESS_DEPTH: {
            return { ...state, depth: { data: action.payload.data, loading: false, error: false } };
        }
        case ERROR_DEPTH: {
            return { ...state, depth: { data: [], loading: false, error: action.payload.error } };
        }

        case FETCH_ORDER_BOOK: {
            return { ...state, orderBook: { data: [], loading: true } };
        }
        case SUCCESS_ORDER_BOOK: {
            return { ...state, orderBook: { data: action.payload.data, loading: false, error: false } };
        }
        case FAIL_ORDER_BOOK: {
            return { ...state, orderBook: { data: [], loading: false, error: action.payload.error } };
        }

        case FETCH_TRADE_HISTORY: {
            return { ...state, tradeHistory: { list: [], loading: true } };
        }
        case SUCCESS_TRADE_HISTORY: {
            return { ...state, tradeHistory: { list: action.payload.data, loading: false, error: false } };
        }
        case FAIL_TRADE_HISTORY: {
            return { ...state, tradeHistory: { list: [], loading: false, error: action.payload.error } };
        }

        case FETCH_OPEN_ORDER: {
            return { ...state, openOrder: { list: [], loading: true } };
        }
        case SUCCESS_OPEN_ORDER: {
            return { ...state, openOrder: { list: action.payload.data, loading: false, error: false } };
        }
        case FAIL_OPEN_ORDER: {
            return { ...state, openOrder: { list: [], loading: false, error: action.payload.error } };
        }
        case OPEN_ORDERS_UPDATE:
            return { ...state, openOrder: { list: insertOrUpdate(state.openOrder.list, convertOrderEvent(action.payload)), loading: false, error: false } };

        case FETCH_ORDER_HISTORY: {
            return { ...state, orderHistory: { list: [], loading: true } };
        }
        case SUCCESS_ORDER_HISTORY: {
            return { ...state, orderHistory: { list: action.payload.data, loading: false, error: false } };
        }
        case FAIL_ORDER_HISTORY: {
            return { ...state, orderHistory: { list: [], loading: false, error: action.payload.error } };
        }
        case ORDERS_HISTORY_RANGER_DATA:
            return { ...state, orderHistory: { list: insertOrUpdateHistory(state.orderHistory.list, convertOrderEvent(action.payload)), loading: false, error: false } };

        case FETCH_ALL_TICKERS: {
            return { ...state, allTickers: { list: {}, loading: true } };
        }
        case SUCCESS_ALL_TICKERS: {
            return { ...state, allTickers: { list: action.payload.data, loading: false, error: false } };
        }
        case FAIL_ALL_TICKERS: {
            return { ...state, allTickers: { list: {}, loading: false, error: action.payload.error } };
        }

        case SET_MARKET: {
            return { ...state, market: action.payload };
        }

        case CANCEL_ORDER: {
            return { ...state, cancelOrder: { data: {}, loading: true } };
        }
        case SUCCESS_CANCEL_ORDER: {
            return { ...state, cancelOrder: { data: action.payload.data, loading: false, error: false, open: true, message: 'Order has been cancelled', variant: 'success' } };
        }
        case FAIL_CANCEL_ORDER: {
            return { ...state, cancelOrder: { data: {}, loading: false, error: action.payload.error, open: true, message: action.payload.error, variant: 'error' } };
        }

        case CREATE_LIMIT_ORDER: {
            return { ...state, order: { data: {}, loading: true } };
        }
        case SUCCESS_LIMIT_ORDER: {
            return {
                ...state,
                order: {
                    data: action.payload.data,
                    loading: false,
                    error: false,
                    askPrice: '',
                    askAmount: '',
                    bidPrice: '',
                    bidAmount: '',
                },
                open: true,
                variant: 'success',
                message: 'Your order has been processed'
            };
        }
        case FAIL_LIMIT_ORDER: {
            return {
                ...state,
                order: {
                    data: {},
                    loading: false,
                    error: action.payload.error,
                    askPrice: action.payload.error === 'market.order.invalid_volume_or_price' ? state.order.askPrice : "",
                    askAmount: action.payload.error === 'market.order.invalid_volume_or_price' ? state.order.askAmount : "",
                    bidPrice: action.payload.error === 'market.order.invalid_volume_or_price' ? state.order.bidPrice : "",
                    bidAmount: action.payload.error === 'market.order.invalid_volume_or_price' ? state.order.bidAmount : "",
                },
                open: true,
                variant: 'error',
                message: ''
            };
        }

        case CLOSE_MESSAGE: {
            return {
                ...state,
                open: false,
                cancelOrder: {
                    ...state.cancelOrder,
                    open: false
                }
            };
        }

        case CHANGE_ASK_PRICE: {
            return { ...state, order: { ...state.order, askPrice: action.payload } }
        }

        case CHANGE_ASK_AMOUNT: {
            return { ...state, order: { ...state.order, askAmount: action.payload } };
        }

        case CHANGE_BID_PRICE: {
            return { ...state, order: { ...state.order, bidPrice: action.payload } };
        }

        case CHANGE_BID_AMOUNT: {
            return { ...state, order: { ...state.order, bidAmount: action.payload } };
        }

        default:
            return state;
    }
}

export default tradeV2Reducer;

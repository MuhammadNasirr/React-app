export const FETCH_USER = 'user/FETCH_USER';
export const SUCCESS_USER = 'user/SUCCESS_USER';
export const FAIL_USER = 'user/FAIL_USER';
export const RESET_USER = 'user/RESET_USER';
export const SET_MODAL = 'user/SET_MODAL';
export const SET_CONFIRM_MODAL = 'user/SET_CONFIRM_MODAL';
export const SET_OTP = 'user/SET_OTP';

export const SEND_DOCUMENTS_DATA = 'documents/SEND_DOCUMENTS_DATA';
export const SEND_DOCUMENTS_ERROR = 'documents/SEND_DOCUMENTS_ERROR';
export const SEND_DOCUMENTS_FETCH = 'documents/SEND_DOCUMENTS_FETCH';

export const FETCH_COMPOUND_DATA = 'wallet/FETCH_COMPOUND_DATA';
export const SUCCESS_COMPOUND_DATA = 'wallet/SUCCESS_COMPOUND_DATA';
export const FAIL_COMPOUND_DATA = 'wallet/FAIL_COMPOUND_DATA';
export const FETCH_WALLET_DATA = 'wallet/FETCH_WALLET_DATA';
export const SUCCESS_WALLET_DATA = 'wallet/SUCCESS_WALLET_DATA';
export const FAIL_WALLET_DATA = 'wallet/FAIL_WALLET_DATA';
export const SET_ACTIVE_WALLET = 'wallet/SET_ACTIVE_WALLET';
export const FETCH_WALLET_ADDRESS = 'wallet/FETCH_WALLET_ADDRESS';
export const SUCCESS_WALLET_ADDRESS = 'wallet/SUCCESS_WALLET_ADDRESS';
export const FAIL_WALLET_ADDRESS = 'wallet/FAIL_WALLET_ADDRESS';
export const FILTER_COINS = 'trade/FILTER_COINS';
export const FETCH_MXN_CURRENCY = 'wallet/FETCH_MXN_CURRENCY';
export const FAIL_MXN_CURRENCY = 'wallet/FAIL_MXN_CURRENCY';
export const SUCCESS_MXN_CURRENCY = 'wallet/SUCCESS_MXN_CURRENCY';

export const FETCH_HISTORY = 'history/FETCH_HISTORY';
export const SUCCESS_HISTORY = 'history/SUCCESS_HISTORY';
export const FAIL_HISTORY = 'history/FAIL_HISTORY';
export const FETCH_HISTORY_MXN = 'history/FETCH_HISTORY_MXN';
export const SUCCESS_HISTORY_MXN = 'history/SUCCESS_HISTORY_MXN';
export const FAIL_HISTORY_MXN = 'history/FAIL_HISTORY_MXN';

export const FETCH_INVESTMENT = 'investment/FETCH_INVESTMENT';
export const SUCCESS_INVESTMENT = 'investment/SUCCESS_INVESTMENT';
export const FAIL_INVESTMENT = 'investment/FAIL_INVESTMENT';

export const FETCH_SUBMIT_WITHDRAW = 'withdraw/FETCH_SUBMIT_WITHDRAW';
export const SUCCESS_SUBMIT_WITHDRAW = 'withdraw/SUCCESS_SUBMIT_WITHDRAW';
export const FAIL_SUBMIT_WITHDRAW = 'withdraw/FAIL_SUBMIT_WITHDRAW';
export const FETCH_SUBMIT_DEPOSIT = 'withdraw/FETCH_SUBMIT_DEPOSIT';
export const SUCCESS_SUBMIT_DEPOSIT = 'withdraw/SUCCESS_SUBMIT_DEPOSIT';
export const FAIL_SUBMIT_DEPOSIT = 'withdraw/FAIL_SUBMIT_DEPOSIT';
export const HANDLE_CHANGE_WITHDRAW = 'withdraw/HANDLE_CHANGE_WITHDRAW';
export const CLEAR_WITHDRAW_FORM = 'withdraw/CLEAR_WITHDRAW_FORM';
export const CLOSE_SNACKBAR = 'withdraw/CLOSE_SNACKBAR';

export const FETCH_SUBMIT_DEPOSIT_COMPOUND = 'deposit/FETCH_SUBMIT_DEPOSIT_COMPOUND';
export const CLEAR_DEPOSIT_MODAL_STATE = 'deposit/CLEAR_DEPOSIT_MODAL_STATE';
export const CLEAR_DEPOSIT_FORM = 'deposit/CLEAR_DEPOSIT_FORM';
export const HANDLE_CHANGE_DEPOSIT = 'deposit/HANDLE_CHANGE_DEPOSIT';
export const FETCH_ACCOUNT = 'deposit/FETCH_ACCOUNT';

export const FETCH_LOGOUT = 'auth/FETCH_LOGOUT';
export const FAIL_LOGOUT = 'auth/FAIL_LOGOUT';
export const FETCH_LOGIN = 'auth/FETCH_LOGIN';
export const FAIL_LOGIN = 'auth/FAIL_LOGIN';
export const RESET_ERROR = 'auth/RESET_ERROR';

export const FETCH_MARKETS = 'trade/FETCH_MARKETS';
export const SUCCESS_MARKETS = 'trade/SUCCESS_MARKETS';
export const FAIL_MARKETS = 'trade/FAIL_MARKETS';
export const FETCH_BALANCES = 'trade/FETCH_BALANCES';
export const SUCCESS_BALANCES = 'trade/SUCCESS_BALANCES';
export const FAIL_BALANCES = 'trade/FAIL_BALANCES';
export const FETCH_TICKERS = 'trade/FETCH_TICKERS';
export const SUCCESS_TICKERS = 'trade/SUCCESS_TICKERS';
export const FAIL_TICKERS = 'trade/FAIL_TICKERS';
export const CREATE_ORDER = 'trade/CREATE_ORDER';
export const SUCCESS_ORDER = 'trade/SUCCESS_ORDER';
export const FAIL_ORDER = 'trade/FAIL_ORDER';
export const CLOSE_MODAL = 'trade/CLOSE_MODAL';
export const TRADE_EXCHANGE = 'trade/TRADE_EXCHANGE';
export const TRADE_AMOUNT = 'trade/TRADE_AMOUNT';
export const TRADE_MARKET = 'trade/TRADE_MARKET';
export const TRADE_PRICE = 'trade/TRADE_PRICE';
export const TRADE_TYPE = 'trade/TRADE_TYPE';
export const TRADE_BASE = 'trade/TRADE_BASE';
export const TRADE_FEE = 'trade/TRADE_FEE';
export const TRADE_PRECISION = 'trade/TRADE_PRECISION';

export const DEPTH_FETCH = 'depth/FETCH';
export const DEPTH_DATA = 'depth/DATA';
export const DEPTH_ERROR = 'depth/ERROR';

export const FETCH_ORDER_BOOK = 'orderBook/FETCH_ORDER_BOOK';
export const SUCCESS_ORDER_BOOK = 'orderBook/SUCCESS_ORDER_BOOK';
export const FAIL_ORDER_BOOK = 'orderBook/FAIL_ORDER_BOOK';

export const FETCH_DEPTH = 'depth/FETCH_DEPTH';
export const SUCCESS_DEPTH = 'depth/SUCCESS_DEPTH';
export const ERROR_DEPTH = 'depth/ERROR_DEPTH';

export const FETCH_TRADE_HISTORY = 'tradeHistory/FETCH_TRADE_HISTORY';
export const SUCCESS_TRADE_HISTORY = 'tradeHistory/SUCCESS_TRADE_HISTORY';
export const FAIL_TRADE_HISTORY = 'tradeVtradeHistory/FAIL_TRADE_HISTORY';

export const FETCH_OPEN_ORDER = 'openOrder/FETCH_OPEN_ORDER';
export const SUCCESS_OPEN_ORDER = 'openOrder/SUCCESS_OPEN_ORDER';
export const FAIL_OPEN_ORDER = 'openOrder/FAIL_OPEN_ORDER';
export const OPEN_ORDERS_UPDATE = 'openOrder/UPDATE';

export const FETCH_ORDER_HISTORY = 'orderHistory/FETCH_ORDER_HISTORY';
export const SUCCESS_ORDER_HISTORY = 'orderHistory/SUCCESS_ORDER_HISTORY';
export const FAIL_ORDER_HISTORY = 'orderHistory/FAIL_ORDER_HISTORY';
export const ORDERS_HISTORY_RANGER_DATA = 'orderHistory/RANGER_DATA';

export const FETCH_ALL_TICKERS = 'tradeV2/FETCH_ALL_TICKERS';
export const SUCCESS_ALL_TICKERS = 'tradeV2/SUCCESS_ALL_TICKERS';
export const FAIL_ALL_TICKERS = 'tradeV2/FAIL_ALL_TICKERS';

export const SET_MARKET = 'tradeV2/SET_MARKET';

export const CANCEL_ORDER = 'tradeV2/CANCEL_ORDER';
export const SUCCESS_CANCEL_ORDER = 'tradeV2/SUCCESS_CANCEL_ORDER';
export const FAIL_CANCEL_ORDER = 'tradeV2/FAIL_CANCEL_ORDER';

export const CREATE_LIMIT_ORDER = 'tradeV2/CREATE_LIMIT_ORDER';
export const SUCCESS_LIMIT_ORDER = 'tradeV2/SUCCESS_LIMIT_ORDER';
export const FAIL_LIMIT_ORDER = 'tradeV2/FAIL_LIMIT_ORDER';

export const CLOSE_MESSAGE = 'tradeV2/CLOSE_MESSAGE';

export const FETCH_KLINE = 'tradeV2/FETCH_KLINE';
export const SUCCESS_KLINE = 'tradeV2/SUCCESS_KLINE';
export const FAIL_KLINE = 'tradeV2/FAIL_KLINE';

export const KLINE_PUSH = 'kline/PUSH';
export const KLINE_FETCH = 'kline/KLINE_FETCH';
export const KLINE_DATA = 'kline/KLINE_DATA';

export const RANGER_CONNECT_FETCH = 'ranger/CONNECT_FETCH';
export const RANGER_CONNECT_DATA = 'ranger/CONNECT_DATA';
export const RANGER_CONNECT_ERROR = 'ranger/CONNECT_ERROR';
export const RANGER_DISCONNECT_FETCH = 'ranger/DISCONNECT_FETCH';
export const RANGER_DISCONNECT_DATA = 'ranger/DISCONNECT_DATA';
export const RANGER_DIRECT_WRITE = 'ranger/DIRECT_WRITE';
export const RANGER_SUBSCRIPTIONS_DATA = 'ranger/SUBSCRIPTIONS_DATA';
export const RANGER_USER_ORDER_UPDATE = 'ranger/USER_ORDER_UPDATE';

export const CHANGE_ASK_PRICE = 'tradev2/CHANGE_ASK_PRICE';
export const CHANGE_ASK_AMOUNT = 'tradev2/CHANGE_ASK_AMOUNT';

export const CHANGE_BID_PRICE = 'tradev2/CHANGE_BID_PRICE';
export const CHANGE_BID_AMOUNT = 'tradev2/CHANGE_BID_VOLUME'

export const CHANGE_LANGUAGE = 'i18n/CHANGE_LANGUAGE';

export const ALERT_DELETE = 'alert/ALERT_DELETE';
export const ALERT_DATA = 'alert/ALERT_DATA';
export const ALERT_PUSH = 'alert/ALERT_PUSH';
export const ALERT_DELETE_BY_INDEX = 'alert/ALERT_DELETE_BY_INDEX';

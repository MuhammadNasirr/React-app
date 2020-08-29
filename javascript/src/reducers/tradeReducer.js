import { TRADE_MARKET, TRADE_PRICE, TRADE_TYPE, FETCH_MARKETS, SUCCESS_MARKETS, FAIL_MARKETS, TRADE_BASE, FETCH_BALANCES, SUCCESS_BALANCES, FAIL_BALANCES, FETCH_TICKERS, SUCCESS_TICKERS, FAIL_TICKERS, CREATE_ORDER, SUCCESS_ORDER, FAIL_ORDER, CLOSE_MODAL, TRADE_FEE, TRADE_PRECISION } from '../constants/actions';

const initState = {
  open: false,
  confirmation: false,
  market: '',
  price: 0,
  exchange: 0,
  type: 'buy',
  amount: 0,
  base: '',
  isFetching: true,
  markets: [],
  balances: [],
  tickers: {},
  order: {},
  order_err: '',
  ask_fee: 0,
  bid_fee: 0,
  amount_precision: 0,
  price_precision: 0,
  error: false
}

function tradeReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_MARKETS: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_MARKETS: {
      var base_unit = action.payload.data[0].base_unit;
      var quote_unit = action.payload.data[0].quote_unit;
      var id = base_unit + quote_unit;
      var amount_precision = action.payload.data.filter(x => x.id === id)[0].amount_precision;   // Setting ask precision
      var price_precision = action.payload.data.filter(x => x.id === id)[0].price_precision;   // Setting ask precision
      return {
        ...state,
        isFetching: false,
        markets: action.payload.data,
        market: base_unit,
        base: quote_unit,
        amount_precision: amount_precision,
        price_precision: price_precision
      };
    }
    case FAIL_MARKETS: {
      return { ...state, isFetching: false, error: true };
    }
    case FETCH_BALANCES: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_BALANCES: {
      return { ...state, isFetching: false, balances: action.payload.data };
    }
    case FAIL_BALANCES: {
      return { ...state, isFetching: false, error: true };
    }
    case FETCH_TICKERS: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_TICKERS: {
      var price = parseFloat(action.payload.data.ticker.last);
      return { ...state, isFetching: false, tickers: action.payload.data, price: price };
    }
    case FAIL_TICKERS: {
      return { ...state, isFetching: false, error: true };
    }
    case CREATE_ORDER: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_ORDER: {
      return { ...state, isFetching: false, order: action.payload.data, confirmation: true, open: true };
    }
    case FAIL_ORDER: {
      return { ...state, isFetching: false, error: true, confirmation: false, order_err: action.payload.data, open: true };
    }
    case CLOSE_MODAL: {
      return { ...state, open: false };
    }
    // case TRADE_EXCHANGE: {
    //   const { asks, bids, exchange } = action.payload
    //   const proposals = state.type === 'buy' ? asks : bids;
    //   const totalPrice = convertExponentialToDecimal(getTotalPrice(exchange, proposals));
    //   const safePrice = (totalPrice / exchange) || 0;
    //   return { ...state, exchange, amount: totalPrice && totalPrice.toFixed(8), price: safePrice }

    // }
    // case TRADE_AMOUNT: {
    //   const { asks, bids, amount } = action.payload
    //   const proposals = state.type === 'buy' ? asks : bids;
    //   const totalAmount = convertExponentialToDecimal(getInversedTotalPrice(amount, proposals));
    //   return { ...state, amount, exchange: totalAmount && totalAmount.toFixed(8) };
    // }
    case TRADE_MARKET: {
      return { ...state, market: action.payload.market };
    }
    case TRADE_PRICE: {
      return { ...state, price: parseFloat(action.payload.price) };
    }
    case TRADE_TYPE: {
      return { ...state, type: action.payload.type };
    }
    case TRADE_BASE: {
      return { ...state, base: action.payload.base };
    }
    case TRADE_FEE: {
      return { ...state, ask_fee: action.payload.ask_fee, bid_fee: action.payload.bid_fee };
    }
    case TRADE_PRECISION: {
      return { ...state, amount_precision: action.payload.amount_precision, price_precision: action.payload.price_precision };
    }
    default:
      return state;
  }
}

export default tradeReducer;

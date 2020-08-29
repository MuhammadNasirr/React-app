import queryString from 'query-string';

import {
  FETCH_COMPOUND_DATA,
  SUCCESS_COMPOUND_DATA,
  FAIL_COMPOUND_DATA,
  FETCH_WALLET_DATA,
  SUCCESS_WALLET_DATA,
  FAIL_WALLET_DATA,
  SET_ACTIVE_WALLET,
  SUCCESS_WALLET_ADDRESS,
  FAIL_WALLET_ADDRESS,
  FILTER_COINS,
  FETCH_MXN_CURRENCY,
  FAIL_MXN_CURRENCY,
  SUCCESS_MXN_CURRENCY
} from '../constants/actions';

const initState = {
  list: {},
  activeWallet: null,
  isFetching: false,
  isCompoundFetching: true,
  error: false,
  compoundError: false,
  compoundDone: false,
  coins: {},
  mxn: null
};

function walletReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_COMPOUND_DATA: {
      return { ...state, isCompoundFetching: true };
    }
    case SUCCESS_COMPOUND_DATA: {
      return { ...state, isCompoundFetching: false, compoundDone: true, list: action.payload.data, coins: action.payload.data };
    }
    case FAIL_COMPOUND_DATA: {
      return { ...state, isCompoundFetching: false, compoundError: true, compoundDone: false };
    }
    case FETCH_WALLET_DATA: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_WALLET_DATA: {
      return { ...state, isFetching: false, list: action.payload.data, coins: action.payload.data };
    }
    case FAIL_WALLET_DATA: {
      return { ...state, isFetching: false, error: true };
    }
    case SET_ACTIVE_WALLET: {
      return { ...state, activeWallet: action.payload.id };
    }
    case SUCCESS_WALLET_ADDRESS: {
      return { ...state, list: action.payload.list };
    }
    case FAIL_WALLET_ADDRESS: {
      return { ...state, list: action.payload.list };
    }
    case FETCH_MXN_CURRENCY: {
      return { ...state, isFetching: true  };
    }
    case SUCCESS_MXN_CURRENCY: {
      return { ...state, mxn: action.payload };
    }
    case FAIL_MXN_CURRENCY: {
      return { ...state, isFetching: false, error: true };
    }
    case FILTER_COINS: {
      Object.filter = function (obj, predicate) {
        var result = {}, key;
        for (key in obj) {
          if (obj.hasOwnProperty(key) && predicate(obj[key])) {
            result[key] = obj[key];
          }
        }
        return result;
      };
      var regex = new RegExp(action.payload, "gi");
      var filtered = action.payload ? Object.filter(state.list, coin => coin.id.match(regex) || coin.name.match(regex)) : state.list;
      return { ...state, coins: filtered };
    }
    case '@@router/LOCATION_CHANGE': {
      return {
        ...state,
        activeWallet: queryString.parse(action.payload.location.search).currency
      };
    }
    default: {
      return state;
    }
  }
}

export default walletReducer;

import {
  FETCH_INVESTMENT,
  SUCCESS_INVESTMENT,
  FAIL_INVESTMENT,
} from '../constants/actions';

const initState = {
  isFetching: false,
  deposits: [],
  withdraws: [],
  error: false,
};

function historyReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_INVESTMENT: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_INVESTMENT: {
      return { ...state, [action.payload.type]: action.payload.history, isFetching: false };
    }
    case FAIL_INVESTMENT: {
      return { ...state, [action.payload.type]: [], isFetching: false };
    }
    default: {
      return state;
    }
  }
}

export default historyReducer;

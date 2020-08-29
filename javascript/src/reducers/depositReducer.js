import {
  FETCH_SUBMIT_DEPOSIT,
  SUCCESS_SUBMIT_DEPOSIT,
  FAIL_SUBMIT_DEPOSIT,
  CLEAR_DEPOSIT_FORM,
  HANDLE_CHANGE_DEPOSIT,
  CLEAR_DEPOSIT_MODAL_STATE
} from '../constants/actions';

const initState = {
  loading: false,
  amount: '',
  depositDone: false
};

function depositReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_SUBMIT_DEPOSIT: {
      return { ...state, loading: true };
    }
    case SUCCESS_SUBMIT_DEPOSIT: {
      return { ...state, loading: false, error: '', variant: 'success' };
    }
    case FAIL_SUBMIT_DEPOSIT: {
      return { ...state, loading: false, error: action.payload.error, variant: 'error' };
    }
    case CLEAR_DEPOSIT_MODAL_STATE: {
      return { ...state, depositDone: false };
    }
    case CLEAR_DEPOSIT_FORM: {
      return { ...state, amount: '', depositDone: true };
    }
    case HANDLE_CHANGE_DEPOSIT: {
      return { ...state, [action.payload.field]: action.payload.value };
    }
    default: {
      return state;
    }
  }
}

export default depositReducer;

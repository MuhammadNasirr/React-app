import {
  FETCH_SUBMIT_WITHDRAW,
  SUCCESS_SUBMIT_WITHDRAW,
  FAIL_SUBMIT_WITHDRAW,
  FETCH_SUBMIT_DEPOSIT,
  SUCCESS_SUBMIT_DEPOSIT,
  FAIL_SUBMIT_DEPOSIT,
  HANDLE_CHANGE_WITHDRAW,
  CLEAR_WITHDRAW_FORM,
  CLOSE_SNACKBAR,
} from '../constants/actions';

const initState = {
  isFetching: false,
  rid: '',
  amount: '',
  amountMXN: '',
  otp: '',
  error: '',
  open: false,
  variant: ''
};

function withdrawReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_SUBMIT_WITHDRAW: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_SUBMIT_WITHDRAW: {
      return { ...state, isFetching: false, error: '', open: true, variant: 'success' };
    }
    case FAIL_SUBMIT_WITHDRAW: {
      return { ...state, isFetching: false, error: action.payload.error, open: true, variant: 'error' };
    }
    case FETCH_SUBMIT_DEPOSIT: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_SUBMIT_DEPOSIT: {
      return { ...state, isFetching: false, error: '', open: true, variant: 'success' };
    }
    case FAIL_SUBMIT_DEPOSIT: {
      return { ...state, isFetching: false, error: action.payload.error, open: true, variant: 'error' };
    }
    case HANDLE_CHANGE_WITHDRAW: {
      return { ...state, [action.payload.field]: action.payload.value };
    }
    case CLEAR_WITHDRAW_FORM: {
      return { ...state, rid: '', amount: '', otp: '', amountMXN: '' };
    }
    case CLOSE_SNACKBAR: {
      return { ...state, open: false, error: '' };
    }
    default: {
      return state;
    }
  }
}

export default withdrawReducer;

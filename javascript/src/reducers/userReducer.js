import { FETCH_USER, SUCCESS_USER, FAIL_USER, RESET_USER, SET_MODAL, SET_CONFIRM_MODAL, SET_OTP } from '../constants/actions';

const initState = {
  data: {
    created_at: '',
    email: '',
    id: 0,
    level: 0,
    otp: false,
    role: '',
    state: '',
    uid: '',
    updated_at: '',
  },
  open: false,
  openConfirm: false,
  isFetching: true,
  error: false
};

function userReducer(state = initState, action) {
  switch (action.type) {
    case FETCH_USER: {
      return { ...state, isFetching: true };
    }
    case SUCCESS_USER: {
      return { ...state, isFetching: false, data: action.payload.data };
    }
    case FAIL_USER: {
      return { ...state, isFetching: false, error: true };
    }
    case RESET_USER: {
      return { ...state, data: initState.data };
    }
    case SET_MODAL: {
      return { ...state, open: action.payload.data };
    }
    case SET_CONFIRM_MODAL: {
      return { ...state, openConfirm: action.payload.data };
    }
    case SET_OTP: {
      return { ...state, data: { ...state.data, otp: action.payload.data } };
    }
    default:
      return state;
  }
}

export default userReducer;

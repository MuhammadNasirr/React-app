import {
  FETCH_LOGOUT,
  FAIL_LOGOUT,
  FETCH_LOGIN,
  FAIL_LOGIN,
  RESET_ERROR,
} from '../constants/actions';


export const fetchLogout = () => {
  return { type: FETCH_LOGOUT };
};

export const failLogout = message => {
  return { type: FAIL_LOGOUT, payload: { message } };
};

export const fetchLogin = (email, password, otp_code) => {
  return { type: FETCH_LOGIN, payload: { email, password, otp_code } };
};

export const failLogin = message => {
  return { type: FAIL_LOGIN, payload: { message } };
};

export const reset = value => {
  return { type: RESET_ERROR, payload: { value } };
};

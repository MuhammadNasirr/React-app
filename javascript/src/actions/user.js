import { FETCH_USER, SUCCESS_USER, FAIL_USER, RESET_USER, SET_MODAL, SET_CONFIRM_MODAL, SET_OTP } from '../constants/actions';

export const fetchUser = () => {
  return { type: FETCH_USER };
};

export const successUser = data => {
  return { type: SUCCESS_USER, payload: { data } };
};

export const failUser = () => {
  return { type: FAIL_USER };
};

export const setModal = (data) => {
  return { type: SET_MODAL, payload: { data } };
};

export const setConfirmModal = (data) => {
  return { type: SET_CONFIRM_MODAL, payload: { data } };
};

export const resetUser = () => {
  return { type: RESET_USER };
};

export const setOtp = (data) => {
  return { type: SET_OTP, payload: { data } };
};


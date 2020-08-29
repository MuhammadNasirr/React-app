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

export const fetchSubmitWithdraw = () => {
  return { type: FETCH_SUBMIT_WITHDRAW };
};

export const successSubmitWithdraw = () => {
  return { type: SUCCESS_SUBMIT_WITHDRAW };
};

export const failSubmitWithdraw = error => {
  return { type: FAIL_SUBMIT_WITHDRAW, payload: { error } };
};

export const fetchSubmitDeposit = () => {
  return { type: FETCH_SUBMIT_DEPOSIT };
};

export const successSubmitDeposit = () => {
  return { type: SUCCESS_SUBMIT_DEPOSIT };
};

export const failSubmitDeposit = error => {
  return { type: FAIL_SUBMIT_DEPOSIT, payload: { error } };
};

export const handleChangeWithdraw = (field, value) => {
  return { type: HANDLE_CHANGE_WITHDRAW, payload: { field, value } };
};

export const clearWithdrawForm = () => {
  return { type: CLEAR_WITHDRAW_FORM };
};

export const closeSnackbar = () => {
  return { type: CLOSE_SNACKBAR };
};

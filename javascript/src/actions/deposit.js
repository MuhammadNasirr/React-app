import {
  FETCH_SUBMIT_DEPOSIT,
  SUCCESS_SUBMIT_DEPOSIT,
  FAIL_SUBMIT_DEPOSIT,
  HANDLE_CHANGE_DEPOSIT,
  CLEAR_DEPOSIT_FORM,
  CLEAR_DEPOSIT_MODAL_STATE,
  FETCH_ACCOUNT
} from '../constants/actions';

export const fetchSubmitDeposit = () => {
  return { type: FETCH_SUBMIT_DEPOSIT };
};

export const successSubmitDeposit = () => {
  return { type: SUCCESS_SUBMIT_DEPOSIT };
};

export const failSubmitDeposit = error => {
  return { type: FAIL_SUBMIT_DEPOSIT, payload: { error } };
};

export const handleChangeCompoundModal = (field, value) => {
  return { type: HANDLE_CHANGE_DEPOSIT, payload: { field, value } };
};

export const clearDepositModalForm = () => {
  return { type: CLEAR_DEPOSIT_FORM };
};

export const clearDepositModalState = () => {
  return { type: CLEAR_DEPOSIT_MODAL_STATE };
};

export const fetchDepositAcount = () => {
  return { type: FETCH_ACCOUNT };
};
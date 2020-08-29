import {
  FETCH_INVESTMENT,
  SUCCESS_INVESTMENT,
  FAIL_INVESTMENT,
} from '../constants/actions';

export const fetchInvestment = type => {
  return { type: FETCH_INVESTMENT, payload: { type } };
};

export const successInvestment = (type, history) => {
  return { type: SUCCESS_INVESTMENT, payload: { type, history } };
};

export const failInvestment = (type) => {
  return { type: FAIL_INVESTMENT, payload: { type } };
};

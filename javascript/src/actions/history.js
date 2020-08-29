import {
  FETCH_HISTORY,
  SUCCESS_HISTORY,
  FAIL_HISTORY,
  FETCH_HISTORY_MXN,
  SUCCESS_HISTORY_MXN,
  FAIL_HISTORY_MXN,
} from '../constants/actions';

export const fetchHistory = type => {
  return { type: FETCH_HISTORY, payload: { type } };
};

export const successHistory = (type, history) => {
  return { type: SUCCESS_HISTORY, payload: { type, history } };
};

export const failHistory = (type) => {
  return { type: FAIL_HISTORY, payload: { type } };
};

export const fetchHistoryMXN = type => {
  return { type: FETCH_HISTORY_MXN, payload: { type } };
};

export const successHistoryMXN = (type, history) => {
  return { type: SUCCESS_HISTORY_MXN, payload: { type, history } };
};

export const failHistoryMXN = (type) => {
  return { type: FAIL_HISTORY_MXN, payload: { type } };
};

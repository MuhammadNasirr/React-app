import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from '../actions/investment';
import * as types from '../constants/actions';
import { DEPOSITS_HISTORY_TYPE, WITHDRAWS_HISTORY_TYPE } from '../constants/history';
import { getInvestmentHistory, getWithdrawHistory } from '../api/investment';

function updateTime(list) {
  return list.map(item => ({
    ...item,
    created_at: moment.utc(item.created_at).format('DD MMM YYYY')
  }));
}

// Saga get history according to type
export function* fetchDepositsInvestment() {
  try {
      const deposits = updateTime(yield call(getInvestmentHistory));
      yield put(actions.successInvestment(DEPOSITS_HISTORY_TYPE, deposits));
    } catch (e) {
    yield put(actions.failInvestment());
  }
}

export function* fetchWithdrawsInvestment() {
  try {
      const withdraws = updateTime(yield call(getWithdrawHistory));
      yield put(actions.successInvestment(WITHDRAWS_HISTORY_TYPE, withdraws));
  } catch (e) {
    yield put(actions.failInvestment());
  }
}

export function* fetchInvestmentSaga() {
  yield takeLatest(types.FETCH_INVESTMENT, fetchDepositsInvestment);
  yield takeLatest(types.FETCH_INVESTMENT, fetchWithdrawsInvestment);
}

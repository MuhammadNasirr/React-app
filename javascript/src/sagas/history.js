import { call, put, takeLatest, select } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from '../actions/history';
import * as types from '../constants/actions';
import { DEPOSITS_HISTORY_TYPE, DEPOSITSMXN_HISTORY_TYPE, WITHDRAWS_HISTORY_TYPE, WITHDRAWSMXN_HISTORY_TYPE } from '../constants/history';
import { getDepositHistory, getDepositHistoryMXN, getWithdrawHistory, getWithdrawHistoryMXN } from '../api/history';

function updateTime(list) {
  return list.map(item => ({
    ...item,
    created_at: moment.utc(item.created_at).format('DD MMM YYYY')
  }));
}

// Saga get history according to type
export function* fetchDepositsHistory() {
  try {
    const id = yield select(state => state.wallet.activeWallet);
    if (id && id === 'mxn') {
      const deposits = updateTime(yield call(getDepositHistoryMXN));
      yield put(actions.successHistory(DEPOSITSMXN_HISTORY_TYPE, deposits));
    } else {
      if (id !== undefined) {
        const deposits = updateTime(yield call(getDepositHistory, id));
        yield put(actions.successHistory(DEPOSITS_HISTORY_TYPE, deposits));
      }
    }
  } catch (e) {
    yield put(actions.failHistory());
  }
}

export function* fetchWithdrawsHistory() {
  try {
    const id = yield select(state => state.wallet.activeWallet);
    if (id && id !== 'mxn') {
      const withdraws = updateTime(yield call(getWithdrawHistory, id));
      yield put(actions.successHistory(WITHDRAWS_HISTORY_TYPE, withdraws));
    }
  } catch (e) {
    yield put(actions.failHistory());
  }
}

export function* fetchWithdrawsHistoryMXN() {
  try {
    const id = yield select(state => state.wallet.activeWallet);
    if (id) {
      const withdraws = updateTime(yield call(getWithdrawHistoryMXN));
      yield put(actions.successHistoryMXN(WITHDRAWSMXN_HISTORY_TYPE, withdraws));
    }
  } catch (e) {
    yield put(actions.failHistoryMXN());
  }
}

export function* fetchHistorySaga() {
  yield takeLatest(types.FETCH_HISTORY, fetchDepositsHistory);
  yield takeLatest(types.FETCH_HISTORY, fetchWithdrawsHistory);
  yield takeLatest(types.FETCH_HISTORY_MXN, fetchWithdrawsHistoryMXN);
}

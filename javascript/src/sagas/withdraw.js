import { call, put, takeEvery, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as actions from '../actions/withdraw';
import * as types from '../constants/actions';
import { postNewWithdraws,postCompoundWithdraws, postNewWithdrawsMXN, postNewDepositsMXN } from '../api/withdraw';
import { fetchWallet } from './wallet'
import { alertPush } from '../actions/alert'

function* fetchSubmitWithdraw() {
  try {
    const params = yield select(state => {
      return {
        beneficiary_id: state.withdraw.rid,
        amount: state.wallet.activeWallet === 'mxn' ? parseFloat(state.withdraw.amount) : state.withdraw.amount,
        otp: state.withdraw.otp,
        currency: state.wallet.activeWallet
      };
    });
    let api = ''
    const data = { ...params }
    if (params.currency === 'mxn') {
      delete params.currency
      params.otp_code = params.otp
      delete params.otp
      params.description = ''
      api = postNewWithdrawsMXN
    } else if (params.currency === 'compound') {          //merge compound
      delete data.beneficiary_id;
      delete data.otp;
      delete data.currency;
      data.currency_id = 'dai'
      api = postCompoundWithdraws
    }
    else {
      api = postNewWithdraws
    }
    const res = yield call(api, data);
    if (res.data) {
      yield put(actions.successSubmitWithdraw());
      yield put(alertPush({ message: ['success.withdraw.action'], type: 'success', open: true }));
      yield call(delay, 1000);
      yield put(actions.clearWithdrawForm());
      if (params.currency === 'compound') {
        yield call(delay, 5000);
      }
      yield call(fetchWallet);
    }

  } catch (error) {
    yield put(actions.clearWithdrawForm());
    yield put(actions.failSubmitWithdraw(error.message));
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

function* fetchSubmitDeposit() {
  try {
    const params = yield select(state => {
      return {
        amount: Number(state.withdraw.amountMXN)
      };
    });

    const data = { ...params }
    const res = yield call(postNewDepositsMXN, data);
    if (res.data) {
      yield put(actions.successSubmitDeposit());
      yield put(alertPush({ message: ['success.deposit.action'], type: 'success', open: true }));
      yield call(delay, 1000);
      yield put(actions.clearWithdrawForm());
    }

  } catch (error) {
    yield put(actions.clearWithdrawForm());
    yield put(actions.failSubmitDeposit(error.message));
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}


export function* fetchSubmitWithdrawSaga() {
  yield takeEvery(types.FETCH_SUBMIT_WITHDRAW, fetchSubmitWithdraw);
  yield takeEvery(types.FETCH_SUBMIT_DEPOSIT, fetchSubmitDeposit);
}

import { call, put, takeEvery, select } from 'redux-saga/effects';
import * as actions from '../actions/deposit';
import * as compoundAction from '../actions/wallet';
import { delay } from 'redux-saga';
import * as types from '../constants/actions';
import { postDeposit } from '../api/deposit';
import { fetchWallet } from './wallet'
import { alertPush } from '../actions/alert'
import { getCompoundData } from '../api/wallet';

var count = 0
function* fetchAcount() {
    const [accounts, investment, rate] = yield call(getCompoundData);
    const wallets = yield select(state => state.wallet.list);
    if (accounts.length && rate.length && Object.keys(wallets).length) {
        const c_balance = accounts[0].c_balance;
        if (c_balance === wallets['compound'].c_balance) {
            count++
            if (count > 0) {
                yield call(delay, 5000);
            }
            if (count < 3) {
                yield put(actions.fetchDepositAcount());
            }
        } else {
            yield put(compoundAction.fetchCompoundData());
        }
    }
}

export function* fetchAcountSaga() {
    yield takeEvery(types.FETCH_ACCOUNT, fetchAcount);
}

function* fetchSubmitDeposit() {
    try {
        const params = yield select(state => {
            return {
                amount: state.deposit.amount,
                currency_id: "dai"
            };
        });

        const res = yield call(postDeposit, params);
        if (res.data && res.data.id) {
            yield put(actions.successSubmitDeposit());
            yield put(alertPush({ message: ["success.deposit.action.message"], type: 'success', open: true }));
            yield call(delay, 1000);
            yield put(actions.clearDepositModalForm());
            yield call(fetchWallet);
            yield call(delay, 5000);
            yield put(actions.fetchDepositAcount());
        } else {
            if (res.data && res.data.length && res.data[0].error) {
                yield put(actions.failSubmitDeposit());
                yield put(alertPush({ message: ["error.deposit.action.message"], type: 'error', open: true }));
            }
        }
    } catch (error) {
        yield put(actions.failSubmitDeposit(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}


export function* fetchSubmitDepositSaga() {
    yield takeEvery(types.FETCH_SUBMIT_DEPOSIT_COMPOUND, fetchSubmitDeposit);
}


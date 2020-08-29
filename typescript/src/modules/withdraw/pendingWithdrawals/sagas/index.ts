import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    GET_PENDING_WITHDRAWALS_FETCH,
    GET_PENDING_WITHDRAWALS_MXN_FETCH,
    UPDATE_WITHDRAW_PENDING_MXN_FETCH
} from '../../../constants';
import { getPendingWithdrawalsMXNSaga } from './getPendingWithdrawsMXNSaga';
import { getPendingWithdrawalsSaga } from './getPendingWithdrawsSaga';
import { updateWithdrawPendingMXNSaga } from './updateWithdrawPendingMXNSaga';

export function* rootPendingWithdrawalsSaga() {
    yield takeEvery(GET_PENDING_WITHDRAWALS_FETCH, getPendingWithdrawalsSaga);
    yield takeEvery(GET_PENDING_WITHDRAWALS_MXN_FETCH, getPendingWithdrawalsMXNSaga);
    yield takeLatest(UPDATE_WITHDRAW_PENDING_MXN_FETCH, updateWithdrawPendingMXNSaga);
}

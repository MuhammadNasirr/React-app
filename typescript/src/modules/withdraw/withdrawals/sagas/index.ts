import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    GET_WITHDRAWALS_FETCH,
    GET_WITHDRAWALS_MXN_FETCH,
    UPDATE_WITHDRAW_MXN_FETCH
} from '../../../constants';
import { getWithdrawalsMXNSaga } from './getWithdrawsMXNSaga';
import { getWithdrawalsSaga } from './getWithdrawsSaga';
import { updateWithdrawMXNSaga } from './updateWithdrawMXNSaga';

export function* rootWithdrawalsSaga() {
    yield takeEvery(GET_WITHDRAWALS_FETCH, getWithdrawalsSaga);
    yield takeEvery(GET_WITHDRAWALS_MXN_FETCH, getWithdrawalsMXNSaga);
    yield takeLatest(UPDATE_WITHDRAW_MXN_FETCH, updateWithdrawMXNSaga);

}

import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ACTION_WITHDRAW_FETCH,
    GET_WITHDRAW_DETAILS_FETCH,
    PROCESS_WITHDRAW_FIAT_FETCH
} from '../../../constants';
import { actionWithdrawSaga, processWithdrawFiatSaga } from './actionWithdrawSaga';
import { getWithdrawDetailsSaga } from './getWithdrawDetailsSaga';

export function* rootWithdrawDetailsSaga() {
    yield takeEvery(GET_WITHDRAW_DETAILS_FETCH, getWithdrawDetailsSaga);
    yield takeLatest(ACTION_WITHDRAW_FETCH, actionWithdrawSaga);
    yield takeLatest(PROCESS_WITHDRAW_FIAT_FETCH, processWithdrawFiatSaga);
}

import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ACTION_DEPOSIT_FETCH,
    ADD_DEPOSIT_FETCH,
    GET_DEPOSIT_DETAILS_FETCH,
} from '../../../constants';
import { actionDepositSaga } from './actionDepositSaga';
import { addDepositSaga } from './addDepositSaga';
import { getDepositDetailsSaga } from './getDepositDetailsSaga';

export function* rootDepositDetailsSaga() {
    yield takeEvery(GET_DEPOSIT_DETAILS_FETCH, getDepositDetailsSaga);
    yield takeLatest(ACTION_DEPOSIT_FETCH, actionDepositSaga);
    yield takeLatest(ADD_DEPOSIT_FETCH, addDepositSaga);
}

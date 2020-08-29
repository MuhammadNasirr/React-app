import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    GET_DEPOSITS_FETCH,
    GET_DEPOSITS_MXN_FETCH,
    UPDATE_DEPOSIT_MXN_FETCH
} from '../../../constants';
import { getDepositsMXNSaga } from './getDepositsMXNSaga';
import { getDepositsSaga } from './getDepositsSaga';
import { updateDepositMXNSaga } from './updateDepositMXNSaga';

export function* rootDepositsSaga() {
    yield takeEvery(GET_DEPOSITS_FETCH, getDepositsSaga);
    yield takeEvery(GET_DEPOSITS_MXN_FETCH, getDepositsMXNSaga);
    yield takeLatest(UPDATE_DEPOSIT_MXN_FETCH, updateDepositMXNSaga);
}

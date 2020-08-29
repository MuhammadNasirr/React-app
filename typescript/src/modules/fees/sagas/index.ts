import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_FEES_FETCH,
    DELETE_FEES_FETCH,
    EDIT_FEES_FETCH,
    GET_FEES_FETCH,
} from '../../constants';
import { addFeesSaga } from './addFeesSaga';
import { deleteFeesSaga } from './deleteFeesSaga';
import { editFeesSaga } from './editFeesSaga';
import { getFeesSaga } from './getFeesSaga';

export function* rootFeesSaga() {
    yield takeLatest(ADD_FEES_FETCH, addFeesSaga);
    yield takeEvery(GET_FEES_FETCH, getFeesSaga);
    yield takeEvery(EDIT_FEES_FETCH, editFeesSaga);
    yield takeEvery(DELETE_FEES_FETCH, deleteFeesSaga);
}

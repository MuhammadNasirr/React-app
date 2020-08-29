import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ACTION_ADJUSTMENT_FETCH,
    ADD_ADJUSTMENT_FETCH,
    GET_ADJUSTMENTS_DETAILS_FETCH,
} from '../../../constants';
import { actionAdjustmentSaga } from './actionAdjustmentSaga';
import { addAdjustmentSaga } from './addAdjustmentSaga';
import { getAdjustmentDetailsSaga } from './getAdjustmentDetailsSaga';

export function* rootAdjustmentDetailsSaga() {
    yield takeEvery(GET_ADJUSTMENTS_DETAILS_FETCH, getAdjustmentDetailsSaga);
    yield takeLatest(ACTION_ADJUSTMENT_FETCH, actionAdjustmentSaga);
    yield takeLatest(ADD_ADJUSTMENT_FETCH, addAdjustmentSaga);
}

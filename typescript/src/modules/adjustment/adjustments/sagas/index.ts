import { takeEvery } from 'redux-saga/effects';
import {
    GET_ADJUSTMENTS_FETCH,
} from '../../../constants';
import { getAdjustmentsSaga } from './getAdjustmentsSaga';

export function* rootAdjustmentsSaga() {
    yield takeEvery(GET_ADJUSTMENTS_FETCH, getAdjustmentsSaga);
}

import { takeEvery } from 'redux-saga/effects';
import {
    GET_LIABILITIES_FETCH,
} from '../../constants';
import { getLiabilitiesSaga } from './getLiabilitiesSaga';

export function* rootLiabilitiesSaga() {
    yield takeEvery(GET_LIABILITIES_FETCH, getLiabilitiesSaga);
}

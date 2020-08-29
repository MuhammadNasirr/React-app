import { takeEvery } from 'redux-saga/effects';
import {
    GET_REVENUES_FETCH,
} from '../../constants';
import { getRevenuesSaga } from './getRevenuesSaga';

export function* rootRevenuesSaga() {
    yield takeEvery(GET_REVENUES_FETCH, getRevenuesSaga);
}

import { takeEvery } from 'redux-saga/effects';
import {
    GET_MARKETS_FETCH,
} from '../../../constants';
import { getMarketsSaga } from './getMarketsSaga';

export function* rootMarketsSaga() {
    yield takeEvery(GET_MARKETS_FETCH, getMarketsSaga);
}

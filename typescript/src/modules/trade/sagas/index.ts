import { takeEvery } from 'redux-saga/effects';
import {
    GET_TRADES_FETCH,
} from '../../constants';
import { getTradesSaga } from './getTradesSaga';

export function* rootTradesSaga() {
    yield takeEvery(GET_TRADES_FETCH, getTradesSaga);
}

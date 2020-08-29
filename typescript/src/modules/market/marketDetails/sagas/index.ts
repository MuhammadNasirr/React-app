import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_MARKETS_FETCH,
    EDIT_MARKETS_FETCH,
    GET_MARKETS_DETAILS_FETCH,
} from '../../../constants';
import { addMarketSaga } from './addMarketSaga';
import { editMarketSaga } from './editMarketSaga';
import { getMarketDetailsSaga } from './getMarketDetailsSaga';

export function* rootMarketsDetailsSaga() {
    yield takeLatest(EDIT_MARKETS_FETCH, editMarketSaga);
    yield takeLatest(ADD_MARKETS_FETCH, addMarketSaga);
    yield takeEvery(GET_MARKETS_DETAILS_FETCH, getMarketDetailsSaga);
}

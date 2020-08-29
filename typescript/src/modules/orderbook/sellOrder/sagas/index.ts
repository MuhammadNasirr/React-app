// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import { CANCEL_SELL_ORDER_FETCH, GET_SELL_ORDERS_FETCH } from '../../../constants';
import { cancelSellOrdersSaga } from './cancelOrdersSaga';
import { sellOrdersSaga } from './ordersSaga';

export function* rootSellOrdersSaga() {
    yield takeEvery(GET_SELL_ORDERS_FETCH, sellOrdersSaga);
    yield takeEvery(CANCEL_SELL_ORDER_FETCH, cancelSellOrdersSaga);
}

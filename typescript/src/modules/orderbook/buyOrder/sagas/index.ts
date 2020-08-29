// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import { CANCEL_BUY_ORDER_FETCH, GET_BUY_ORDERS_FETCH } from '../../../constants';
import { cancelBuyOrdersSaga } from './cancelOrdersSaga';
import { buyOrdersSaga } from './ordersSaga';

export function* rootBuyOrdersSaga() {
    yield takeEvery(GET_BUY_ORDERS_FETCH, buyOrdersSaga);
    yield takeEvery(CANCEL_BUY_ORDER_FETCH, cancelBuyOrdersSaga);
}

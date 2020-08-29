// tslint:disable-next-line
import { takeEvery } from 'redux-saga/effects';
import { CANCEL_ORDERS_FETCH, GET_ORDERS_FETCH } from '../../constants';
import { cancelOrdersSaga } from './cancelOrdersSaga';
import { ordersSaga } from './ordersSaga';

export function* rootOrdersSaga() {
    yield takeEvery(GET_ORDERS_FETCH, ordersSaga);
    yield takeEvery(CANCEL_ORDERS_FETCH, cancelOrdersSaga);
}

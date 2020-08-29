import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getBuyOrders
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { CancelBuyOrderFetch } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* cancelBuyOrdersSaga(action: CancelBuyOrderFetch) {
    try {
        const { id, market } = action.payload;
        yield call(API.post(requestOptions), `/admin/orders/${id}/cancel`, { id });
        yield put(getBuyOrders({ page: 1, limit: 50, state: 'wait', type: 'sell', market: market, order_by: 'price', ordering: 'desc' }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

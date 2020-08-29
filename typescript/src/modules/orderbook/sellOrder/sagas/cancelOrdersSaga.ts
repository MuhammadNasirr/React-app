import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getSellOrders
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { CancelSellOrderFetch } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* cancelSellOrdersSaga(action: CancelSellOrderFetch) {
    try {
        const { id, market } = action.payload;
        yield call(API.post(requestOptions), `/admin/orders/${id}/cancel`, { id });
        yield put(getSellOrders({ page: 1, limit: 50, state: 'wait', type: 'sell', market: market, order_by: 'price', ordering: 'desc' }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

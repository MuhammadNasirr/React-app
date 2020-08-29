import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getOrders
} from '../../';
import { API, RequestOptions } from '../../../api';
import { CancelOrdersFetch } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* cancelOrdersSaga(action: CancelOrdersFetch) {
    try {
        const { id, uid } = action.payload;
        yield call(API.post(requestOptions), `/admin/orders/${id}/cancel`, { id });
        yield put(getOrders({ page: 1, limit: 50, state: 'wait', uid: uid }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

import { call, put } from 'redux-saga/effects';
import {
    alertPush,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';
import { GetOrdersFetch, ordersData } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* ordersSaga(action: GetOrdersFetch) {
    try {
        const { page } = action.payload;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/orders?${params}`);
        yield put(ordersData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

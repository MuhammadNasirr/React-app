import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetRevenuesFetch,
    revenuesData,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getRevenuesSaga(action: GetRevenuesFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/revenues?${params}`);
        yield put(revenuesData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

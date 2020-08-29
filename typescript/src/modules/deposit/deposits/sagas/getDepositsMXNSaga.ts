import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    DepositsDataMXN,
    GetDepositsMXNFetch,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getDepositsMXNSaga(action: GetDepositsMXNFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        console.log('paramsss', params);
        const res = yield call(API.get(requestOptions), `/admin/deposits?${params}`);

        const data = res.data;
        const headers = res.headers;
        yield put(DepositsDataMXN({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

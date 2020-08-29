import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetWithdrawalsMXNFetch,
    WithdrawalsDataMXN,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getWithdrawalsMXNSaga(action: GetWithdrawalsMXNFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const res = yield call(API.get(requestOptions), `/admin/withdraws?${params}`);

        const data = res.data;
        const headers = res.headers;
        yield put(WithdrawalsDataMXN({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

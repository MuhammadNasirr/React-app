import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetPendingWithdrawalsMXNFetch,
    pendingWithdrawalsDataMXN,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getPendingWithdrawalsMXNSaga(action: GetPendingWithdrawalsMXNFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const res = yield call(API.get(requestOptions), `/admin/withdraws?${params}&state=pending`);

        const data = res.data;
        const total = res.headers.total;
        yield put(pendingWithdrawalsDataMXN({ list: data, page, total: total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

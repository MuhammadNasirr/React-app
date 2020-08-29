import { all, call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetPendingWithdrawalsFetch,
    pendingWithdrawalsData,
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getPendingWithdrawalsSaga(action: GetPendingWithdrawalsFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const [accepted, errored] = yield all([
            call(API.get(requestOptions), `/admin/withdraws?${params}&state=accepted`),
            call(API.get(requestOptions), `/admin/withdraws?${params}&state=errored`)
        ]);
        const data = accepted.data.concat(errored.data);
        const total = Number(accepted.headers.total) + Number(errored.headers.total);
        yield put(pendingWithdrawalsData({ list: data, page, total: total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

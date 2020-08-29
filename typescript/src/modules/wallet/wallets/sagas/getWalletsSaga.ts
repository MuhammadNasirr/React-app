import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetWalletsFetch,
    walletsData,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getWalletsSaga(action: GetWalletsFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/wallets?${params}`);
        yield put(walletsData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

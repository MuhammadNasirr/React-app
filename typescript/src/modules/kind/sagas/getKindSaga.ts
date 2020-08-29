import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetKindFetch,
    kindData,
} from '../..';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getKindSaga(action: GetKindFetch) {
    try {
        const { data } = yield call(API.get(requestOptions), `/admin/wallets/kinds`);
        yield put(kindData({ list: data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

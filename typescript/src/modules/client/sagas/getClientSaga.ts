import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    clientData,
    GetClientFetch,
} from '../..';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getClientSaga(action: GetClientFetch) {
    try {
        const { data } = yield call(API.get(requestOptions), `/admin/blockchains/clients`);
        yield put(clientData({ list: data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

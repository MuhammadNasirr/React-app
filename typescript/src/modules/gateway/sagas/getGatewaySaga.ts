import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    gatewayData,
    GetGatewayFetch,
} from '../..';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getGatewaySaga(action: GetGatewayFetch) {
    try {
        const { data } = yield call(API.get(requestOptions), `/admin/wallets/gateways`);
        yield put(gatewayData({ list: data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

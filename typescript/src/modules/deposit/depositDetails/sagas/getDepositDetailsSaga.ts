import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    depositDetailsData,
    GetDepositDetailsFetch,
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

const requestOptions1: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getDepositDetailsSaga(action: GetDepositDetailsFetch) {
    try {
        const params = buildQueryString(action.payload);
        const id = action.payload.tid;
        const mxn = action.payload.mxn;
        const api = mxn ? call(API.get(requestOptions1), `/admin/deposits/${id}`) : call(API.get(requestOptions), `/admin/deposits?${params}`);
        const { data } = yield api;
        yield put(depositDetailsData({ data: data[0] }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

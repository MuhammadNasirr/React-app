import { call, put } from 'redux-saga/effects';
import {
    ActionWithdrawFetch,
    alertPush,
    ProcessWithdrawFiatFetch,
    withdrawDetailsData
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

const requestOptions1: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* actionWithdrawSaga(action: ActionWithdrawFetch) {
    try {
        if (action.payload.mxn) {
            const params1 = { id: action.payload.id, action: 'rejected' };
            const api = call(API.get(requestOptions1), `/admin/withdraws/${action.payload.id}`);
            yield call(API.post(requestOptions1), `/admin/withdraws/actions`, params1);
            yield put(alertPush({ message: [`Withdraw successfully ${params1.action}ed`], type: 'success' }));
            const { data } = yield api;
            yield put(withdrawDetailsData({ data }));
        } else {
            const params = { id: action.payload.id, action: action.payload.action, txid: action.payload.txid };
            yield call(API.post(requestOptions), `/admin/withdraws/actions`, params);
            yield put(alertPush({ message: [`Withdraw successfully ${params.action}ed`], type: 'success' }));
        }
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

export function* processWithdrawFiatSaga(action: ProcessWithdrawFiatFetch) {
    try {
        if (action.payload.mxn) {
            const params1 = { id: action.payload.id, action: 'completed' };
            const api = call(API.get(requestOptions1), `/admin/withdraws/${action.payload.id}`);
            yield call(API.post(requestOptions1), `/admin/withdraws/actions`, params1);
            const { data } = yield api;
            yield put(withdrawDetailsData({ data }));
        } else {
            const params1 = { id: action.payload.id, action: 'process' };
            const params2 = { id: action.payload.id, action: 'dispatch' };
            const params3 = { id: action.payload.id, action: 'success' };
            yield call(API.post(requestOptions), `/admin/withdraws/actions`, params1);
            yield call(API.post(requestOptions), `/admin/withdraws/actions`, params2);
            yield call(API.post(requestOptions), `/admin/withdraws/actions`, params3);
        }
        yield put(alertPush({ message: [`Withdraw successfully processed`], type: 'success' }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

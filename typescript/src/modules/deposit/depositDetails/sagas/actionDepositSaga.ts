import { call, put } from 'redux-saga/effects';
import {
    ActionDepositFetch,
    alertPush,
    getDepositDetails,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

const requestOptions1: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* actionDepositSaga(action: ActionDepositFetch) {
    try {
        if (action.payload.mxn) {
            const params = { id: action.payload.id, action: action.payload.action, price: action.payload.price };
            yield call(API.post(requestOptions1), `/admin/deposits/actions`, params);
            yield put(alertPush({ message: [`Deposit successfully ${params.action}ed`], type: 'success' }));
            yield put(getDepositDetails({ tid: action.payload.id.toString(), mxn: true }));
        } else {

            const params = { id: action.payload.id, action: action.payload.action };
            yield call(API.post(requestOptions), `/admin/deposits/actions`, params);
            yield put(alertPush({ message: [`Deposit successfully ${params.action}ed`], type: 'success' }));
            yield put(getDepositDetails({ tid: action.payload.tid }));
        }
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

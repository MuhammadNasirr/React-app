import { call, put } from 'redux-saga/effects';
import {
    AddDepositFetch,
    alertPush,
    getDeposits,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addDepositSaga(action: AddDepositFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/deposits/new`, action.payload);
        yield put(alertPush({ message: ['Deposit successfully added'], type: 'success' }));
        yield put(getDeposits({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

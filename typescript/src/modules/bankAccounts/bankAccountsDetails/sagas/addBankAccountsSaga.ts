import { call, put } from 'redux-saga/effects';
import {
    AddBankAccountsFetch,
    alertPush,
    getBankAccounts
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import {
    tablePageLimit
} from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* addBankAccountsSaga(action: AddBankAccountsFetch) {
    try {
        if (action.payload.id) {
            yield call(API.put(requestOptions), `/admin/bank_account`, action.payload);
            yield put(alertPush({ message: ['Bank Account successfully edited'], type: 'success' }));
        } else {
            yield call(API.post(requestOptions), `/admin/bank_account`, action.payload);
            yield put(alertPush({ message: ['Bank Account successfully added'], type: 'success' }));
        }
        yield put(getBankAccounts({ page: 1, limit: tablePageLimit() }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

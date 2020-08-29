import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    bankAccountsData,
    GetBankAccountsFetch,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getBankAccountsSaga(action: GetBankAccountsFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/bank_account?${params}`);
        yield put(bankAccountsData({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

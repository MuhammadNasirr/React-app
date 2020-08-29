import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    bankAccountsDetailsData,
    GetBankAccountsDetailsFetch,
} from '../../..';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getBankAccountsDetailsSaga(action: GetBankAccountsDetailsFetch) {
    try {
        const id = action.payload.id;
        const { data } = yield call(API.get(requestOptions), `/admin/bank_account/${id}`);
        yield put(bankAccountsDetailsData({ data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

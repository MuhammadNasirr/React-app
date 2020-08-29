import { call, put } from 'redux-saga/effects';
import {
    AddCurrenciesFetch,
    alertPush,
    getCurrencies,
} from '../../../';
import { history } from '../../../../';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addCurrencySaga(action: AddCurrenciesFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/currencies/new`, action.payload);
        yield put(alertPush({ message: ['Currency successfully added'], type: 'success' }));
        history.push(`${root()}/exchange/currencies`);
        yield put(getCurrencies({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

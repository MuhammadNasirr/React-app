import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    currenciesDetailsData,
    GetCurrenciesDetailsFetch,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getCurrencyDetailsSaga(action: GetCurrenciesDetailsFetch) {
    try {
        const currency = action.payload.currency;
        const { data } = yield call(API.get(requestOptions), `/admin/currencies/${currency}`);
        yield put(currenciesDetailsData({ data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

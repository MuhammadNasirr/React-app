import { call, put } from 'redux-saga/effects';
import {
    AddMarketsFetch,
    alertPush,
    getMarkets,
} from '../../../';
import { history } from '../../../../';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addMarketSaga(action: AddMarketsFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/markets/new`, action.payload);
        yield put(alertPush({ message: ['Currency successfully added'], type: 'success' }));
        history.push(`${root()}/exchange/markets`);
        yield put(getMarkets({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

import { call, put } from 'redux-saga/effects';
import {
    AddFeesFetch,
    alertPush,
    getFees,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addFeesSaga(action: AddFeesFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/trading_fees/new`, action.payload);
        yield put(getFees({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

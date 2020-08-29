import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    DeleteFeesFetch,
    getFees,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* deleteFeesSaga(action: DeleteFeesFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/trading_fees/delete`, action.payload);
        yield put(getFees({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}


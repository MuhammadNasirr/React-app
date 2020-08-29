import { call, put } from 'redux-saga/effects';
import {
    AddAdjustmentFetch,
    alertPush
} from '../../../';
import { history } from '../../../../';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addAdjustmentSaga(action: AddAdjustmentFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/adjustments/new`, action.payload);
        yield put(alertPush({ message: ['Adjustment successfully added'], type: 'success' }));
        history.push(`${root()}/accountings/adjustments`);
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

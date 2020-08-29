import { call, put } from 'redux-saga/effects';
import {
    ActionAdjustmentFetch,
    alertPush,
    getAdjustmentDetails,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* actionAdjustmentSaga(action: ActionAdjustmentFetch) {
    try {
        const params = { id: action.payload.id, action: action.payload.action };
        yield call(API.post(requestOptions), `/admin/adjustments/action`, params);
        yield put(alertPush({ message: [`Adjustment successfully ${params.action}ed`], type: 'success' }));
        yield put(getAdjustmentDetails({ id: action.payload.id }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

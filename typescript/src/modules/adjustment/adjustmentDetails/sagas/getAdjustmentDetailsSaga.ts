import { call, put } from 'redux-saga/effects';
import {
    adjustmentDetailsData,
    alertPush,
    GetAdjustmentDetailsFetch,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getAdjustmentDetailsSaga(action: GetAdjustmentDetailsFetch) {
    try {
        const id = action.payload.id;
        const { data } = yield call(API.get(requestOptions), `/admin/adjustments/${id}`);
        yield put(adjustmentDetailsData({ data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

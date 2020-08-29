import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetMarketsDetailsFetch,
    marketsDetailsData,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getMarketDetailsSaga(action: GetMarketsDetailsFetch) {
    try {
        const id = action.payload.id;
        const { data } = yield call(API.get(requestOptions), `/admin/markets/${id}`);
        yield put(marketsDetailsData({ data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetRestrictionFetch,
    getRestrictionSuccess,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* getRestrictionSaga(action: GetRestrictionFetch) {
    try {
        const page = action.payload.page;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/restrictions?${params}`);
        yield put(getRestrictionSuccess({ list: data, page, total: headers.total }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

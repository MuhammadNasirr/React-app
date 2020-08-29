import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetPermissionsFetch,
    getPermissionSuccess,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* getPermissionsSaga(action: GetPermissionsFetch) {
    try {
        const page = action.payload.page;
        const limit = action.payload.limit;
        const params = buildQueryString(action.payload);
        const { data, headers } = yield call(API.get(requestOptions), `/admin/permissions?${params}`);
        yield put(getPermissionSuccess({ list: data, page, total: headers.total, limit }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

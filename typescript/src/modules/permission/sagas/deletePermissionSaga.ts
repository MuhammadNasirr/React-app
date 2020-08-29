import { call, put, select } from 'redux-saga/effects';
import {
    alertPush,
    DeletePermissionFetch,
    getPermissions,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

const getpage = state => state.permissions.page;
const getLimit = state => state.permissions.limit;

export function* deletePermissionSaga(action: DeletePermissionFetch) {
    try {
        const params = buildQueryString(action.payload);
        yield call(API.delete(requestOptions), `/admin/permissions?${params}`);
        yield put(alertPush({ message: ['Permission successfully deleted'], type: 'success' }));
        const page = yield select(getpage);
        const limit = yield select(getLimit);
        yield put(getPermissions({page, limit}));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

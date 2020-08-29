import { call, put, select } from 'redux-saga/effects';
import {
    AddPermissionFetch,
    alertPush,
    getPermissions,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

const getpage = state => state.permissions.page;
const getLimit = state => state.permissions.limit;

export function* addPermissionSaga(action: AddPermissionFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/permissions`, action.payload);
        yield put(alertPush({ message: ['Permission successfully created'], type: 'success' }));
        const page = yield select(getpage);
        const limit = yield select(getLimit);
        yield put(getPermissions({ page, limit }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

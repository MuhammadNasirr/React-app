import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    DeleteRestrictionFetch,
    getRestrictions,
} from '../../';
import { API, RequestOptions } from '../../../api';
import { buildQueryString } from '../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* deleteRestrictionSaga(action: DeleteRestrictionFetch) {
    try {
        const params = buildQueryString(action.payload);
        yield call(API.delete(requestOptions), `/admin/restrictions?${params}`);
        yield put(getRestrictions({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}


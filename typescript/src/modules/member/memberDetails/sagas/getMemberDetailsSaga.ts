import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetMemberDetailsFetch,
    memberDetailsData,
} from '../../../';
import { API, RequestOptions } from '../../../../api';
import { buildQueryString } from '../../../../helpers';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getMemberDetailsSaga(action: GetMemberDetailsFetch) {
    try {
        const params = buildQueryString(action.payload);
        const { data } = yield call(API.get(requestOptions), `/admin/members?${params}`);
        yield put(memberDetailsData({ data: data[0] }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

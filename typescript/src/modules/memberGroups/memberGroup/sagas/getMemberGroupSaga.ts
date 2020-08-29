import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetMemberGroupFetch,
    memberGroupData,
} from '../../..';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getMemberGroupSaga(action: GetMemberGroupFetch) {
    try {
        const { data } = yield call(API.get(requestOptions), `/admin/members/groups`);
        yield put(memberGroupData({ data: data[0] }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

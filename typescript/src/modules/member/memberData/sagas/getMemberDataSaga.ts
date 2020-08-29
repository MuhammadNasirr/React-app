import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetMemberDataFetch,
    memberDataData,
} from '../../..';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getMemberDataSaga(action: GetMemberDataFetch) {
    try {
        const uid = action.payload.uid;
        const { data } = yield call(API.get(requestOptions), `/admin/members/${uid}`);
        yield put(memberDataData({ data: data[0] }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

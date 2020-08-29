import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getMemberDetails,
    getWithdrawals,
    GetWithdrawDetailsFetch,
    withdrawDetailsData,
} from '../../../';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

const requestOptions1: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* getWithdrawDetailsSaga(action: GetWithdrawDetailsFetch) {
    try {
        const id = action.payload.id;
        const mxn = action.payload.mxn;
        const api = mxn ? call(API.get(requestOptions1), `/admin/withdraws/${id}`) : call(API.get(requestOptions), `/admin/withdraws/${id}`);
        const { data } = yield api;
        yield put(withdrawDetailsData({ data }));
        if (!mxn) {
            yield put(getWithdrawals({ page: 1, limit: 50, uid: data.uid }));                   // fetching user related withdraws
            yield put(getMemberDetails({ uid: data.uid }));                                      // fetching member
        }
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    GetWalletDetailsFetch,
    walletDetailsData,
} from '../../..';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getWalletDetailsSaga(action: GetWalletDetailsFetch) {
    try {
        const id = action.payload.id;
        const { data } = yield call(API.get(requestOptions), `/admin/wallets/${id}`);
        yield put(walletDetailsData({ data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

import { call, put } from 'redux-saga/effects';
import {
    AddWalletFetch,
    alertPush,
    getWallets,
} from '../../..';
import { history } from '../../../..';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addWalletSaga(action: AddWalletFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/wallets/new`, action.payload);
        yield put(alertPush({ message: ['Wallet successfully added'], type: 'success' }));
        history.push(`${root()}/settings/wallets`);
        yield put(getWallets({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

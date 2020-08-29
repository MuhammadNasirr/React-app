import { call, put } from 'redux-saga/effects';
import {
    AddBlockchainFetch,
    alertPush,
    getBlockchains,
} from '../../..';
import { history } from '../../../..';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* addBlockchainSaga(action: AddBlockchainFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/blockchains/new`, action.payload);
        yield put(alertPush({ message: ['Blockchain successfully added'], type: 'success' }));
        history.push(`${root()}/settings/blockchains`);
        yield put(getBlockchains({ page: 1, limit: 50 }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

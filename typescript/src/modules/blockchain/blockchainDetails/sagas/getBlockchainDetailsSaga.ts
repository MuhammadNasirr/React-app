import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    blockchainDetailsData,
    GetBlockchainDetailsFetch,
} from '../../..';
import { API, RequestOptions } from '../../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* getBlockchainDetailsSaga(action: GetBlockchainDetailsFetch) {
    try {
        const id = action.payload.id;
        const { data } = yield call(API.get(requestOptions), `/admin/blockchains/${id}`);
        yield put(blockchainDetailsData({ data }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

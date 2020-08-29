import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    EditBlockchainFetch
} from '../../..';
import { history } from '../../../..';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* editBlockchainSaga(action: EditBlockchainFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/blockchains/update`, action.payload);
        yield put(alertPush({ message: [`Blockchain successfully updated`], type: 'success' }));
        history.push(`${root()}/settings/blockchains`);
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

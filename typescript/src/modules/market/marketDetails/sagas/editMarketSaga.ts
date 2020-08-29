import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    EditMarketsFetch
} from '../../../';
import { history } from '../../../../';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'peatio',
};

export function* editMarketSaga(action: EditMarketsFetch) {
    try {
        yield call(API.post(requestOptions), `/admin/markets/update`, action.payload);
        yield put(alertPush({ message: [`Currency successfully updated`], type: 'success' }));
        history.push(`${root()}/exchange/markets`);
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

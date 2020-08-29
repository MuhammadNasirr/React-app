import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getDepositsMXN,
    UpdateDepositMXNFetch,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import {
    tablePageLimit
} from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* updateDepositMXNSaga(action: UpdateDepositMXNFetch) {
    try {
        const params = { id: action.payload.id, amount: action.payload.amount, price: action.payload.price };
        yield call(API.put(requestOptions), `/admin/deposits`, params);
        yield put(alertPush({ message: [`Deposit successfully edited`], type: 'success' }));
        yield put(getDepositsMXN({ page: 1, limit: tablePageLimit() }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

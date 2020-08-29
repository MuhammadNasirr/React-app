import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getWithdrawalsMXN,
    UpdateWithdrawMXNFetch,
} from '../../..';
import { API, RequestOptions } from '../../../../api';
import {
    tablePageLimit
} from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* updateWithdrawMXNSaga(action: UpdateWithdrawMXNFetch) {
    try {
        const params = { id: action.payload.id, amount: action.payload.amount, price: action.payload.price };
        yield call(API.put(requestOptions), `/admin/withdraws`, params);
        yield put(alertPush({ message: [`Withdraw successfully edited`], type: 'success' }));
        yield put(getWithdrawalsMXN({ page: 1, limit: tablePageLimit() }));
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

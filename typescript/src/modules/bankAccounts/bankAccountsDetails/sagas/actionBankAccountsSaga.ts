import { call, put } from 'redux-saga/effects';
import {
    ActionBankAccountsFetch,
    alertPush,
    getBankAccountsDetails,
} from '../../..';
import { history } from '../../../..';
import { API, RequestOptions } from '../../../../api';
import { root } from '../../../../api/config';

const requestOptions: RequestOptions = {
    apiVersion: 'fiatlogic',
};

export function* actionBankAccountsSaga(action: ActionBankAccountsFetch) {
    try {
        const params = { id: action.payload.id, action: action.payload.action };
        yield call(API.post(requestOptions), `/admin/bank_account/actions`, params);
        yield put(alertPush({ message: [`Bank Account successfully ${params.action}`], type: 'success' }));
        if (params.action === 'deleted') {
            history.push(`${root()}/accountings/bank-account`);
        } else {
            yield put(getBankAccountsDetails({ id: action.payload.id }));
        }
    } catch (error) {
        yield put(alertPush({ message: error.message, code: error.code, type: 'error' }));
    }
}

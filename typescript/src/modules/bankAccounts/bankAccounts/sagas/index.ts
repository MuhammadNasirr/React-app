import { takeEvery } from 'redux-saga/effects';
import {
    GET_BANK_ACCOUNTS_FETCH,
} from '../../../constants';
import { getBankAccountsSaga } from './getBankAccountsSaga';

export function* rootBankAccountsSaga() {
    yield takeEvery(GET_BANK_ACCOUNTS_FETCH, getBankAccountsSaga);
}

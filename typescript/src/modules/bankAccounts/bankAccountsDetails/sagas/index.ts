import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ACTION_BANK_ACCOUNTS_FETCH,
    ADD_BANK_ACCOUNTS_FETCH,
    GET_BANK_ACCOUNTS_DETAILS_FETCH,
} from '../../../constants';
import { actionBankAccountsSaga } from './actionBankAccountsSaga';
import { addBankAccountsSaga } from './addBankAccountsSaga';
import { getBankAccountsDetailsSaga } from './getBankAccountsDetailsSaga';

export function* rootBankAccountsDetailsSaga() {
    yield takeEvery(GET_BANK_ACCOUNTS_DETAILS_FETCH, getBankAccountsDetailsSaga);
    yield takeLatest(ACTION_BANK_ACCOUNTS_FETCH, actionBankAccountsSaga);
    yield takeLatest(ADD_BANK_ACCOUNTS_FETCH, addBankAccountsSaga);
}

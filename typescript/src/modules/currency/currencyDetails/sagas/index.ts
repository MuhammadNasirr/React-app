import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_CURRENCIES_FETCH,
    EDIT_CURRENCIES_FETCH,
    GET_CURRENCIES_DETAILS_FETCH,
} from '../../../constants';
import { addCurrencySaga } from './addCurrencySaga';
import { editCurrencySaga } from './editCurrencySaga';
import { getCurrencyDetailsSaga } from './getCurrencyDetailsSaga';

export function* rootCurrenciesDetailsSaga() {
    yield takeLatest(EDIT_CURRENCIES_FETCH, editCurrencySaga);
    yield takeLatest(ADD_CURRENCIES_FETCH, addCurrencySaga);
    yield takeEvery(GET_CURRENCIES_DETAILS_FETCH, getCurrencyDetailsSaga);
}

import { takeEvery } from 'redux-saga/effects';
import {
    GET_CURRENCIES_FETCH,
} from '../../../constants';
import { getCurrenciesSaga } from './getCurrenciesSaga';

export function* rootCurrenciesSaga() {
    yield takeEvery(GET_CURRENCIES_FETCH, getCurrenciesSaga);
}

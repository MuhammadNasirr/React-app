import { takeEvery } from 'redux-saga/effects';
import {
    GET_EXPENSES_FETCH,
} from '../../constants';
import { getExpensesSaga } from './getExpensesSaga';

export function* rootExpensesSaga() {
    yield takeEvery(GET_EXPENSES_FETCH, getExpensesSaga);
}

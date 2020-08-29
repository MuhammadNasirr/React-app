import { takeEvery } from 'redux-saga/effects';
import {
    GET_CLIENT_FETCH,
} from '../../constants';
import { getClientSaga } from './getClientSaga';

export function* rootClientSaga() {
    yield takeEvery(GET_CLIENT_FETCH, getClientSaga);
}

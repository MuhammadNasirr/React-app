import { takeEvery } from 'redux-saga/effects';
import {
    GET_WALLETS_FETCH,
} from '../../../constants';
import { getWalletsSaga } from './getWalletsSaga';

export function* rootWalletsSaga() {
    yield takeEvery(GET_WALLETS_FETCH, getWalletsSaga);
}

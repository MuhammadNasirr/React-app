import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_WALLETS_FETCH,
    EDIT_WALLETS_FETCH,
    GET_WALLETS_DETAILS_FETCH,
} from '../../../constants';
import { addWalletSaga } from './addWalletSaga';
import { editWalletSaga } from './editWalletSaga';
import { getWalletDetailsSaga } from './getWalletDetailsSaga';

export function* rootWalletDetailsSaga() {
    yield takeLatest(EDIT_WALLETS_FETCH, editWalletSaga);
    yield takeLatest(ADD_WALLETS_FETCH, addWalletSaga);
    yield takeEvery(GET_WALLETS_DETAILS_FETCH, getWalletDetailsSaga);
}

import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_BLOCKCHAINS_FETCH,
    EDIT_BLOCKCHAINS_FETCH,
    GET_BLOCKCHAINS_DETAILS_FETCH,
} from '../../../constants';
import { addBlockchainSaga } from './addBlockchainSaga';
import { editBlockchainSaga } from './editBlockchainSaga';
import { getBlockchainDetailsSaga } from './getBlockchainDetailsSaga';

export function* rootBlockchainDetailsSaga() {
    yield takeLatest(EDIT_BLOCKCHAINS_FETCH, editBlockchainSaga);
    yield takeLatest(ADD_BLOCKCHAINS_FETCH, addBlockchainSaga);
    yield takeEvery(GET_BLOCKCHAINS_DETAILS_FETCH, getBlockchainDetailsSaga);
}

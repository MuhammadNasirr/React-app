import { takeEvery } from 'redux-saga/effects';
import {
    GET_BLOCKCHAINS_FETCH,
} from '../../../constants';
import { getBlockchainsSaga } from './getBlockchainsSaga';

export function* rootBlockchainsSaga() {
    yield takeEvery(GET_BLOCKCHAINS_FETCH, getBlockchainsSaga);
}

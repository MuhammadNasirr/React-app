import { takeEvery } from 'redux-saga/effects';
import {
    GET_ASSETS_FETCH,
} from '../../constants';
import { getAssetsSaga } from './getAssetsSaga';

export function* rootAssetsSaga() {
    yield takeEvery(GET_ASSETS_FETCH, getAssetsSaga);
}

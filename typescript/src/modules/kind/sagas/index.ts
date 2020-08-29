import { takeEvery } from 'redux-saga/effects';
import {
    GET_KIND_FETCH,
} from '../../constants';
import { getKindSaga } from './getKindSaga';

export function* rootKindSaga() {
    yield takeEvery(GET_KIND_FETCH, getKindSaga);
}

import { takeEvery } from 'redux-saga/effects';
import {
    GET_GATEWAY_FETCH,
} from '../../constants';
import { getGatewaySaga } from './getGatewaySaga';

export function* rootGatewaySaga() {
    yield takeEvery(GET_GATEWAY_FETCH, getGatewaySaga);
}

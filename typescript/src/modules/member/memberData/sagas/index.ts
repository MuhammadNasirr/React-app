import { takeEvery } from 'redux-saga/effects';
import {
    GET_MEMBER_DATA_FETCH,
} from '../../../constants';
import { getMemberDataSaga } from './getMemberDataSaga';

export function* rootMemberDataSaga() {
    yield takeEvery(GET_MEMBER_DATA_FETCH, getMemberDataSaga);
}

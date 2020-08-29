import { takeEvery } from 'redux-saga/effects';
import {
    GET_MEMBER_DETAILS_FETCH,
} from '../../../constants';
import { getMemberDetailsSaga } from './getMemberDetailsSaga';

export function* rootMemberDetailsSaga() {
    yield takeEvery(GET_MEMBER_DETAILS_FETCH, getMemberDetailsSaga);
}

import { takeEvery } from 'redux-saga/effects';
import {
    GET_MEMBER_GROUP_FETCH,
} from '../../../constants';
import { getMemberGroupSaga } from './getMemberGroupSaga';

export function* rootMemberGroupSaga() {
    yield takeEvery(GET_MEMBER_GROUP_FETCH, getMemberGroupSaga);
}

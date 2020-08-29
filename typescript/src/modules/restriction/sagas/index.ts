import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_RESTRICTION_FETCH,
    DELETE_RESTRICTION_FETCH,
    EDIT_RESTRICTION_FETCH,
    GET_RESTRICTION_FETCH,
} from '../../constants';
import { addRestrictionSaga } from './addRestrictionSaga';
import { deleteRestrictionSaga } from './deleteRestrictionSaga';
import { editRestrictionSaga } from './editRestrictionSaga';
import { getRestrictionSaga } from './getRestrictionSaga';

export function* rootRestrictionSaga() {
    yield takeLatest(ADD_RESTRICTION_FETCH, addRestrictionSaga);
    yield takeEvery(GET_RESTRICTION_FETCH, getRestrictionSaga);
    yield takeEvery(EDIT_RESTRICTION_FETCH, editRestrictionSaga);
    yield takeEvery(DELETE_RESTRICTION_FETCH, deleteRestrictionSaga);
}

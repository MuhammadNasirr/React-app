import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
    ADD_PERMISSION_FETCH,
    DELETE_PERMISSION_FETCH,
    EDIT_PERMISSION_FETCH,
    GET_PERMISSIONS_FETCH,
} from '../../constants';
import { addPermissionSaga } from './addPermissionSaga';
import { deletePermissionSaga } from './deletePermissionSaga';
import { editPermissionSaga } from './editPermissionSaga';
import { getPermissionsSaga } from './getPermissionsSaga';

export function* rootPermissionSaga() {
    yield takeEvery(GET_PERMISSIONS_FETCH, getPermissionsSaga);
    yield takeEvery(DELETE_PERMISSION_FETCH, deletePermissionSaga);
    yield takeEvery(EDIT_PERMISSION_FETCH, editPermissionSaga);
    yield takeLatest(ADD_PERMISSION_FETCH, addPermissionSaga);
}

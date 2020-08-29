import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    changeEditMode,
    ChangeUserProfileFetch,
    getUserData,
} from '../../';
import { API, RequestOptions } from '../../../api';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* changeUserProfileSaga(action: ChangeUserProfileFetch) {
    try {
        yield call(API.put(requestOptions), `/admin/profiles`, action.payload);
        yield put(getUserData({ uid: action.payload.uid }));
        yield put(changeEditMode({ mode: false }));
    } catch (error) {
        yield put(changeEditMode({ mode: false }));
        yield put(alertPush({
            message: error.message,
            code: error.code,
            type: 'error',
        }));
    }
}

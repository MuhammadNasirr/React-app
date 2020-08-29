import { call, put, takeEvery } from 'redux-saga/effects';
import { verifyDocs } from '../api/user';
import { alertPush } from '../actions/alert';
import * as types from '../constants/actions';
import { sendDocumentsData, sendDocumentsError } from '../actions/document';


export function* sendDocumentsSaga(action) {
    try {
        const data = action.payload;
        const response = yield call(verifyDocs, data);
        const defaultMessage = 'success.documents.accepted';
        const { message = defaultMessage } = response;
        yield put(sendDocumentsData({ message }));
        yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    } catch (error) {
        yield put(sendDocumentsError(error));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
}

export function* rootSendDocumentsSaga() {
    yield takeEvery(types.SEND_DOCUMENTS_FETCH, sendDocumentsSaga);
}

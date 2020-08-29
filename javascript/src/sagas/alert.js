import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from '../constants/actions';
import { alertData } from '../actions/alert';
import * as userActions from '../actions/user';

export function* alertSaga(action) {
    if (action.payload.type === 'error') {
        switch (action.payload.code) {
            case 401:
                if (action.payload.message.indexOf('identity.session.not_active') > -1) {
                    yield put(userActions.resetUser());
                    yield put(alertData(action.payload));
                    return;
                } else {
                    if (action.payload.message.indexOf('authz.invalid_session') > -1) {
                        yield put(userActions.resetUser());
                    } else {
                        yield call(callAlertData, action);
                        break;
                    }
                }
                break;
            case 403:
                yield call(callAlertData, action);
                return;
            case 404:
                if (action.payload.message.indexOf('identity.session.not_found') > -1) {
                    yield put(userActions.resetUser());
                    yield put(alertData(action.payload));
                    return;
                }
                yield call(callAlertData, action);
                break;
            default:
                yield call(callAlertData, action);
        }
    } else {
        yield call(callAlertData, action);
    }
}

function* callAlertData(action) {
    yield put(alertData(action.payload));
    // yield delay(parseFloat(msAlertDisplayTime()));
    // yield put(alertDelete());
}

export function* handleAlertSaga() {
    yield takeEvery(types.ALERT_PUSH, alertSaga);
}

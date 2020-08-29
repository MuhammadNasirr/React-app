import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { currentUserReset, signInRequire2FA } from '../../';
import { msAlertDisplayTime } from '../../../api/config';
import { alertData, alertDelete, AlertPush } from '../actions';

export function* handleAlertSaga(action: AlertPush) {
    if (action.payload.type === 'error') {
        switch (action.payload.code) {
            case 401:
                if (action.payload.message.indexOf('authz.invalid_session') > -1) {
                    yield put(currentUserReset());
                    yield put(signInRequire2FA({ require2fa: false }));
                }
                break;

            default:
                break;
        }
    }
    yield put(alertData(action.payload));
    yield delay(parseFloat(msAlertDisplayTime()));
    yield put(alertDelete());
}

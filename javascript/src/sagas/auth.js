import { call, put, takeEvery } from 'redux-saga/effects';
import * as actions from '../actions/auth';
import * as userActions from '../actions/user';
import * as types from '../constants/actions';
import { push } from 'connected-react-router';
import { logoutUser, loginUser } from '../api/auth';
import { fetchUser } from './user';
import { setCookie } from '../utils/cookies';
import { alertPush } from '../actions/alert'

export function* fetchLogout() {
  try {
    yield call(logoutUser);
    sessionStorage.clear();
    yield put(userActions.resetUser());
  } catch (error) {
    yield put(actions.failLogout('Oups! Error occurs, please try again later.'));
    yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
  }
}

export function* fetchLogoutSaga() {
  yield takeEvery(types.FETCH_LOGOUT, fetchLogout);
}

export function* fetchLogin({ payload: { email, password, otp_code } }) {
  try {
    const res = yield call(loginUser, email, password, otp_code);
    if (res.data) {
      if (res.data.state === 'active') {
        yield put(userActions.setModal(false));
        yield call(fetchUser);
        yield put(push('/wallets'));
      }
      else {
        window.location = `/email-verification?email=${email}`
      }
    }
  } catch (error) {

    switch (error.code) {
      case 401:
        if (error.message.indexOf('identity.session.not_active') > -1) {
          setTimeout(() => {
            window.location = `/email-verification?email=${email}`
          }, 2000);
        }
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
        break;
      case 403:
        if (error.message.indexOf('identity.session.missing_otp') > -1) {
          setCookie('email', email, 2);
          setCookie('otp', true, 2);
          yield put(userActions.setModal(true));
        }
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
        break;
      default:
        yield put(actions.failLogin(error.message));
        yield put(alertPush({ message: error.message, code: error.code, type: 'error', open: true }));
    }
  }
}

export function* fetchLoginSaga() {
  yield takeEvery(types.FETCH_LOGIN, fetchLogin);
}

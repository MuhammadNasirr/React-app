import { call, put, takeEvery } from 'redux-saga/effects';
import { depthData, depthError } from '../actions/depth';
import * as types from '../constants/actions';
import { getDepth } from '../api/depth';

export function* fetchDepth(action) {
    try {
        const market = action.payload;
        const depth = yield call(getDepth, market);
        yield put(depthData(depth));
    }
    catch (e) {
        yield put(depthError(e));
    }
}

export function* fetchDepthSaga() {
    yield takeEvery(types.DEPTH_FETCH, fetchDepth);
}

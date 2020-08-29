
import { call, put } from 'redux-saga/effects';
import { klineData } from '../actions/tradeV2';
import { getKline } from '../api/tradeV2';

export function* handleKlineFetchSaga(action) {
    try {
        const { market, resolution, from, to, } = action.payload;
        const data = yield call(getKline, market, resolution, from, to);
        const convertedData = data.map(elem => {
            const [date, open, high, low, close, volume] = elem.map(e => {
                switch (typeof e) {
                    case 'number':
                        return e;
                    case 'string':
                        return Number.parseFloat(e);
                    default:
                        throw (new Error(`unexpected type ${typeof e}`));
                }
            });
            return {
                date: date * 1e3,
                open,
                high,
                low,
                close,
                volume,
            };
        });
        yield put(klineData(convertedData));
    }
    catch (error) {
    }
}


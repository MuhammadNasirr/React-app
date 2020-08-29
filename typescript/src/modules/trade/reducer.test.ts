import * as actions from './actions';
import { initialTradeState, tradesReducer } from './reducer';

describe('Trades reducer', () => {
    const tradesData = [
        {
            id: 0,
            price: '',
            amount: '',
            total: '',
            market: '',
            created_at: '',
            taker_type: '',
            maker_order_email: '',
            maker_uid: '',
            maker_fee_amount: '',
            maker_fee_currency: '',
            taker_order_email: '',
            taker_uid: '',
            taker_fee_currency: '',
            taker_fee_amount: ''
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialTradeState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(tradesReducer(initialTradeState, actions.getTrades(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.TradesSuccessPayload = {
            list: tradesData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialTradeState,
            loading: false
        };
        expect(tradesReducer(initialTradeState, actions.tradesData(payload))).toEqual(expectedState);
    });
});

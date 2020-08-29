import * as actions from './actions';
import { initialMarketsState, marketsReducer } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            id: '',
            name: '',
            base_unit: '',
            quote_unit: '',
            min_price: '',
            max_price: '',
            min_amount: '',
            amount_precision: 0,
            price_precision: 0,
            state: '',
            position: 0,
            created_at: '',
            updated_at: ''
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialMarketsState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(marketsReducer(initialMarketsState, actions.getMarkets(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.MarketsSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialMarketsState,
            loading: false
        };
        expect(marketsReducer(initialMarketsState, actions.marketsData(payload))).toEqual(expectedState);
    });
});

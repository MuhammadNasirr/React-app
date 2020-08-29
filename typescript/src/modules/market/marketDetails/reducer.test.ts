import * as actions from './actions';
import { initialMarketsDetailsState, marketDetailsReducer } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
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
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialMarketsDetailsState,
        };
        const payload = {
            id: ''
        };
        expect(marketDetailsReducer(initialMarketsDetailsState, actions.getMarketsDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.MarketsDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialMarketsDetailsState,
            loading: false
        };
        expect(marketDetailsReducer(initialMarketsDetailsState, actions.marketsDetailsData(payload))).toEqual(expectedState);
    });
});

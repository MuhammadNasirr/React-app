import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            id: ''
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getMarketsDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
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
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.marketsDetailsData(payload)).toEqual(expectedAction);
    });
});

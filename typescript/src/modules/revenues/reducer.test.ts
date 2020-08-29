import * as actions from './actions';
import { initialRevenuesState, revenuesReducer } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            id: 0,
            code: 0,
            currency: '',
            credit: '',
            debit: '',
            account_kind: '',
            rid: 0,
            reference_type: '',
            created_at: ''
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialRevenuesState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(revenuesReducer(initialRevenuesState, actions.getRevenues(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.RevenuesSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialRevenuesState,
            loading: false
        };
        expect(revenuesReducer(initialRevenuesState, actions.revenuesData(payload))).toEqual(expectedState);
    });
});

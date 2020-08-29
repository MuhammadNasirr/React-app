import * as actions from './actions';
import { initialLiabilitiesState, liabilitiesReducer } from './reducer';

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
            ...initialLiabilitiesState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(liabilitiesReducer(initialLiabilitiesState, actions.getLiabilities(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.LiabilitiesSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialLiabilitiesState,
            loading: false
        };
        expect(liabilitiesReducer(initialLiabilitiesState, actions.liabilitiesData(payload))).toEqual(expectedState);
    });
});

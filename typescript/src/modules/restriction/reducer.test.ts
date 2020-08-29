import * as actions from './actions';
import { initialRestrictionState, restrictionReducer } from './reducer';

describe('Fees reducer', () => {
    const feesData = [
        {
            id: 1,
            scope: '',
            value: '',
            state: '',
            taker: '',
            created_at: '',
            updated_at: ''
        }
    ];
    it('should handle GET_FEES_FETCH', () => {
        const expectedState = {
            ...initialRestrictionState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(restrictionReducer(initialRestrictionState, actions.getRestrictions(payload))).toEqual(expectedState);
    });

    it('should handle GET_FEES_SUCCESS', () => {
        const payload: actions.RestrictionSuccessPayload = {
            list: feesData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialRestrictionState,
            loading: false
        };
        expect(restrictionReducer(initialRestrictionState, actions.getRestrictionSuccess(payload))).toEqual(expectedState);
    });
});

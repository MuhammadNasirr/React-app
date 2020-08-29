import * as actions from './actions';
import { adjustmentsReducer, initialAdjustmentsState } from './reducer';

describe('Withdrawals reducer', () => {
    const withdrawalsData = [
        {
            id: 0,
            reason: '',
            description: '',
            category: '',
            amount: '',
            validator_uid: '',
            creator_uid: '',
            currency: '',
            asset: '',
            revenue: '',
            state: '',
            asset_account_code: 0,
            receiving_account_code: '',
            created_at: '',
            updated_at: ''
        }
    ];

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialAdjustmentsState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(adjustmentsReducer(initialAdjustmentsState, actions.getAdjustments(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.AdjustmentsSuccessPayload = {
            list: withdrawalsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialAdjustmentsState,
            loading: false
        };
        expect(adjustmentsReducer(initialAdjustmentsState, actions.adjustmentsData(payload))).toEqual(expectedState);
    });
});

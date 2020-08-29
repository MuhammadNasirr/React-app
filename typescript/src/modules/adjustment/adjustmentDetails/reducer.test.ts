import * as actions from './actions';
import { adjustmentDetailsReducer, initialAdjustmentDetailsState } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
        id: 0,
        reason: '',
        description: '',
        category: '',
        amount: '',
        creator_uid: '',
        currency: '',
        asset: '',
        liability: '',
        state: '',
        asset_account_code: 0,
        receiving_account_code: '',
        receiving_member_uid: '',
        created_at: '',
        updated_at: ''
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialAdjustmentDetailsState,
        };
        const payload = {
            id: 0
        };
        expect(adjustmentDetailsReducer(initialAdjustmentDetailsState, actions.getAdjustmentDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.AdjustmentDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialAdjustmentDetailsState,
            loading: false
        };
        expect(adjustmentDetailsReducer(initialAdjustmentDetailsState, actions.adjustmentDetailsData(payload))).toEqual(expectedState);
    });
});

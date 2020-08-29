import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            id: 0
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getAdjustmentDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
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
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.adjustmentDetailsData(payload)).toEqual(expectedAction);
    });
});

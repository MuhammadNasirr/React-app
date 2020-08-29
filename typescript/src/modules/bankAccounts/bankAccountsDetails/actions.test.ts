import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            id: 0
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getBankAccountsDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
                id: 0,
                clabe_code: '',
                bank: '',
                beneficiary: '',
                state: '',
                created_at: '',
                updated_at: ''
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.bankAccountsDetailsData(payload)).toEqual(expectedAction);
    });
});

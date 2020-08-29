import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            tid: ''
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getDepositDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
                id: 1,
                tid: '',
                uid: '',
                currency: '',
                type: '',
                amount: '',
                fee: '',
                txid: '',
                state: '',
                confirmations: 1,
                created_at: '',
                updated_at: '',
                completed_at: '',
                member: 1,
                email: ''
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.depositDetailsData(payload)).toEqual(expectedAction);
    });
});

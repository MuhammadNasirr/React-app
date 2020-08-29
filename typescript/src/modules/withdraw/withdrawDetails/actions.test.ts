import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            id: 0
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getWithdrawDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
                id: 1,
                tid: '',
                uid: '',
                rid: '',
                note: '',
                account: 0,
                block_number: '',
                sum: '',
                currency: '',
                type: '',
                amount: '',
                fee: '',
                blockchain_txid: '',
                state: '',
                confirmations: 1,
                created_at: '',
                updated_at: '',
                done_at: '',
                member: 1,
                email: '',
                beneficiary: {}
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.withdrawDetailsData(payload)).toEqual(expectedAction);
    });
});

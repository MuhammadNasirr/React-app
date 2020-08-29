import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            id: 0
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getBlockchainDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
                id: 1,
                key: '',
                name: '',
                client: '',
                server: '',
                height: 1,
                explorer_address: '',
                explorer_transaction: '',
                min_confirmations: 0,
                status: '',
                created_at: '',
                updated_at: ''
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.blockchainDetailsData(payload)).toEqual(expectedAction);
    });
});

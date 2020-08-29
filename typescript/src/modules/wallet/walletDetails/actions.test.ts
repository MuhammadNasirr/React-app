import * as actions from './actions';

describe('Deposits actions', () => {
    it('should check getDeposits action creator', () => {
        const payload = {
            id: 0
        };
        const expectedAction = { type: 'GET_DEPOSITS_FETCH', payload };
        expect(actions.getWalletDetails(payload)).toEqual(expectedAction);
    });

    it('should check getDeposits action creator', () => {
        const payload = {
            data: {
                id: 0,
                name: '',
                kind: '',
                currency: '',
                address: '',
                gateway: '',
                max_balance: '',
                blockchain_key: '',
                status: '',
                settings: { uri: '', secret: '' },
                created_at: '',
                updated_at: '',
            }
        };
        const expectedAction = { type: 'GET_DEPOSITS_SUCCESS', payload };
        expect(actions.walletDetailsData(payload)).toEqual(expectedAction);
    });
});

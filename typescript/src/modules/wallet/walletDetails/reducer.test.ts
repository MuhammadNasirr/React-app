import * as actions from './actions';
import { initialWalletDetailsState, walletDetailsReducer } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
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
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialWalletDetailsState,
        };
        const payload = {
            id: 0
        };
        expect(walletDetailsReducer(initialWalletDetailsState, actions.getWalletDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.WalletDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialWalletDetailsState,
            loading: false
        };
        expect(walletDetailsReducer(initialWalletDetailsState, actions.walletDetailsData(payload))).toEqual(expectedState);
    });
});

import * as actions from './actions';
import { blockchainDetailsReducer, initialBlockchainDetailsState } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
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
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialBlockchainDetailsState,
        };
        const payload = {
            id: 0
        };
        expect(blockchainDetailsReducer(initialBlockchainDetailsState, actions.getBlockchainDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.BlockchainDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialBlockchainDetailsState,
            loading: false
        };
        expect(blockchainDetailsReducer(initialBlockchainDetailsState, actions.blockchainDetailsData(payload))).toEqual(expectedState);
    });
});

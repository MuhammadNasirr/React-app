import * as actions from './actions';
import { depositDetailsReducer, initialDepositDetailsState } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
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
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialDepositDetailsState,
        };
        const payload = {
            tid: ''
        };
        expect(depositDetailsReducer(initialDepositDetailsState, actions.getDepositDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.DepositDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialDepositDetailsState,
            loading: false
        };
        expect(depositDetailsReducer(initialDepositDetailsState, actions.depositDetailsData(payload))).toEqual(expectedState);
    });
});

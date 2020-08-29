import * as actions from './actions';
import { initialWithdrawDetailsState, withdrawDetailsReducer } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
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
        beneficiary:{}
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialWithdrawDetailsState,
        };
        const payload = {
            id: 0
        };
        expect(withdrawDetailsReducer(initialWithdrawDetailsState, actions.getWithdrawDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.WithdrawDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialWithdrawDetailsState,
            loading: false
        };
        expect(withdrawDetailsReducer(initialWithdrawDetailsState, actions.withdrawDetailsData(payload))).toEqual(expectedState);
    });
});

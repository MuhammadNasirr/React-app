import * as actions from './actions';
import { bankAccountsDetailsReducer, initialBankAccountsDetailsState } from './reducer';

describe('Withdrawals reducer', () => {
    const depositData =
    {
        id: 0,
        clabe_code: '',
        bank: '',
        beneficiary: '',
        state: '',
        created_at: '',
        updated_at: ''
    };

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialBankAccountsDetailsState,
        };
        const payload = {
            id: 0
        };
        expect(bankAccountsDetailsReducer(initialBankAccountsDetailsState, actions.getBankAccountsDetails(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.BankAccountsDetailsSuccessPayload = {
            data: depositData,
        };
        const expectedState = {
            ...initialBankAccountsDetailsState,
            loading: false
        };
        expect(bankAccountsDetailsReducer(initialBankAccountsDetailsState, actions.bankAccountsDetailsData(payload))).toEqual(expectedState);
    });
});

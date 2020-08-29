import * as actions from './actions';
import { bankAccountsReducer, initialBankAccountsState } from './reducer';

describe('Withdrawals reducer', () => {
    const withdrawalsData = [
        {
            id: 0,
            reason: '',
            description: '',
            category: '',
            amount: '',
            validator_uid: '',
            creator_uid: '',
            currency: '',
            asset: '',
            revenue: '',
            state: '',
            asset_account_code: 0,
            receiving_account_code: '',
            created_at: '',
            updated_at: ''
        }
    ];

    it('should handle GET_WITHDRAWALS_FETCH', () => {
        const expectedState = {
            ...initialBankAccountsState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(bankAccountsReducer(initialBankAccountsState, actions.getBankAccounts(payload))).toEqual(expectedState);
    });

    it('should handle GET_WITHDRAWALS_SUCCESS', () => {
        const payload: actions.BankAccountsSuccessPayload = {
            list: withdrawalsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialBankAccountsState,
            loading: false
        };
        expect(bankAccountsReducer(initialBankAccountsState, actions.bankAccountsData(payload))).toEqual(expectedState);
    });
});

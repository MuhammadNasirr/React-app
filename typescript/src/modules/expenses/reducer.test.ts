import * as actions from './actions';
import { expensesReducer, initialExpensesState } from './reducer';

describe('Trades reducer', () => {
    const assetsData = [
        {
            id: 0,
            code: 0,
            currency: '',
            credit: '',
            debit: '',
            account_kind: '',
            rid: 0,
            reference_type: '',
            created_at: ''
        }
    ];
    it('should handle GET_TRADES_FETCH', () => {
        const expectedState = {
            ...initialExpensesState,
        };
        const payload = {
            page: 0,
            limit: 10
        };
        expect(expensesReducer(initialExpensesState, actions.getExpenses(payload))).toEqual(expectedState);
    });

    it('should handle GET_TRADES_SUCCESS', () => {
        const payload: actions.ExpensesSuccessPayload = {
            list: assetsData,
            page: 1,
            total: 0
        };
        const expectedState = {
            ...initialExpensesState,
            loading: false
        };
        expect(expensesReducer(initialExpensesState, actions.expensesData(payload))).toEqual(expectedState);
    });
});

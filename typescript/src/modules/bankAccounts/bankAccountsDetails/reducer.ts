import {
    ACTION_BANK_ACCOUNTS_FETCH,
    ADD_BANK_ACCOUNTS_FETCH,
    GET_BANK_ACCOUNTS_DETAILS_FETCH,
    GET_BANK_ACCOUNTS_DETAILS_SUCCESS
} from '../../constants';
import { BankAccountsDetailsAction } from './actions';

export interface BankAccountsDetailsState {
    // tslint:disable-next-line:no-any
    data: any;
    loading: boolean;
    actionDone: boolean;
    bankAccountAdded: boolean;
}

export const initialBankAccountsDetailsState: BankAccountsDetailsState = {
    data: {},
    loading: true,
    actionDone: false,
    bankAccountAdded: false
};

export const bankAccountsDetailsReducer = (state = initialBankAccountsDetailsState, action: BankAccountsDetailsAction) => {
    switch (action.type) {
        case GET_BANK_ACCOUNTS_DETAILS_FETCH:
            return {
                ...state
            };
        case GET_BANK_ACCOUNTS_DETAILS_SUCCESS:
            return {
                ...state,
                data: action.payload.data,
                loading: false,
            };
        case ACTION_BANK_ACCOUNTS_FETCH:
            return {
                ...state,
                actionDone: true
            };
        case ADD_BANK_ACCOUNTS_FETCH:
            return {
                ...state,
                bankAccountAdded: true
            };
        default:
            return {
                ...state,
            };
    }
};

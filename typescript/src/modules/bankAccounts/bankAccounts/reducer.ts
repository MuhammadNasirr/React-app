import {
    GET_BANK_ACCOUNTS_FETCH,
    GET_BANK_ACCOUNTS_SUCCESS
} from '../../constants';
import { BankAccountsAction } from './actions';

export interface BankAccountsState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialBankAccountsState: BankAccountsState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const bankAccountsReducer = (state = initialBankAccountsState, action: BankAccountsAction) => {
    switch (action.type) {
        case GET_BANK_ACCOUNTS_FETCH:
            return {
                ...state
            };
        case GET_BANK_ACCOUNTS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        default:
            return {
                ...state,
            };
    }
};

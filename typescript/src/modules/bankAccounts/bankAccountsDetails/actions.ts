import {
    ACTION_BANK_ACCOUNTS_FETCH,
    ADD_BANK_ACCOUNTS_FETCH,
    GET_BANK_ACCOUNTS_DETAILS_FETCH,
    GET_BANK_ACCOUNTS_DETAILS_SUCCESS,
} from '../../constants';

interface BankAccountsDetailsFetchPayload {
    id: number;
}

export interface BankAccountsDetailsSuccessPayload {
    data: BankAccountsDetailsDataInterface;
}

export interface BankAccountsDetailsDataInterface {
    id: number;
    clabe_code: string;
    bank: string;
    beneficiary: string;
    state: string;
    created_at: string;
    updated_at: string;
}

export interface ActionBankAccountsFetchPayload {
    id: number;
    action: string;
}

export interface AddBankAccountsFetchPayload {
    account_number: string;
    clabe_code: string;
    beneficiary: string;
    bank: string;
    id?: number;
}

export interface GetBankAccountsDetailsFetch {
    type: typeof GET_BANK_ACCOUNTS_DETAILS_FETCH;
    payload: BankAccountsDetailsFetchPayload;
}

export interface GetBankAccountsDetailsSuccess {
    type: typeof GET_BANK_ACCOUNTS_DETAILS_SUCCESS;
    payload: BankAccountsDetailsSuccessPayload;
}

export interface ActionBankAccountsFetch {
    type: typeof ACTION_BANK_ACCOUNTS_FETCH;
    payload: ActionBankAccountsFetchPayload;
}

export interface AddBankAccountsFetch {
    type: typeof ADD_BANK_ACCOUNTS_FETCH;
    payload: AddBankAccountsFetchPayload;
}

export type BankAccountsDetailsAction =
    GetBankAccountsDetailsFetch
    | GetBankAccountsDetailsSuccess
    | ActionBankAccountsFetch
    | AddBankAccountsFetch;

export const getBankAccountsDetails = (payload: BankAccountsDetailsFetchPayload): GetBankAccountsDetailsFetch => ({
    type: GET_BANK_ACCOUNTS_DETAILS_FETCH,
    payload,
});

export const bankAccountsDetailsData = (payload: GetBankAccountsDetailsSuccess['payload']): GetBankAccountsDetailsSuccess => ({
    type: GET_BANK_ACCOUNTS_DETAILS_SUCCESS,
    payload,
});

export const actionBankAccounts = (payload: ActionBankAccountsFetch['payload']): ActionBankAccountsFetch => ({
    type: ACTION_BANK_ACCOUNTS_FETCH,
    payload,
});

export const addBankAccounts = (payload: AddBankAccountsFetch['payload']): AddBankAccountsFetch => ({
    type: ADD_BANK_ACCOUNTS_FETCH,
    payload,
});

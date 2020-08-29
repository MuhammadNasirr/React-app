import {
    GET_BANK_ACCOUNTS_FETCH,
    GET_BANK_ACCOUNTS_SUCCESS
} from '../../constants';

interface BankAccountsFetchPayload {
    page: number;
    limit: number;
    uid?: string;
    ordering?: string;
    currency?: string;
    state?: string;
    category?: string;
    from?: string | null;
    to?: string | null;
}

export interface BankAccountsSuccessPayload {
    list: BankAccountsDataInterface[];
    page: number;
    total: number;
}

export interface BankAccountsDataInterface {
    id: number;
    reason: string;
    description: string;
    category: string;
    amount: string;
    validator_uid: string;
    creator_uid: string;
    currency: string;
    // tslint:disable-next-line:no-any
    asset: any;
    // tslint:disable-next-line:no-any
    revenue: any;
    state: string;
    asset_account_code: number;
    receiving_account_code: string;
    created_at: string;
    updated_at: string;
}

export interface GetBankAccountsFetch {
    type: typeof GET_BANK_ACCOUNTS_FETCH;
    payload: BankAccountsFetchPayload;
}

export interface GetBankAccountsSuccess {
    type: typeof GET_BANK_ACCOUNTS_SUCCESS;
    payload: BankAccountsSuccessPayload;
}

export type BankAccountsAction =
    GetBankAccountsFetch
    | GetBankAccountsSuccess;

export const getBankAccounts = (payload: BankAccountsFetchPayload): GetBankAccountsFetch => ({
    type: GET_BANK_ACCOUNTS_FETCH,
    payload,
});

export const bankAccountsData = (payload: GetBankAccountsSuccess['payload']): GetBankAccountsSuccess => ({
    type: GET_BANK_ACCOUNTS_SUCCESS,
    payload,
});

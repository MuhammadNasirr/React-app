import {
    GET_WITHDRAWALS_FETCH,
    GET_WITHDRAWALS_MXN_FETCH,
    GET_WITHDRAWALS_MXN_SUCCESS,
    GET_WITHDRAWALS_SUCCESS,
    UPDATE_WITHDRAW_MXN_FETCH
} from '../../constants';

interface WithdrawalsFetchPayload {
    page: number;
    limit: number;
    uid?: string;
    type?: string;
    ordering?: string;
    id?: string;
    rid?: string;
    state?: string;
    currency?: string;
    txid?: string;
    tid?: string;
    confirmations?: string;
    from?: string | null;
    to?: string | null;
}

export interface WithdrawalsSuccessPayload {
    list: WithdrawalsDataInterface[];
    page: number;
    total: number;
}

interface WithdrawalsMXNFetchPayload {
    page: number;
    limit: number;
    state?: string;
}

export interface WithdrawalsMXNSuccessPayload {
    list: WithdrawalsMXNDataInterface[];
    page: number;
    total: number;
}

export interface WithdrawalsMXNDataInterface {
    id: number;
    total: string;
    price: string;
    amount: string;
    state: string;
    note: string;
    created_at: string;
    updated_at: string;
    completed_at?: string;
}

export interface GetWithdrawalsMXNFetch {
    type: typeof GET_WITHDRAWALS_MXN_FETCH;
    payload: WithdrawalsMXNFetchPayload;
}

export interface GetWithdrawalsMXNSuccess {
    type: typeof GET_WITHDRAWALS_MXN_SUCCESS;
    payload: WithdrawalsMXNSuccessPayload;
}


interface UpdateWithdrawMXNFetchPayload {
    id: number;
    amount: number;
    price: number;
}

export interface WithdrawalsDataInterface {
    id: number;
    currency: string;
    type: string;
    amount: string;
    fee: string;
    blockchain_txid: string;
    rid: string;
    state: string;
    confirmations: number;
    note: string;
    created_at: string;
    updated_at: string;
    done_at: string;
    member: number;
    uid: string;
    email: string;
    account: number;
    block_number: number;
    sum: string;
    tid: string;
    completed_at?: string;
}

export interface GetWithdrawalsFetch {
    type: typeof GET_WITHDRAWALS_FETCH;
    payload: WithdrawalsFetchPayload;
}

export interface GetWithdrawalsSuccess {
    type: typeof GET_WITHDRAWALS_SUCCESS;
    payload: WithdrawalsSuccessPayload;
}


export interface UpdateWithdrawMXNFetch {
    type: typeof UPDATE_WITHDRAW_MXN_FETCH;
    payload: UpdateWithdrawMXNFetchPayload;
}

export type WithdrawalsAction =
    GetWithdrawalsFetch
    | GetWithdrawalsSuccess;

export type WithdrawalsMXNAction =
    GetWithdrawalsMXNFetch
    | GetWithdrawalsMXNSuccess
    |UpdateWithdrawMXNFetch;

export const getWithdrawals = (payload: WithdrawalsFetchPayload): GetWithdrawalsFetch => ({
    type: GET_WITHDRAWALS_FETCH,
    payload,
});

export const WithdrawalsData = (payload: GetWithdrawalsSuccess['payload']): GetWithdrawalsSuccess => ({
    type: GET_WITHDRAWALS_SUCCESS,
    payload,
});

export const getWithdrawalsMXN = (payload: WithdrawalsMXNFetchPayload): GetWithdrawalsMXNFetch => ({
    type: GET_WITHDRAWALS_MXN_FETCH,
    payload,
});

export const WithdrawalsDataMXN = (payload: GetWithdrawalsMXNSuccess['payload']): GetWithdrawalsMXNSuccess => ({
    type: GET_WITHDRAWALS_MXN_SUCCESS,
    payload,
});

export const updateWithdrawMXN = (payload: UpdateWithdrawMXNFetch['payload']): UpdateWithdrawMXNFetch => ({
    type: UPDATE_WITHDRAW_MXN_FETCH,
    payload,
});

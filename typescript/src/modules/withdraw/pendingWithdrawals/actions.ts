import {
    GET_PENDING_WITHDRAWALS_FETCH,
    GET_PENDING_WITHDRAWALS_MXN_FETCH,
    GET_PENDING_WITHDRAWALS_MXN_SUCCESS,
    GET_PENDING_WITHDRAWALS_SUCCESS,
    UPDATE_WITHDRAW_PENDING_MXN_FETCH
} from '../../constants';


interface PendingWithdrawalsMXNFetchPayload {
    page: number;
    limit: number;
    state?: string;
}

interface PendingWithdrawalsFetchPayload {
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

interface UpdateWithdrawPendingMXNFetchPayload {
    id: number;
    amount: number;
    price: number;
}

export interface UpdateWithdrawPendingMXNFetch {
    type: typeof UPDATE_WITHDRAW_PENDING_MXN_FETCH;
    payload: UpdateWithdrawPendingMXNFetchPayload;
}

export interface PendingWithdrawalsSuccessPayload {
    list: PendingWithdrawalsDataInterface[];
    page: number;
    total: number;
}

export interface PendingWithdrawalsMXNSuccessPayload {
    page: number;
    total: number;
    list: PendingWithdrawalsMXNDataInterface[];
}

export interface PendingWithdrawalsMXNDataInterface {
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

export interface PendingWithdrawalsDataInterface {
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

export interface GetPendingWithdrawalsFetch {
    type: typeof GET_PENDING_WITHDRAWALS_FETCH;
    payload: PendingWithdrawalsFetchPayload;
}

export interface GetPendingWithdrawalsMXNFetch {
    type: typeof GET_PENDING_WITHDRAWALS_MXN_FETCH;
    payload: PendingWithdrawalsMXNFetchPayload;
}

export interface GetPendingWithdrawalsSuccess {
    type: typeof GET_PENDING_WITHDRAWALS_SUCCESS;
    payload: PendingWithdrawalsSuccessPayload;
}

export interface GetPendingWithdrawalsMXNSuccess {
    type: typeof GET_PENDING_WITHDRAWALS_MXN_SUCCESS;
    payload: PendingWithdrawalsMXNSuccessPayload;
}

export type PendingWithdrawalsAction =
    GetPendingWithdrawalsFetch
    | GetPendingWithdrawalsSuccess;

export type PendingWithdrawalsMXNAction =
    GetPendingWithdrawalsMXNFetch
    | GetPendingWithdrawalsMXNSuccess
    |UpdateWithdrawPendingMXNFetch;

export const getPendingWithdrawals = (payload: PendingWithdrawalsFetchPayload): GetPendingWithdrawalsFetch => ({
    type: GET_PENDING_WITHDRAWALS_FETCH,
    payload,
});

export const pendingWithdrawalsData = (payload: GetPendingWithdrawalsSuccess['payload']): GetPendingWithdrawalsSuccess => ({
    type: GET_PENDING_WITHDRAWALS_SUCCESS,
    payload,
});

export const getPendingWithdrawalsMXN = (payload: PendingWithdrawalsMXNFetchPayload): GetPendingWithdrawalsMXNFetch => ({
    type: GET_PENDING_WITHDRAWALS_MXN_FETCH,
    payload,
});

export const pendingWithdrawalsDataMXN = (payload: GetPendingWithdrawalsMXNSuccess['payload']): GetPendingWithdrawalsMXNSuccess => ({
    type: GET_PENDING_WITHDRAWALS_MXN_SUCCESS,
    payload,
});

export const updateWithdrawPendingMXN = (payload: UpdateWithdrawPendingMXNFetch['payload']): UpdateWithdrawPendingMXNFetch => ({
    type: UPDATE_WITHDRAW_PENDING_MXN_FETCH,
    payload,
});

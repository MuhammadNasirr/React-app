import {
    GET_DEPOSITS_FETCH,
    GET_DEPOSITS_MXN_FETCH,
    GET_DEPOSITS_MXN_SUCCESS,
    GET_DEPOSITS_SUCCESS,
    UPDATE_DEPOSIT_MXN_FETCH,
} from '../../constants';

interface DepositsMXNFetchPayload {
    page: number;
    limit: number;
    state?: string;
}

interface UpdateDepositMXNFetchPayload {
    id: number;
    amount: number;
    price: number;
}

export interface DepositsMXNSuccessPayload {
    list: DepositsMXNDataInterface[];
    page: number;
    total: number;
}

export interface DepositsMXNDataInterface {
    id: number;
    page: number;
    limit: number;
    total: string;
    price: string;
    amount: string;
    state: string;
    created_at: string;
    updated_at: string;
    completed_at?: string;
}

export interface GetDepositsMXNFetch {
    type: typeof GET_DEPOSITS_MXN_FETCH;
    payload: DepositsMXNFetchPayload;
}

export interface GetDepositsMXNSuccess {
    type: typeof GET_DEPOSITS_MXN_SUCCESS;
    payload: DepositsMXNSuccessPayload;
}

interface DepositsFetchPayload {
    page: number;
    limit: number;
    uid?: string;
    ordering?: string;
    email?: string;
    currency?: string;
    state?: string;
    id?: string;
    txid?: string;
    address?: string;
    tid?: string;
    type?: string;
    from?: string | null;
    to?: string | null;
}

export interface DepositsSuccessPayload {
    list: DepositsDataInterface[];
    page: number;
    total: number;
}

export interface DepositsDataInterface {
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
    completed_at: string;
}

export interface GetDepositsFetch {
    type: typeof GET_DEPOSITS_FETCH;
    payload: DepositsFetchPayload;
}

export interface GetDepositsSuccess {
    type: typeof GET_DEPOSITS_SUCCESS;
    payload: DepositsSuccessPayload;
}

export interface UpdateDepositMXNFetch {
    type: typeof UPDATE_DEPOSIT_MXN_FETCH;
    payload: UpdateDepositMXNFetchPayload;
}

export type DepositsAction =
    GetDepositsFetch
    | GetDepositsSuccess;

export type DepositsMXNAction =
    GetDepositsMXNFetch
    | GetDepositsMXNSuccess
    | UpdateDepositMXNFetch;


export const getDeposits = (payload: DepositsFetchPayload): GetDepositsFetch => ({
    type: GET_DEPOSITS_FETCH,
    payload,
});

export const depositsData = (payload: GetDepositsSuccess['payload']): GetDepositsSuccess => ({
    type: GET_DEPOSITS_SUCCESS,
    payload,
});


export const getDepositsMXN = (payload: DepositsMXNFetchPayload): GetDepositsMXNFetch => ({
    type: GET_DEPOSITS_MXN_FETCH,
    payload,
});

export const DepositsDataMXN = (payload: GetDepositsMXNSuccess['payload']): GetDepositsMXNSuccess => ({
    type: GET_DEPOSITS_MXN_SUCCESS,
    payload,
});

export const updateDepositMXN = (payload: UpdateDepositMXNFetch['payload']): UpdateDepositMXNFetch => ({
    type: UPDATE_DEPOSIT_MXN_FETCH,
    payload,
});

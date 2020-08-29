import {
    ACTION_DEPOSIT_FETCH,
    ADD_DEPOSIT_FETCH,
    GET_DEPOSIT_DETAILS_FETCH,
    GET_DEPOSIT_DETAILS_SUCCESS,
} from '../../constants';

interface DepositDetailsFetchPayload {
    id?: number;
    action?: string;
    tid?: string | undefined;
    price?: number | undefined;
    mxn?: boolean;
}

export interface DepositDetailsSuccessPayload {
    data: DepositDetailsDataInterface;
}

export interface DepositDetailsDataInterface {
    id: number;
    tid: string;
    uid: string;
    currency: string;
    type: string;
    amount: string;
    fee: string;
    txid: string;
    state: string;
    price?: number;
    currency_src?: string;
    currency_dst?: string;
    total?: number;
    confirmations: number;
    created_at: string;
    updated_at: string;
    completed_at: string;
    member: number;
    email: string;
}

export interface ActionDepositFetchPayload {
    id: number;
    action: string;
    tid?: string | undefined;
    mxn?: boolean;
    price?: number | undefined;
}

export interface AddDepositFetchPayload {
    currency: string;
    amount: number;
    uid: string;
}

export interface GetDepositDetailsFetch {
    type: typeof GET_DEPOSIT_DETAILS_FETCH;
    payload: DepositDetailsFetchPayload;
}

export interface GetDepositDetailsSuccess {
    type: typeof GET_DEPOSIT_DETAILS_SUCCESS;
    payload: DepositDetailsSuccessPayload;
}

export interface ActionDepositFetch {
    type: typeof ACTION_DEPOSIT_FETCH;
    payload: ActionDepositFetchPayload;
}

export interface AddDepositFetch {
    type: typeof ADD_DEPOSIT_FETCH;
    payload: AddDepositFetchPayload;
}

export type DepositDetailsAction =
    GetDepositDetailsFetch
    | GetDepositDetailsSuccess
    | ActionDepositFetch
    | AddDepositFetch;

export const getDepositDetails = (payload: DepositDetailsFetchPayload): GetDepositDetailsFetch => ({
    type: GET_DEPOSIT_DETAILS_FETCH,
    payload,
});

export const depositDetailsData = (payload: GetDepositDetailsSuccess['payload']): GetDepositDetailsSuccess => ({
    type: GET_DEPOSIT_DETAILS_SUCCESS,
    payload,
});

export const actionDeposit = (payload: ActionDepositFetch['payload']): ActionDepositFetch => ({
    type: ACTION_DEPOSIT_FETCH,
    payload,
});

export const addDeposit = (payload: AddDepositFetch['payload']): AddDepositFetch => ({
    type: ADD_DEPOSIT_FETCH,
    payload,
});

import {
    ACTION_WITHDRAW_FETCH,
    GET_WITHDRAW_DETAILS_FETCH,
    GET_WITHDRAW_DETAILS_SUCCESS,
    PROCESS_WITHDRAW_FIAT_FETCH
} from '../../constants';

interface WithdrawDetailsFetchPayload {
    id: number;
    mxn?: boolean;
}

export interface WithdrawDetailsSuccessPayload {
    data: WithdrawDetailsDataInterface;
}

export interface WithdrawDetailsDataInterface {
    price?: string;
    total?: number;
    id: number;
    tid: string;
    uid: string;
    rid: string;
    note: string;
    account: number;
    block_number: string;
    sum: string;
    currency: string;
    type: string;
    amount: string;
    fee: string;
    blockchain_txid: string;
    state: string;
    confirmations: number;
    created_at: string;
    updated_at: string;
    done_at: string;
    member: number;
    email: string;
    // tslint:disable-next-line:no-any
    beneficiary: any;
}

export interface ActionWithdrawFetchPayload {
    id: number;
    action: string;
    txid?: string;
    mxn?: boolean;
}

export interface ActionWithdrawFiatFetchPayload {
    id: number;
    mxn?: boolean;
}

export interface GetWithdrawDetailsFetch {
    type: typeof GET_WITHDRAW_DETAILS_FETCH;
    payload: WithdrawDetailsFetchPayload;
}

export interface GetWithdrawDetailsSuccess {
    type: typeof GET_WITHDRAW_DETAILS_SUCCESS;
    payload: WithdrawDetailsSuccessPayload;
}

export interface ActionWithdrawFetch {
    type: typeof ACTION_WITHDRAW_FETCH;
    payload: ActionWithdrawFetchPayload;
}

export interface ProcessWithdrawFiatFetch {
    type: typeof PROCESS_WITHDRAW_FIAT_FETCH;
    payload: ActionWithdrawFiatFetchPayload;
}

export type WithdrawDetailsAction =
    GetWithdrawDetailsFetch
    | GetWithdrawDetailsSuccess
    | ActionWithdrawFetch
    | ProcessWithdrawFiatFetch;

export const getWithdrawDetails = (payload: WithdrawDetailsFetchPayload): GetWithdrawDetailsFetch => ({
    type: GET_WITHDRAW_DETAILS_FETCH,
    payload,
});

export const withdrawDetailsData = (payload: GetWithdrawDetailsSuccess['payload']): GetWithdrawDetailsSuccess => ({
    type: GET_WITHDRAW_DETAILS_SUCCESS,
    payload,
});

export const actionWithdraw = (payload: ActionWithdrawFetch['payload']): ActionWithdrawFetch => ({
    type: ACTION_WITHDRAW_FETCH,
    payload,
});

export const processWithdrawFiat = (payload: ProcessWithdrawFiatFetch['payload']): ProcessWithdrawFiatFetch => ({
    type: PROCESS_WITHDRAW_FIAT_FETCH,
    payload,
});

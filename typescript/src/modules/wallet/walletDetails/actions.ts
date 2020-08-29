import {
    ADD_WALLETS_FETCH,
    EDIT_WALLETS_FETCH,
    GET_WALLETS_DETAILS_FETCH,
    GET_WALLETS_DETAILS_SUCCESS,
} from '../../constants';

interface WalletDetailsFetchPayload {
    id: number;
}

export interface WalletDetailsSuccessPayload {
    data: WalletDetailsDataInterface;
}

export interface WalletDetailsDataInterface {
    id: number;
    name: string;
    kind: string;
    currency: string;
    address: string;
    gateway: string;
    max_balance: string;
    blockchain_key: string;
    status: string;
    // tslint:disable-next-line:no-any
    settings?: any;
    created_at: string;
    updated_at: string;
}

export interface AddWalletFetchPayload {
    name: string;
    kind: string;
    currency: string;
    address: string;
    gateway: string;
    max_balance: string;
    blockchain_key: string;
    status: string;
    // tslint:disable-next-line:no-any
    settings?: any;
}

export interface EditWalletFetchPayload {
    id: number;
    name: string;
    kind: string;
    currency: string;
    address: string;
    gateway: string;
    max_balance: string;
    blockchain_key: string;
    status: string;
    // tslint:disable-next-line:no-any
    settings?: any;
}

export interface GetWalletDetailsFetch {
    type: typeof GET_WALLETS_DETAILS_FETCH;
    payload: WalletDetailsFetchPayload;
}

export interface GetWalletDetailsSuccess {
    type: typeof GET_WALLETS_DETAILS_SUCCESS;
    payload: WalletDetailsSuccessPayload;
}

export interface AddWalletFetch {
    type: typeof ADD_WALLETS_FETCH;
    payload: AddWalletFetchPayload;
}

export interface EditWalletFetch {
    type: typeof EDIT_WALLETS_FETCH;
    payload: EditWalletFetchPayload;
}

export type WalletDetailsAction =
    GetWalletDetailsFetch
    | GetWalletDetailsSuccess
    | AddWalletFetch
    | EditWalletFetch;

export const getWalletDetails = (payload: WalletDetailsFetchPayload): GetWalletDetailsFetch => ({
    type: GET_WALLETS_DETAILS_FETCH,
    payload,
});

export const walletDetailsData = (payload: GetWalletDetailsSuccess['payload']): GetWalletDetailsSuccess => ({
    type: GET_WALLETS_DETAILS_SUCCESS,
    payload,
});

export const addWallet = (payload: AddWalletFetch['payload']): AddWalletFetch => ({
    type: ADD_WALLETS_FETCH,
    payload,
});

export const editWallet = (payload: EditWalletFetch['payload']): EditWalletFetch => ({
    type: EDIT_WALLETS_FETCH,
    payload,
});

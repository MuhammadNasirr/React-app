import {
    GET_WALLETS_FETCH,
    GET_WALLETS_SUCCESS
} from '../../constants';

interface WalletsFetchPayload {
    page: number;
    limit: number;
}

export interface WalletsSuccessPayload {
    list: WalletsDataInterface[];
    page: number;
    total: number;
}

export interface WalletsDataInterface {
    id: number;
    name: string;
    kind: string;
    currency: string;
    address: string;
    gateway: string;
    max_balance: string;
    blockchain_key: string;
    status: string;
    settings: object;
    created_at: string;
    updated_at: string;
}

export interface GetWalletsFetch {
    type: typeof GET_WALLETS_FETCH;
    payload: WalletsFetchPayload;
}

export interface GetWalletsSuccess {
    type: typeof GET_WALLETS_SUCCESS;
    payload: WalletsSuccessPayload;
}

export type WalletsAction =
    GetWalletsFetch
    | GetWalletsSuccess;

export const getWallets = (payload: WalletsFetchPayload): GetWalletsFetch => ({
    type: GET_WALLETS_FETCH,
    payload,
});

export const walletsData = (payload: GetWalletsSuccess['payload']): GetWalletsSuccess => ({
    type: GET_WALLETS_SUCCESS,
    payload,
});

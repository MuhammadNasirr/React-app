import {
    ADD_BLOCKCHAINS_FETCH,
    EDIT_BLOCKCHAINS_FETCH,
    GET_BLOCKCHAINS_DETAILS_FETCH,
    GET_BLOCKCHAINS_DETAILS_SUCCESS,
} from '../../constants';

interface BlockchainDetailsFetchPayload {
    id: number;
}

export interface BlockchainDetailsSuccessPayload {
    data: BlockchainDetailsDataInterface;
}

export interface BlockchainDetailsDataInterface {
    id: number;
    key: string;
    name: string;
    client: string;
    server: string;
    height: number;
    explorer_address: string;
    explorer_transaction: string;
    min_confirmations: number;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface AddBlockchainFetchPayload {
    key: string;
    name: string;
    client: string;
    server: string;
    height: number;
    explorer_address: string;
    explorer_transaction: string;
    min_confirmations: number;
    status: string;
}

export interface EditBlockchainFetchPayload {
    id: number;
    key: string;
    name: string;
    client: string;
    server: string;
    height: number;
    explorer_address: string;
    explorer_transaction: string;
    min_confirmations: number;
    status: string;
}

export interface GetBlockchainDetailsFetch {
    type: typeof GET_BLOCKCHAINS_DETAILS_FETCH;
    payload: BlockchainDetailsFetchPayload;
}

export interface GetBlockchainDetailsSuccess {
    type: typeof GET_BLOCKCHAINS_DETAILS_SUCCESS;
    payload: BlockchainDetailsSuccessPayload;
}

export interface AddBlockchainFetch {
    type: typeof ADD_BLOCKCHAINS_FETCH;
    payload: AddBlockchainFetchPayload;
}

export interface EditBlockchainFetch {
    type: typeof EDIT_BLOCKCHAINS_FETCH;
    payload: EditBlockchainFetchPayload;
}

export type BlockchainDetailsAction =
    GetBlockchainDetailsFetch
    | GetBlockchainDetailsSuccess
    | AddBlockchainFetch
    | EditBlockchainFetch;

export const getBlockchainDetails = (payload: BlockchainDetailsFetchPayload): GetBlockchainDetailsFetch => ({
    type: GET_BLOCKCHAINS_DETAILS_FETCH,
    payload,
});

export const blockchainDetailsData = (payload: GetBlockchainDetailsSuccess['payload']): GetBlockchainDetailsSuccess => ({
    type: GET_BLOCKCHAINS_DETAILS_SUCCESS,
    payload,
});

export const addBlockchain = (payload: AddBlockchainFetch['payload']): AddBlockchainFetch => ({
    type: ADD_BLOCKCHAINS_FETCH,
    payload,
});

export const editBlockchain = (payload: EditBlockchainFetch['payload']): EditBlockchainFetch => ({
    type: EDIT_BLOCKCHAINS_FETCH,
    payload,
});

import {
    GET_BLOCKCHAINS_FETCH,
    GET_BLOCKCHAINS_SUCCESS
} from '../../constants';

interface BlockchainsFetchPayload {
    page: number;
    limit: number;
}

export interface BlockchainsSuccessPayload {
    list: BlockchainsDataInterface[];
    page: number;
    total: number;
}

export interface BlockchainsDataInterface {
    id: number;
    key: string;
    name: string;
    client: string;
    server: string;
    height: number;
    explorer_address: string;
    explorer_transaction: string;
    min_confirmations: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface GetBlockchainsFetch {
    type: typeof GET_BLOCKCHAINS_FETCH;
    payload: BlockchainsFetchPayload;
}

export interface GetBlockchainsSuccess {
    type: typeof GET_BLOCKCHAINS_SUCCESS;
    payload: BlockchainsSuccessPayload;
}

export type BlockchainsAction =
    GetBlockchainsFetch
    | GetBlockchainsSuccess;

export const getBlockchains = (payload: BlockchainsFetchPayload): GetBlockchainsFetch => ({
    type: GET_BLOCKCHAINS_FETCH,
    payload,
});

export const blockchainsData = (payload: GetBlockchainsSuccess['payload']): GetBlockchainsSuccess => ({
    type: GET_BLOCKCHAINS_SUCCESS,
    payload,
});

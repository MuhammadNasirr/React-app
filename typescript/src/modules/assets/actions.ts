import {
    GET_ASSETS_FETCH,
    GET_ASSETS_SUCCESS
} from '../constants';

interface AssetsFetchPayload {
    page: number;
    limit: number;
    ordering?: string;
    reference_type?: string;
    rid?: string;
    code?: string;
    currency?: string;
    from?: string | null;
    to?: string | null;
}

export interface AssetsSuccessPayload {
    list: AssetsDataInterface[];
    page: number;
    total: number;
}

export interface AssetsDataInterface {
    id: number;
    code: number;
    currency: string;
    credit: string;
    debit: string;
    account_kind: string;
    rid: number;
    reference_type: string;
    created_at: string;
}

export interface GetAssetsFetch {
    type: typeof GET_ASSETS_FETCH;
    payload: AssetsFetchPayload;
}

export interface GetAssetsSuccess {
    type: typeof GET_ASSETS_SUCCESS;
    payload: AssetsSuccessPayload;
}

export type AssetsAction =
    GetAssetsFetch
    | GetAssetsSuccess;

export const getAssets = (payload: AssetsFetchPayload): GetAssetsFetch => ({
    type: GET_ASSETS_FETCH,
    payload,
});

export const assetsData = (payload: GetAssetsSuccess['payload']): GetAssetsSuccess => ({
    type: GET_ASSETS_SUCCESS,
    payload,
});

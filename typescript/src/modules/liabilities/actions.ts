import {
    GET_LIABILITIES_FETCH,
    GET_LIABILITIES_SUCCESS
} from '../constants';

interface LiabilitiesFetchPayload {
    page: number;
    limit: number;
    ordering?: string;
    uid?: string;
    reference_type?: string;
    rid?: string;
    code?: string;
    currency?: string;
    from?: string | null;
    to?: string | null;
}

export interface LiabilitiesSuccessPayload {
    list: LiabilitiesDataInterface[];
    page: number;
    total: number;
}

export interface LiabilitiesDataInterface {
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

export interface GetLiabilitiesFetch {
    type: typeof GET_LIABILITIES_FETCH;
    payload: LiabilitiesFetchPayload;
}

export interface GetLiabilitiesSuccess {
    type: typeof GET_LIABILITIES_SUCCESS;
    payload: LiabilitiesSuccessPayload;
}

export type LiabilitiesAction =
    GetLiabilitiesFetch
    | GetLiabilitiesSuccess;

export const getLiabilities = (payload: LiabilitiesFetchPayload): GetLiabilitiesFetch => ({
    type: GET_LIABILITIES_FETCH,
    payload,
});

export const liabilitiesData = (payload: GetLiabilitiesSuccess['payload']): GetLiabilitiesSuccess => ({
    type: GET_LIABILITIES_SUCCESS,
    payload,
});

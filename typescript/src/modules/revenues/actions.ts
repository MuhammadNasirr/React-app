import {
    GET_REVENUES_FETCH,
    GET_REVENUES_SUCCESS
} from '../constants';

interface RevenuesFetchPayload {
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

export interface RevenuesSuccessPayload {
    list: RevenuesDataInterface[];
    page: number;
    total: number;
}

export interface RevenuesDataInterface {
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

export interface GetRevenuesFetch {
    type: typeof GET_REVENUES_FETCH;
    payload: RevenuesFetchPayload;
}

export interface GetRevenuesSuccess {
    type: typeof GET_REVENUES_SUCCESS;
    payload: RevenuesSuccessPayload;
}

export type RevenuesAction =
    GetRevenuesFetch
    | GetRevenuesSuccess;

export const getRevenues = (payload: RevenuesFetchPayload): GetRevenuesFetch => ({
    type: GET_REVENUES_FETCH,
    payload,
});

export const revenuesData = (payload: GetRevenuesSuccess['payload']): GetRevenuesSuccess => ({
    type: GET_REVENUES_SUCCESS,
    payload,
});

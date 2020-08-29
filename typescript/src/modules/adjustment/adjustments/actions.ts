import {
    GET_ADJUSTMENTS_FETCH,
    GET_ADJUSTMENTS_SUCCESS
} from '../../constants';

interface AdjustmentsFetchPayload {
    page: number;
    limit: number;
    uid?: string;
    ordering?: string;
    currency?: string;
    state?: string;
    category?: string;
    from?: string | null;
    to?: string | null;
}

export interface AdjustmentsSuccessPayload {
    list: AdjustmentsDataInterface[];
    page: number;
    total: number;
}

export interface AdjustmentsDataInterface {
    id: number;
    reason: string;
    description: string;
    category: string;
    amount: string;
    validator_uid: string;
    creator_uid: string;
    currency: string;
    // tslint:disable-next-line:no-any
    asset: any;
    // tslint:disable-next-line:no-any
    revenue: any;
    state: string;
    asset_account_code: number;
    receiving_account_code: string;
    created_at: string;
    updated_at: string;
}

export interface GetAdjustmentsFetch {
    type: typeof GET_ADJUSTMENTS_FETCH;
    payload: AdjustmentsFetchPayload;
}

export interface GetAdjustmentsSuccess {
    type: typeof GET_ADJUSTMENTS_SUCCESS;
    payload: AdjustmentsSuccessPayload;
}

export type AdjustmentsAction =
    GetAdjustmentsFetch
    | GetAdjustmentsSuccess;

export const getAdjustments = (payload: AdjustmentsFetchPayload): GetAdjustmentsFetch => ({
    type: GET_ADJUSTMENTS_FETCH,
    payload,
});

export const adjustmentsData = (payload: GetAdjustmentsSuccess['payload']): GetAdjustmentsSuccess => ({
    type: GET_ADJUSTMENTS_SUCCESS,
    payload,
});

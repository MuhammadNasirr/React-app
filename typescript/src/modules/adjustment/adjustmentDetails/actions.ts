import {
    ACTION_ADJUSTMENT_FETCH,
    ADD_ADJUSTMENT_FETCH,
    GET_ADJUSTMENTS_DETAILS_FETCH,
    GET_ADJUSTMENTS_DETAILS_SUCCESS,
} from '../../constants';

interface AdjustmentDetailsFetchPayload {
    id: number;
}

export interface AdjustmentDetailsSuccessPayload {
    data: AdjustmentDetailsDataInterface;
}

export interface AdjustmentDetailsDataInterface {
    id: number;
    reason: string;
    description: string;
    category: string;
    amount: string;
    validator_uid?: string;
    creator_uid: string;
    currency: string;
    // tslint:disable-next-line:no-any
    asset: any;
    // tslint:disable-next-line:no-any
    liability: any;
    state: string;
    asset_account_code: number;
    receiving_account_code: string;
    receiving_member_uid: string;
    created_at: string;
    updated_at: string;
}

export interface ActionAdjustmentFetchPayload {
    id: number;
    action: string;
}

export interface AddAdjustmentFetchPayload {
    reason: string;
    currency_id: string;
    category: string;
    amount: number;
    receiving_member_uid: string;
    receiving_account_code: number;
    asset_account_code: number;
    description: string;
}

export interface GetAdjustmentDetailsFetch {
    type: typeof GET_ADJUSTMENTS_DETAILS_FETCH;
    payload: AdjustmentDetailsFetchPayload;
}

export interface GetAdjustmentDetailsSuccess {
    type: typeof GET_ADJUSTMENTS_DETAILS_SUCCESS;
    payload: AdjustmentDetailsSuccessPayload;
}

export interface ActionAdjustmentFetch {
    type: typeof ACTION_ADJUSTMENT_FETCH;
    payload: ActionAdjustmentFetchPayload;
}

export interface AddAdjustmentFetch {
    type: typeof ADD_ADJUSTMENT_FETCH;
    payload: AddAdjustmentFetchPayload;
}

export type AdjustmentDetailsAction =
    GetAdjustmentDetailsFetch
    | GetAdjustmentDetailsSuccess
    | ActionAdjustmentFetch
    | AddAdjustmentFetch;

export const getAdjustmentDetails = (payload: AdjustmentDetailsFetchPayload): GetAdjustmentDetailsFetch => ({
    type: GET_ADJUSTMENTS_DETAILS_FETCH,
    payload,
});

export const adjustmentDetailsData = (payload: GetAdjustmentDetailsSuccess['payload']): GetAdjustmentDetailsSuccess => ({
    type: GET_ADJUSTMENTS_DETAILS_SUCCESS,
    payload,
});

export const actionAdjustment = (payload: ActionAdjustmentFetch['payload']): ActionAdjustmentFetch => ({
    type: ACTION_ADJUSTMENT_FETCH,
    payload,
});

export const addAdjustment = (payload: AddAdjustmentFetch['payload']): AddAdjustmentFetch => ({
    type: ADD_ADJUSTMENT_FETCH,
    payload,
});

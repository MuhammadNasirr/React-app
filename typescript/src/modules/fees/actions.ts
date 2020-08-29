import {
    ADD_FEES_FETCH,
    DELETE_FEES_FETCH,
    EDIT_FEES_FETCH,
    GET_FEES_FETCH,
    GET_FEES_SUCCESS
} from '../constants';

interface FeesFetchPayload {
    page?: number;
    limit?: number;
}

export interface FeesSuccessPayload {
    list: FeesDataInterface[];
    page: number | undefined;
    total: number;
}

export interface AddFeesPayload {
    group: string;
    market_id: string;
    maker: string;
    taker: string;
}

export interface EditFeesPayload {
    id: number;
    group: string;
    market_id: string;
    maker: string;
    taker: string;
}

export interface DeleteFeesPayload {
    id: number;
}

export interface AddFeesFetch {
    type: typeof ADD_FEES_FETCH;
    payload: AddFeesPayload;
}

export interface GetFeesFetch {
    type: typeof GET_FEES_FETCH;
    payload: FeesFetchPayload;
}

export interface GetFeesSuccess {
    type: typeof GET_FEES_SUCCESS;
    payload: FeesSuccessPayload;
}

export interface EditFeesFetch {
    type: typeof EDIT_FEES_FETCH;
    payload: EditFeesPayload;
}

export interface DeleteFeesFetch {
    type: typeof DELETE_FEES_FETCH;
    payload: DeleteFeesPayload;
}

export interface FeesDataInterface {
    id: number;
    group: string;
    market_id: string;
    maker: string;
    taker: string;
    created_at: string;
    updated_at: string;
}

export type FeesAction =
    GetFeesFetch
    | GetFeesSuccess
    | AddFeesFetch
    | EditFeesFetch
    | DeleteFeesFetch;

export const getFees = (payload: GetFeesFetch['payload']): GetFeesFetch => ({
    type: GET_FEES_FETCH,
    payload,
});

export const getFeesSuccess = (payload: GetFeesSuccess['payload']): GetFeesSuccess => ({
    type: GET_FEES_SUCCESS,
    payload,
});

export const addFees = (payload: AddFeesFetch['payload']): AddFeesFetch => ({
    type: ADD_FEES_FETCH,
    payload,
});

export const editFees = (payload: EditFeesFetch['payload']): EditFeesFetch => ({
    type: EDIT_FEES_FETCH,
    payload,
});

export const deleteFees = (payload: DeleteFeesFetch['payload']): DeleteFeesFetch => ({
    type: DELETE_FEES_FETCH,
    payload,
});

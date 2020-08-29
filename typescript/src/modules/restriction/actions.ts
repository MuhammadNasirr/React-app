import {
    ADD_RESTRICTION_FETCH,
    DELETE_RESTRICTION_FETCH,
    EDIT_RESTRICTION_FETCH,
    GET_RESTRICTION_FETCH,
    GET_RESTRICTION_SUCCESS
} from '../constants';

interface RestrictionFetchPayload {
    page?: number;
    limit?: number;
}

export interface RestrictionSuccessPayload {
    list: RestrictionDataInterface[];
    page: number | undefined;
    total: number;
}

export interface AddRestrictionPayload {
    scope: string;
    value: string;
    state: string;
}

export interface EditRestrictionPayload {
    id: number;
    scope: string;
    value: string;
    state: string;
}

export interface DeleteRestrictionPayload {
    id: number;
}

export interface AddRestrictionFetch {
    type: typeof ADD_RESTRICTION_FETCH;
    payload: AddRestrictionPayload;
}

export interface GetRestrictionFetch {
    type: typeof GET_RESTRICTION_FETCH;
    payload: RestrictionFetchPayload;
}

export interface GetRestrictionSuccess {
    type: typeof GET_RESTRICTION_SUCCESS;
    payload: RestrictionSuccessPayload;
}

export interface EditRestrictionFetch {
    type: typeof EDIT_RESTRICTION_FETCH;
    payload: EditRestrictionPayload;
}

export interface DeleteRestrictionFetch {
    type: typeof DELETE_RESTRICTION_FETCH;
    payload: DeleteRestrictionPayload;
}

export interface RestrictionDataInterface {
    id: number;
    scope: string;
    value: string;
    state: string;
    taker: string;
    created_at: string;
    updated_at: string;
}

export type RestrictionAction =
    GetRestrictionFetch
    | GetRestrictionSuccess
    | AddRestrictionFetch
    | EditRestrictionFetch
    | DeleteRestrictionFetch;

export const getRestrictions = (payload: GetRestrictionFetch['payload']): GetRestrictionFetch => ({
    type: GET_RESTRICTION_FETCH,
    payload,
});

export const getRestrictionSuccess = (payload: GetRestrictionSuccess['payload']): GetRestrictionSuccess => ({
    type: GET_RESTRICTION_SUCCESS,
    payload,
});

export const addRestriction = (payload: AddRestrictionFetch['payload']): AddRestrictionFetch => ({
    type: ADD_RESTRICTION_FETCH,
    payload,
});

export const editRestriction = (payload: EditRestrictionFetch['payload']): EditRestrictionFetch => ({
    type: EDIT_RESTRICTION_FETCH,
    payload,
});

export const deleteRestriction = (payload: DeleteRestrictionFetch['payload']): DeleteRestrictionFetch => ({
    type: DELETE_RESTRICTION_FETCH,
    payload,
});

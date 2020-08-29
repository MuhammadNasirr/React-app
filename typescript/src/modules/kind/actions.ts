import {
    GET_KIND_FETCH,
    GET_KIND_SUCCESS
} from '../constants';

export interface GetKindFetch {
    type: typeof GET_KIND_FETCH;
}

export interface GetKindSuccess {
    type: typeof GET_KIND_SUCCESS;
    // tslint:disable-next-line:no-any
    payload: any;
}

export type KindAction =
    GetKindFetch
    | GetKindSuccess;

export const getKind = (): GetKindFetch => ({
    type: GET_KIND_FETCH,
});

export const kindData = (payload: GetKindSuccess['payload']): GetKindSuccess => ({
    type: GET_KIND_SUCCESS,
    payload,
});

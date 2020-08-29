import {
    GET_CLIENT_FETCH,
    GET_CLIENT_SUCCESS
} from '../constants';

export interface GetClientFetch {
    type: typeof GET_CLIENT_FETCH;
}

export interface GetClientSuccess {
    type: typeof GET_CLIENT_SUCCESS;
    // tslint:disable-next-line:no-any
    payload: any;
}

export type ClientAction =
    GetClientFetch
    | GetClientSuccess;

export const getClient = (): GetClientFetch => ({
    type: GET_CLIENT_FETCH,
});

export const clientData = (payload: GetClientSuccess['payload']): GetClientSuccess => ({
    type: GET_CLIENT_SUCCESS,
    payload,
});

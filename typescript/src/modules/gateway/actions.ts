import {
    GET_GATEWAY_FETCH,
    GET_GATEWAY_SUCCESS
} from '../constants';

export interface GetGatewayFetch {
    type: typeof GET_GATEWAY_FETCH;
}

export interface GetGatewaySuccess {
    type: typeof GET_GATEWAY_SUCCESS;
    // tslint:disable-next-line:no-any
    payload: any;
}

export type GatewayAction =
    GetGatewayFetch
    | GetGatewaySuccess;

export const getGateway = (): GetGatewayFetch => ({
    type: GET_GATEWAY_FETCH,
});

export const gatewayData = (payload: GetGatewaySuccess['payload']): GetGatewaySuccess => ({
    type: GET_GATEWAY_SUCCESS,
    payload,
});

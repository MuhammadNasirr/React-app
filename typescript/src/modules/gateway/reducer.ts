import {
    GET_GATEWAY_FETCH,
    GET_GATEWAY_SUCCESS
} from '../constants';
import { GatewayAction } from './actions';

export interface GatewayState {
    // tslint:disable-next-line:no-any
    list: any;
    loading: boolean;
}

export const initialGatewayState: GatewayState = {
    list: [],
    loading: true,
};

export const gatewayReducer = (state = initialGatewayState, action: GatewayAction) => {
    switch (action.type) {
        case GET_GATEWAY_FETCH:
            return {
                ...state
            };
        case GET_GATEWAY_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
            };
        default:
            return {
                ...state,
            };
    }
};

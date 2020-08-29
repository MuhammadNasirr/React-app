import {
    GET_CLIENT_FETCH,
    GET_CLIENT_SUCCESS
} from '../constants';
import { ClientAction } from './actions';

export interface ClientState {
    // tslint:disable-next-line:no-any
    list: any;
    loading: boolean;
}

export const initialClientState: ClientState = {
    list: [],
    loading: true,
};

export const clientReducer = (state = initialClientState, action: ClientAction) => {
    switch (action.type) {
        case GET_CLIENT_FETCH:
            return {
                ...state
            };
        case GET_CLIENT_SUCCESS:
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

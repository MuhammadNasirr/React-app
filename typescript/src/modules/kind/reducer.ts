import {
    GET_KIND_FETCH,
    GET_KIND_SUCCESS
} from '../constants';
import { KindAction } from './actions';

export interface KindState {
    // tslint:disable-next-line:no-any
    list: any;
    loading: boolean;
}

export const initialKindState: KindState = {
    list: [],
    loading: true,
};

export const kindReducer = (state = initialKindState, action: KindAction) => {
    switch (action.type) {
        case GET_KIND_FETCH:
            return {
                ...state
            };
        case GET_KIND_SUCCESS:
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

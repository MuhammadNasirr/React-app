import {
    GET_REVENUES_FETCH,
    GET_REVENUES_SUCCESS
} from '../constants';
import { RevenuesAction } from './actions';

export interface RevenuesState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialRevenuesState: RevenuesState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const revenuesReducer = (state = initialRevenuesState, action: RevenuesAction) => {
    switch (action.type) {
        case GET_REVENUES_FETCH:
            return {
                ...state
            };
        case GET_REVENUES_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        default:
            return {
                ...state,
            };
    }
};

import {
    GET_MARKETS_FETCH,
    GET_MARKETS_SUCCESS
} from '../../constants';
import { MarketsAction } from './actions';

export interface MarketsState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialMarketsState: MarketsState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const marketsReducer = (state = initialMarketsState, action: MarketsAction) => {
    switch (action.type) {
        case GET_MARKETS_FETCH:
            return {
                ...state
            };
        case GET_MARKETS_SUCCESS:
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

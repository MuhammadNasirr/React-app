import {
    GET_TRADES_FETCH,
    GET_TRADES_SUCCESS
} from '../constants';
import { TradesAction } from './actions';

export interface TradeState {
    // tslint:disable-next-line:no-any
    list: any;
    page: number;
    total: number;
    loading: boolean;
}

export const initialTradeState: TradeState = {
    list: [],
    loading: true,
    page: 0,
    total: 0
};

export const tradesReducer = (state = initialTradeState, action: TradesAction) => {
    switch (action.type) {
        case GET_TRADES_FETCH:
            return {
                ...state
            };
        case GET_TRADES_SUCCESS:
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

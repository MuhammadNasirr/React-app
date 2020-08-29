import {
    CANCEL_SELL_ORDER_FETCH,
    GET_SELL_ORDERS_FETCH,
    GET_SELL_ORDERS_SUCCESS
} from '../../constants';
import { SellOrderAction, SellOrderDataInterface, } from './actions';

export interface SellOrdersState {
    list: SellOrderDataInterface[];
    loading: boolean;
    page: number;
    total: number;
}

export const initialSellOrderState: SellOrdersState = {
    list: [],
    loading: true,
    page: 0,
    total: 0,
};

export const sellOrdersReducer = (state = initialSellOrderState, action: SellOrderAction) => {
    switch (action.type) {
        case GET_SELL_ORDERS_FETCH:
            return {
                ...state,
            };
        case GET_SELL_ORDERS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case CANCEL_SELL_ORDER_FETCH:
            return {
                ...state
            };
        default:
            return state;
    }
};

import {
    CANCEL_BUY_ORDER_FETCH,
    GET_BUY_ORDERS_FETCH,
    GET_BUY_ORDERS_SUCCESS,
} from '../../constants';
import { BuyOrderAction, BuyOrderDataInterface } from './actions';

export interface BuyOrdersState {
    list: BuyOrderDataInterface[];
    loading: boolean;
    page: number;
    total: number;
}

export const initialBuyOrderState: BuyOrdersState = {
    list: [],
    loading: true,
    page: 0,
    total: 0,
};

export const buyOrdersReducer = (state = initialBuyOrderState, action: BuyOrderAction) => {
    switch (action.type) {
        case GET_BUY_ORDERS_FETCH:
            return {
                ...state,
            };
        case GET_BUY_ORDERS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case CANCEL_BUY_ORDER_FETCH:
            return {
                ...state
            };
        default:
            return state;
    }
};

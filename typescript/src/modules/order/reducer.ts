import {
    CANCEL_ORDERS_FETCH,
    GET_ORDERS_FETCH,
    GET_ORDERS_SUCCESS,
} from '../constants';
import { OrdersAction, OrdersDataInterface } from './actions';

export interface OrdersState {
    list: OrdersDataInterface[];
    loading: boolean;
    page: number;
    total: number;
}

export const initialOrdersState: OrdersState = {
    list: [],
    loading: true,
    page: 0,
    total: 0,
};

export const ordersReducer = (state = initialOrdersState, action: OrdersAction) => {
    switch (action.type) {
        case GET_ORDERS_FETCH:
            return {
                ...state,
            };
        case GET_ORDERS_SUCCESS:
            return {
                ...state,
                list: action.payload.list,
                loading: false,
                page: action.payload.page,
                total: action.payload.total,
            };
        case CANCEL_ORDERS_FETCH:
            return {
                ...state
            };
        default:
            return state;
    }
};

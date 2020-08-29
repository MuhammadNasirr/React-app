import {
    CANCEL_ORDERS_FETCH,
    GET_ORDERS_FETCH,
    GET_ORDERS_SUCCESS,
} from '../constants';

interface OrdersFetchPayload {
    page: number;
    limit: number;
    state?: string;
    uid?: string;
    ordering?: string;
    id?: string;
    market?: string;
    ord_type?: string;
    remaining_volume?: string;
    executed_volume?: string;
    price?: string;
    side?: string;
}

export interface OrdersSuccessPayload {
    list: OrdersDataInterface[];
    page: number;
    total: number;
}

export interface CancelOrdersPayload {
    id: number;
    uid?: string;
}

export interface OrdersDataInterface {
    id: number;
    side: string;
    ord_type: string;
    price: string;
    avg_price: string;
    state: string;
    market: string;
    created_at: string;
    updated_at: string;
    origin_volume: string;
    remaining_volume: string;
    executed_volume: string;
    trades_count: number;
    email: string;
    uid: string;
}

export interface GetOrdersFetch {
    type: typeof GET_ORDERS_FETCH;
    payload: OrdersFetchPayload;
}

export interface GetOrdersSuccess {
    type: typeof GET_ORDERS_SUCCESS;
    payload: OrdersSuccessPayload;
}

export interface CancelOrdersFetch {
    type: typeof CANCEL_ORDERS_FETCH;
    payload: CancelOrdersPayload;
}

export type OrdersAction =
    GetOrdersFetch
    | GetOrdersSuccess
    | CancelOrdersFetch;

export const getOrders = (payload: OrdersFetchPayload): GetOrdersFetch => ({
    type: GET_ORDERS_FETCH,
    payload,
});

export const ordersData = (payload: GetOrdersSuccess['payload']): GetOrdersSuccess => ({
    type: GET_ORDERS_SUCCESS,
    payload,
});

export const cancelOrders = (payload: CancelOrdersFetch['payload']): CancelOrdersFetch => ({
    type: CANCEL_ORDERS_FETCH,
    payload,
});

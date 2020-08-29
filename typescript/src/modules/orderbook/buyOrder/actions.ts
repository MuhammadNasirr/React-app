import {
    CANCEL_BUY_ORDER_FETCH,
    GET_BUY_ORDERS_FETCH,
    GET_BUY_ORDERS_SUCCESS,
} from '../../constants';

interface OrderBookFetchPayload {
    page?: number;
    limit?: number;
    state: string;
    market: string;
    type: string;
    order_by: string;
    ordering: string;
}

export interface BuyOrderSuccessPayload {
    list: BuyOrderDataInterface[];
    page: number | undefined;
    total: number;
}

export interface CancelBuyOrderPayload {
    id: number;
    market: string;
}

export interface BuyOrderDataInterface {
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

export interface GetBuyOrdersFetch {
    type: typeof GET_BUY_ORDERS_FETCH;
    payload: OrderBookFetchPayload;
}

export interface GetBuyOrdersSuccess {
    type: typeof GET_BUY_ORDERS_SUCCESS;
    payload: BuyOrderSuccessPayload;
}

export interface CancelBuyOrderFetch {
    type: typeof CANCEL_BUY_ORDER_FETCH;
    payload: CancelBuyOrderPayload;
}

export type BuyOrderAction =
    GetBuyOrdersFetch
    | GetBuyOrdersSuccess
    | CancelBuyOrderFetch;

export const getBuyOrders = (payload: OrderBookFetchPayload): GetBuyOrdersFetch => ({
    type: GET_BUY_ORDERS_FETCH,
    payload,
});

export const buyOrdersData = (payload: GetBuyOrdersSuccess['payload']): GetBuyOrdersSuccess => ({
    type: GET_BUY_ORDERS_SUCCESS,
    payload,
});

export const cancelBuyOrder = (payload: CancelBuyOrderFetch['payload']): CancelBuyOrderFetch => ({
    type: CANCEL_BUY_ORDER_FETCH,
    payload,
});

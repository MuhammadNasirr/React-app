import {
    CANCEL_SELL_ORDER_FETCH,
    GET_SELL_ORDERS_FETCH,
    GET_SELL_ORDERS_SUCCESS
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

export interface SellOrderSuccessPayload {
    list: SellOrderDataInterface[];
    page: number | undefined;
    total: number;
}

export interface CancelSellOrderPayload {
    id: number;
    market: string;
}

export interface SellOrderDataInterface {
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

export interface GetSellOrdersFetch {
    type: typeof GET_SELL_ORDERS_FETCH;
    payload: OrderBookFetchPayload;
}

export interface GetSellOrdersSuccess {
    type: typeof GET_SELL_ORDERS_SUCCESS;
    payload: SellOrderSuccessPayload;
}

export interface CancelSellOrderFetch {
    type: typeof CANCEL_SELL_ORDER_FETCH;
    payload: CancelSellOrderPayload;
}

export type SellOrderAction =
    GetSellOrdersFetch
    | GetSellOrdersSuccess
    | CancelSellOrderFetch;

export const getSellOrders = (payload: OrderBookFetchPayload): GetSellOrdersFetch => ({
    type: GET_SELL_ORDERS_FETCH,
    payload,
});

export const sellOrdersData = (payload: GetSellOrdersSuccess['payload']): GetSellOrdersSuccess => ({
    type: GET_SELL_ORDERS_SUCCESS,
    payload,
});

export const cancelSellOrder = (payload: CancelSellOrderFetch['payload']): CancelSellOrderFetch => ({
    type: CANCEL_SELL_ORDER_FETCH,
    payload,
});

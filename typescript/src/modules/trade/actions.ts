import {
    GET_TRADES_FETCH,
    GET_TRADES_SUCCESS
} from '../constants';

interface TradesFetchPayload {
    page: number;
    limit: number;
    uid?: string;
    ordering?: string;
}

export interface TradesSuccessPayload {
    list: TradesDataInterface[];
    page: number;
    total: number;
}

export interface TradesDataInterface {
    id: number;
    price: string;
    amount: string;
    total: string;
    market: string;
    created_at: string;
    taker_type: string;
    maker_order_email: string;
    maker_uid: string;
    maker_fee_amount: string;
    maker_fee_currency: string;
    taker_order_email: string;
    taker_uid: string;
    taker_fee_currency: string;
    taker_fee_amount: string;
}

export interface GetTradesFetch {
    type: typeof GET_TRADES_FETCH;
    payload: TradesFetchPayload;
}

export interface GetTradesSuccess {
    type: typeof GET_TRADES_SUCCESS;
    payload: TradesSuccessPayload;
}

export type TradesAction =
    GetTradesFetch
    | GetTradesSuccess;

export const getTrades = (payload: TradesFetchPayload): GetTradesFetch => ({
    type: GET_TRADES_FETCH,
    payload,
});

export const tradesData = (payload: GetTradesSuccess['payload']): GetTradesSuccess => ({
    type: GET_TRADES_SUCCESS,
    payload,
});

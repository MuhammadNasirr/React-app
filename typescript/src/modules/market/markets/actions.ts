import {
    GET_MARKETS_FETCH,
    GET_MARKETS_SUCCESS
} from '../../constants';

interface MarketsFetchPayload {
    page: number;
    limit: number;
}

export interface MarketsSuccessPayload {
    list: MarketsDataInterface[];
    page: number;
    total: number;
}

export interface MarketsDataInterface {
    id: string;
    name: string;
    base_unit: string;
    quote_unit: string;
    min_price: string;
    max_price: string;
    min_amount: string;
    amount_precision: number;
    price_precision: number;
    state: string;
    position: number;
    created_at: string;
    updated_at: string;
}

export interface GetMarketsFetch {
    type: typeof GET_MARKETS_FETCH;
    payload: MarketsFetchPayload;
}

export interface GetMarketsSuccess {
    type: typeof GET_MARKETS_SUCCESS;
    payload: MarketsSuccessPayload;
}

export type MarketsAction =
    GetMarketsFetch
    | GetMarketsSuccess;

export const getMarkets = (payload: MarketsFetchPayload): GetMarketsFetch => ({
    type: GET_MARKETS_FETCH,
    payload,
});

export const marketsData = (payload: GetMarketsSuccess['payload']): GetMarketsSuccess => ({
    type: GET_MARKETS_SUCCESS,
    payload,
});
